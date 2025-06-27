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
import {categoryRouter} from "./routes/category.routes.js";
import {brandRouter} from "./routes/brand.routes.js";

// Routes Declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/brand", brandRouter);


export {app};

