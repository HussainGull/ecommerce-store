import mongoose, {Schema} from "mongoose";

const sliderSchema = new Schema(
    {
        sliderImage: { type: String, required: true },           // Image URL
        heading: { type: String, required: true },
        paragraph: { type: String, required: true },
        ctaText: { type: String, required: true },         // Call-to-action button text
        ctaLink: { type: String, required: true },         // Button link
    },
    { timestamps: true }
);

const Slider = mongoose.model("Slider", sliderSchema);

export default Slider;
