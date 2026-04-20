import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }; // Initialize cached object
}

async function connectDB() {

    if (cached.conn) {
        return cached.conn; // Return existing connection if it exists
    }

    if (!cached.promise) {  // Create a new promise for the connection if it doesn't exist
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/quickcart`, opts).then(mongoose => {
            return mongoose;
        })
    }

    cached.conn = await cached.promise; // Await the promise and store the connection
    return cached.conn; 
}

export default connectDB;