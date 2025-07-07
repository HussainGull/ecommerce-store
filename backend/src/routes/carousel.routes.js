import {Router} from "express";
import {
    createCarousel,
    deleteCarousel,
    getAllCarousels,
    getCarouselById,
    updateCarousel
} from "../controllers/carousel.controller.js";
import {upload} from "../middlewares/multer.middleware.js";

const carouselRouter = Router();

carouselRouter.post("/create-carousel", upload.single("image"), createCarousel);

carouselRouter.put("/update-carousel/:id", upload.single("image"), updateCarousel);

carouselRouter.delete("/delete-carousel/:id", deleteCarousel);

carouselRouter.get("/get-all-carousels", getAllCarousels);

carouselRouter.get("/get-carousel/:id", getCarouselById);


export default carouselRouter;