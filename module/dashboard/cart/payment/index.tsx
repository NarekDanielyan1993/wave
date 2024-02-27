import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { config } from '@utils/config';
import { StyledPayment } from '../style';
import PaymentForm from './paymentForm';

const stripePromise = loadStripe(config.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const options = {
    mode: 'setup',
    currency: 'usd',
} as const;
const Payment = () => (
    <StyledPayment>
        <Elements options={options} stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    </StyledPayment>
);

export default Payment;
