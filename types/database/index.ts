import { Mongoose } from 'mongoose';

interface IDbConnection {
    connectToDb(): Promise<void>;
    getConnection(): Mongoose | null;
}

export default IDbConnection;
