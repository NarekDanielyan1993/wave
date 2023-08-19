import { InternalServerError } from '@lib/classes/error-handler';
import { config } from '@lib/get-env';
import mongoose, { Mongoose } from 'mongoose';
import IDbConnection from 'types/database';

class MongoDb implements IDbConnection {
    private connection: Mongoose | null = null;

    public async connectToDb() {
        if (this.connection) {
            console.log('Already connected to db');
            return;
        }

        try {
            this.connection = await mongoose.connect(config.MONGODB_URL);
            console.log('Connected to db');
        } catch (error) {
            const newError = new InternalServerError();
            throw newError;
        }
    }

    public getConnection() {
        return this.connection;
    }
}

export default MongoDb;
