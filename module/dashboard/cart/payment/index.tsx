import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { StyledPayment } from '../style';
import PaymentForm from './paymentForm';

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const options = {
    mode: 'payment',
    currency: 'usd',
    amount: 1099,
};

const Payment = () => (
    <StyledPayment>
        <Elements options={options} stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    </StyledPayment>
);

export default Payment;
