import {Router} from "express";

import {
    addProduct,
} from "../controllers/product.controller.js";
import {upload} from "../middlewares/multer.middleware.js";

const productRouter = Router();

productRouter.route('/add-product').post(upload.fields([
        {
            name: 'productImage',
            maxCount: 10
        },
    ]),
    addProduct
);


export {productRouter}