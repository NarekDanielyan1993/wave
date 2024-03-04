import { Button, Text } from '@chakra-ui/react';
import { PAYMENT_API } from '@constant/api';
import { useAppSelector } from '@store/create-store';
import { usersSelector } from '@store/user/selectors';
import {
    PaymentElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import { apiRequest } from '@utils/apiRequest';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { cart } = useAppSelector(usersSelector);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    // const dispatch = useDispatch();
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (elements == null) {
                return;
            }

            const { error: submitError } = await elements.submit();
            if (submitError?.message) {
                setErrorMessage(submitError.message);
                return;
            }
            setIsLoading(true);
            const { data } = await apiRequest({
                method: 'post',
                url: PAYMENT_API.payment,
                data: {
                    products: cart.products,
                    amount: cart.subtotal,
                },
            });
            router.push('/shop');
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <form onSubmit={onSubmit}>
            <PaymentElement />
            <Button
                isDisabled={cart.products.length < 1 || !stripe || !elements}
                isLoading={isLoading}
                mt={2}
                type="submit"
                variant="primary"
                width="full"
            >
                Pay
            </Button>
            {errorMessage && <Text>{errorMessage}</Text>}
        </form>
    );
};

export default PaymentForm;
