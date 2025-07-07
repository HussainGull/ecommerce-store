import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';

const app = express();
const upload = multer();

const allowedOrigins = process.env.CORS_ORIGIN.split(",");

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS Error: Origin ${origin} Not Allowed`));
        }
    },
    credentials: true,
}));

app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true, limit: '16kb'}));
app.use(express.static("public"));
app.use(cookieParser());


// Routes
import {router as userRouter} from './routes/user.routes.js';
import {productRouter} from "./routes/product.routes.js";
import {categoryRouter} from "./routes/category.routes.js";
import {brandRouter} from "./routes/brand.routes.js";
import sliderRouter from "./routes/slider.routes.js";
import carouselRouter from "./routes/carousel.routes.js";

// Routes Declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/slider", sliderRouter);
app.use("/api/v1/carousel", carouselRouter);


export {app};

