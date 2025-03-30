import mongoose from 'mongoose';
import { DB_URI } from '$env/static/private'; // Correct import

// connecting to database
const connectDB = async () => {
    try {
        console.log('Connecting to database...', DB_URI); // Use DB_URI
        mongoose.set('strictQuery', false); // Set strictQuery before connect
        await mongoose.connect(DB_URI); // Use DB_URI
        console.log(`Database connected successfully`);
    } catch (err) {
        console.error("Error connecting to DB:", err); // Improved error logging
        throw err; // Re-throw the error to propagate it
    }
};

export default connectDB;