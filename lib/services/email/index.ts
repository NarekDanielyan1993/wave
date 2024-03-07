import { MAIL_GEN_DEFAULT_PARAMETERS } from '@constant/default';
import { config } from '@utils/config';
import { InternalServerError } from '@utils/error-handler';
import {
    EMAIL_CHANGE_OUTRO_TEXT,
    EMAIL_CHANGE_SUBJECT_TEXT,
    EMAIL_CHANGE_TEXT,
    generateEmailChangeLink,
    generateEmailLink,
    generateEmailOutroText,
    getEmailVerificationText,
} from '@utils/provider';
import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';
import { IEmailService, IMailGenOptions } from 'types/email';

class EmailService implements IEmailService {
    createNodeMailerTransport = () => {
        const transporter = nodemailer.createTransport({
            service: config.NODEMAILER_PROVIDER,
            secure: true,
            auth: {
                user: config.NODEMAILER_EMAIL,
                pass: config.NODEMAILER_PASSWORD,
            },
        });
        return transporter;
    };

    sendEmailViaNodemailer = async (
        recipient: string,
        text: string,
        subject?: string
    ) => {
        const transporter = this.createNodeMailerTransport();
        try {
            await transporter.sendMail({
                from: process.env.NODEMAILER_EMAIL,
                to: recipient,
                subject,
                html: text,
            });
        } catch (error) {
            throw new InternalServerError();
        }
    };

    generateEmailTemplate = ({
        theme = MAIL_GEN_DEFAULT_PARAMETERS.THEME,
        subject = MAIL_GEN_DEFAULT_PARAMETERS.SUBJECT,
        productOptions = {
            productName: MAIL_GEN_DEFAULT_PARAMETERS.PRODUCT_PARAMETERS.name,
            productLink: MAIL_GEN_DEFAULT_PARAMETERS.PRODUCT_PARAMETERS
                .link as string,
        },
        actionInstructions = getEmailVerificationText(),
        buttonOptions: {
            color = MAIL_GEN_DEFAULT_PARAMETERS.BUTTON.color,
            link,
            text = MAIL_GEN_DEFAULT_PARAMETERS.BUTTON.text,
        },
        outro = generateEmailOutroText(),
    }: IMailGenOptions) => {
        const emailGenerator = new Mailgen({
            theme,
            product: {
                name: productOptions.productName,
                link: productOptions.productLink,
            },
        });
        const email = {
            body: {
                name: subject,
                action: {
                    instructions: actionInstructions,
                    button: {
                        color,
                        text,
                        link,
                    },
                },
                outro,
            },
        };
        const emailBody = emailGenerator.generate(email);
        return emailBody;
    };

    sendVerificationRequest = async (
        email: string,
        emailToken: string
    ): Promise<void> => {
        const verificationEmailLink = generateEmailLink(emailToken);
        const emailBody = this.generateEmailTemplate({
            buttonOptions: {
                link: verificationEmailLink,
            },
        });
        try {
            await this.sendEmailViaNodemailer(email, emailBody);
            console.log(`Email sent to ${email}`);
        } catch (error) {
            throw new InternalServerError();
        }
    };

    sendChangeEmailRequest = async (
        email: string,
        emailToken: string
    ): Promise<void> => {
        const verificationEmailLink = generateEmailChangeLink(emailToken);
        const emailBody = this.generateEmailTemplate({
            buttonOptions: {
                link: verificationEmailLink,
                text: 'Confirm',
            },
            subject: EMAIL_CHANGE_SUBJECT_TEXT,
            actionInstructions: EMAIL_CHANGE_TEXT,
            outro: EMAIL_CHANGE_OUTRO_TEXT,
        });
        try {
            await this.sendEmailViaNodemailer(email, emailBody);
            console.log(`Email sent to ${email}`);
        } catch (error) {
            throw new InternalServerError();
        }
    };
}

export default EmailService;
