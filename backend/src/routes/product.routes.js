import {Router} from "express";

import {
    addProduct, getAllProducts,
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

productRouter.route('/get-all-products').get(getAllProducts)


export {productRouter}