import { InternalServerError } from '@lib/classes/error-handler';
import mongoose from 'mongoose';
import MongoDb from './classes/database';

const connect: typeof mongoose | null = null;

export const connectDB = async (): Promise<typeof mongoose> => {
    // delete mongoose.models.User;
    // mongoose.deleteModel('User');
    if (connect) {
        console.log('Successfully connected to db.');
        return connect;
    }
    try {
        const mongoDb = new MongoDb();
        mongoDb.connectToDb();
        console.log('Successfully connected to db.');
        return connect;
    } catch (error) {
        const newError = new InternalServerError();
        throw newError;
    }
};
