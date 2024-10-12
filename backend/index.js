import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors'; // Import CORS middleware
import connectDB from './config/db.js'; // Import database connection function
import userRoutes from './routes/userRoutes.js'; // User-related routes
import categoryRoutes from './routes/categoryRoutes.js'; // Category-related routes
import productRoutes from './routes/productRoutes.js'; // Product-related routes
import uploadRoutes from './routes/uploadRoutes.js'; // Upload-related routes
import orderRoutes from './routes/orderRoutes.js'; // Order-related routes
dotenv.config();
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: '*', // Adjust this to specify your allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define your API routes
app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', orderRoutes);

// Serve the Models_upload directory for accessing models and posters
const __dirname = path.resolve(); 
// Ensure correct __dirname configuration
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

// Serve the public directory for static files
app.use(express.static(path.join(__dirname, 'frontend', 'public'))); // Adjust the path as necessary

// Start the server
app.listen(port, () => console.log(`Server running on port: ${port}`));
