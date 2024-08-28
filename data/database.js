import mongoose from 'mongoose'
import { config } from 'dotenv'

console.log(process.env.URI);
export const connect=async ()=>{
await mongoose.connect(process.env.URI, {
    dbName: 'ApiUsers',
}).then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log("Database connection error:", err);
});

};