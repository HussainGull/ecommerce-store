import {Router} from "express";
import {
    createSlider,
    deleteSlider,
    fetchSliders,
    getSingleSlider,
    updateSlider
} from "../controllers/slider.controller.js";
import {upload} from "../middlewares/multer.middleware.js";

const sliderRouter = Router();

sliderRouter.post("/create-slider", upload.single("sliderImage"), createSlider);
sliderRouter.route("/fetch-sliders").get(fetchSliders);
sliderRouter.route("/delete-slider/:id").delete(deleteSlider);
sliderRouter.route('/get-slider/:id').get(getSingleSlider);
sliderRouter.put("/update-slider/:id", upload.single("sliderImage"), updateSlider);


export default sliderRouter;
