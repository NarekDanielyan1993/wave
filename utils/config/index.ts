import { z } from 'zod';

// const getEnvVariable = (environmentVariable: string): string => {
//     const unvalidatedEnvironmentVariable = process.env[environmentVariable];
//     if (!unvalidatedEnvironmentVariable) {
//         console.log(
//             `Couldn't find environment variable: ${environmentVariable}`
//         );
//     }
//     return unvalidatedEnvironmentVariable;
// };

const envSchema = z.object({
    NODEMAILER_PROVIDER: z.string(),
    NODEMAILER_EMAIL: z.string(),
    NODEMAILER_PASSWORD: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    MONGODB_URL: z.string(),
    NEXTAUTH_SECRET: z.string(),
    NEXT_PUBLIC_BASE_URL: z.string(),
    TOKEN_SECRET: z.string(),
    NEXT_PUBLIC_NEXTAUTH_URL: z.string(),
    NEXT_PUBLIC_CLOUDINARY_URL: z.string(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
    CLOUDINARY_CLOUD_NAME: z.string(),
    CLOUDINARY_API_KEY: z.string(),
    CLOUDINARY_API_SECRET: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    isDev: z.boolean(),
});

export const config = envSchema.parse({
    NODEMAILER_PROVIDER: process.env.NEXT_PUBLIC_NODEMAILER_PROVIDER,
    NODEMAILER_EMAIL: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
    NODEMAILER_PASSWORD: process.env.NEXT_PUBLIC_NODEMAILER_PASSWORD,
    GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    MONGODB_URL: process.env.NEXT_PUBLIC_MONGODB_URL,
    NEXTAUTH_SECRET: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    TOKEN_SECRET: process.env.NEXT_PUBLIC_TOKEN_SECRET,
    NEXT_PUBLIC_NEXTAUTH_URL: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
    NEXT_PUBLIC_CLOUDINARY_URL: process.env.NEXT_PUBLIC_CLOUDINARY_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
    STRIPE_SECRET_KEY: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
    isDev: process.env.NEXT_PUBLIC_NODE_ENV === 'development',
});
