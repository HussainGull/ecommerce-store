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
app.use(express.urlencoded({extended:true, limit: '16kb'}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(upload.none()); // parse form-data bodies



// Routes
import {router as userRouter} from './routes/user.routes.js';

// Routes Declaration
app.use("/api/v1/users", userRouter);




export {app};

