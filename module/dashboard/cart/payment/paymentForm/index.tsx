import { Button } from '@chakra-ui/react';
import { PAYMENT_API } from '@constant/api';
import { useAppSelector } from '@store/create-store';
import { addToHistory, removeCart } from '@store/user/action';
import { usersSelector } from '@store/user/selectors';
import {
    PaymentElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import { apiRequest } from '@utils/apiRequest';
import { config } from '@utils/config';
import { calculateTotal } from '@utils/helper';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { cart } = useAppSelector(usersSelector);
    console.log(cart);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (elements == null) {
                return;
            }

            const { error: submitError } = await elements.submit();
            if (submitError) {
                setErrorMessage(submitError.message);
                return;
            }
            setIsLoading(true);
            const { data } = await apiRequest({
                method: 'post',
                url: PAYMENT_API.payment,
                data: {
                    amount: calculateTotal(cart),
                },
            });

            console.log(data.client_secret);
            console.log(config.NEXT_PUBLIC_BASE_URL);
            console.log(process.env.NEXT_PUBLIC_BASE_URL);
            setIsLoading(false);

            const history = cart.map(ca => ({
                userId: ca.userId,
                amount: ca.product.price,
                product: ca.product.model,
            }));
            const ids = cart.map(c => c.id);
            dispatch(addToHistory(history));
            dispatch(removeCart({ id: ids }));
            const { error } = await stripe?.confirmPayment({
                elements,
                clientSecret: data.client_secret,
                confirmParams: {
                    return_url: process.env.NEXT_PUBLIC_BASE_URL,
                },
            });
            if (error) {
                // This point will only be reached if there is an immediate error when
                // confirming the payment. Show error to your customer (for example, payment
                // details incomplete)
                setErrorMessage(error.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <form onSubmit={onSubmit}>
            <PaymentElement />
            <Button
                isDisabled={cart.length < 1 || !stripe || !elements}
                isLoading={isLoading}
                mt={2}
                type="submit"
                variant="primary"
                width="full"
            >
                Pay
            </Button>
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    );
};

export default PaymentForm;
