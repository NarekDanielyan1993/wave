export interface IEmailService {
    sendVerificationRequest: (
        email: string,
        emailToken: string
    ) => Promise<void>;
    sendEmailViaNodemailer: (
        subject: string,
        text: string,
        recipient: string
    ) => Promise<void>;
    generateEmailTemplate: (options: IMailGenOptions) => Promise<any>;
}

export interface IMailGenOptions {
    theme?: string;
    subject?: string;
    productOptions?: IProductOptions;
    actionInstructions?: string;
    buttonOptions: IMailGenButtonOptions;
    outro?: string;
}

export interface IProductOptions {
    productName: string;
    productLink: string;
}

export interface IMailGenButtonOptions {
    color?: string;
    text?: string;
    link: string;
}
