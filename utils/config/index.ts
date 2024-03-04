const getEnvVariable = (environmentVariable: string): string => {
    const unvalidatedEnvironmentVariable = process.env[environmentVariable];
    if (!unvalidatedEnvironmentVariable) {
        console.log(
            `Couldn't find environment variable: ${environmentVariable}`
        );
    }
    return unvalidatedEnvironmentVariable;
};

export const config = {
    NODEMAILER_PROVIDER: getEnvVariable('NODEMAILER_PROVIDER'),
    NODEMAILER_EMAIL: getEnvVariable('NODEMAILER_EMAIL'),
    NODEMAILER_PASSWORD: getEnvVariable('NODEMAILER_PASSWORD'),
    GOOGLE_CLIENT_ID: getEnvVariable('GOOGLE_CLIENT_ID'),
    GOOGLE_CLIENT_SECRET: getEnvVariable('GOOGLE_CLIENT_SECRET'),
    MONGODB_URL: getEnvVariable('MONGODB_URL'),
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    NEXT_PUBLIC_NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_CLOUDINARY_URL: process.env.NEXT_PUBLIC_CLOUDINARY_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    isDev: process.env.NEXT_PUBLIC_NODE_ENV === 'development',
};
