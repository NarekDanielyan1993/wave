import { EMAIL_CHANGE_URL, EMAIL_VERIFICATION_URL } from '@constant/api';

export const generateEmailLink = (recipientEmail: string) =>
    `${EMAIL_VERIFICATION_URL}?token=${recipientEmail}`;

export const generateEmailVerificationDefaultSubject = () =>
    `Email Verification - Activate Your Account`;

export const getEmailVerificationText = (text?: string) =>
    text ||
    `Thank you for registering with our platform! We're excited to have you on board. Before you can start using your account, please verify your email address by clicking the link below:
    By verifying your email, you'll be able to access all the features of our platform and enjoy a seamless experience. If you did not sign up for an account or received this email in error, you can safely ignore it.
    `;

export const generateEmailOutroText = (text?: string) =>
    text ||
    `
    Welcome aboard and happy exploring!

    Best regards,
    
        Narek
    `;

export const EMAIL_CHANGE_TEXT =
    'You have requested to update your email address, kindly confirm this change by clicking the link';

export const EMAIL_CHANGE_OUTRO_TEXT = `
        Best regards,
    
        Narek
    `;
export const EMAIL_CHANGE_SUBJECT_TEXT = 'Email Confirmation.';

export const generateEmailChangeLink = (recipientEmail: string) =>
    `${EMAIL_CHANGE_URL}?token=${recipientEmail}`;
