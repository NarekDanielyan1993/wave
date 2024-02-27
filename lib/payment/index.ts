import Stripe from 'stripe';
import { config } from '..';

class StripePaymentService {
    private stripe: Stripe;
    constructor() {
        this.stripe = new Stripe(config.STRIPE_SECRET_KEY, {
            typescript: true,
            apiVersion: '2023-10-16',
        });
    }

    async createPaymentIntent(amount: number) {
        try {
            const paymentIntent = await this.stripe.paymentIntents.create({
                amount: amount,
                currency: 'USD',
                payment_method: 'pm_card_visa',
                confirm: true,
                automatic_payment_methods: {
                    enabled: true,
                    allow_redirects: 'never',
                },
            });
            return paymentIntent;
        } catch (err) {
            console.error('Error uploading file:', err);
            throw new Error('Error happened while creating payment intent.');
        }
    }
}

export default StripePaymentService;
