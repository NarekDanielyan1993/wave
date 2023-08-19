import { InternalServerError } from './classes';

const getEnvVariable = (environmentVariable: string): string => {
    const unvalidatedEnvironmentVariable = process.env[environmentVariable];
    if (!unvalidatedEnvironmentVariable) {
        console.error(
            `Couldn't find environment variable: ${environmentVariable}`
        );
        throw new InternalServerError();
    } else {
        return unvalidatedEnvironmentVariable;
    }
};

export const config = {
    GOOGLE_CLIENT_ID: getEnvVariable('GOOGLE_CLIENT_ID'),
    GOOGLE_CLIENT_SECRET: getEnvVariable('GOOGLE_CLIENT_SECRET'),
    NODEMAILER_PROVIDER: getEnvVariable('NODEMAILER_PROVIDER'),
    NODEMAILER_EMAIL: getEnvVariable('NODEMAILER_EMAIL'),
    NODEMAILER_PASSWORD: getEnvVariable('NODEMAILER_PASSWORD'),
    MONGODB_PASSWORD: getEnvVariable('MONGODB_PASSWORD'),
    MONGODB_USERNAME: getEnvVariable('MONGODB_USERNAME'),
    MONGODB_DATABASE_NAME: getEnvVariable('MONGODB_DATABASE_NAME'),
    MONGODB_URL: getEnvVariable('MONGODB_URL'),
    MONGODB_IMAGE_URL: getEnvVariable('MONGODB_IMAGE_URL'),
    S3_BUCKET: getEnvVariable('S3_BUCKET'),
    S3_BUCKET_IMAGES: getEnvVariable('S3_BUCKET_IMAGES'),
    S3_SECRET_KEY: getEnvVariable('S3_SECRET_KEY'),
    S3_ACCESS_KEY: getEnvVariable('S3_ACCESS_KEY'),
    S3_REGION: getEnvVariable('S3_REGION'),
    NEXTAUTH_SECRET: getEnvVariable('NEXTAUTH_SECRET'),
    NEXT_PUBLIC_BASE_URL: getEnvVariable('NEXT_PUBLIC_BASE_URL'),
};
