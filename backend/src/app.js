import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';

const app = express();
const upload = multer();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true, limit: '16kb'}));
app.use(express.static("public"));
app.use(cookieParser());


// Routes
import {router as userRouter} from './routes/user.routes.js';
import {productRouter} from "./routes/product.routes.js";

// Routes Declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/product", productRouter);


export {app};

