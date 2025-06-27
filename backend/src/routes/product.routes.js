import {Router} from "express";

import {
    addProduct,
    deleteProducts,
    fetchEditProduct,
    getAllProducts,
    updateProduct,
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
productRouter.route('/delete-product/:id').delete(deleteProducts)
productRouter.route('/get-edit-product/:id').get(fetchEditProduct)
productRouter.route('/update-product/:id').patch(upload.fields([{name: 'productImage', maxCount: 10}]), updateProduct);


export {productRouter}