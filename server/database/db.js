import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });


const MONGO_URI = process.env.MONGO_URI;

const Connection = async () => {
    try {
        mongoose.set('strictQuery', false); // Address the deprecation warning
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database:', error.message);
    }
};

export default Connection;
