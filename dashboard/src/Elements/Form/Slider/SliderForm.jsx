import React, {useEffect, useState} from 'react';
import InputField from "@/Elements/InputField/InputField.jsx";
import FormLabel from "@/Elements/Label/FormLabel.jsx";
import TextArea from "@/Elements/TextArea/TextArea.jsx";
import {Eye, X} from "lucide-react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {createSlider, getSingleSlider, updateSlider} from "@/Redux-Toolkit/Features/Slider/sliderThunks.js";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {showToast} from "@/Elements/Toaster/Toaster.jsx";
import SliderImageDropzone from "@/Elements/DropZone/SliderDropzone.jsx";

export default function SliderForm() {
    const location = useLocation();
    const [imagePreviews, setImagePreviews] = useState([]);
    const [desiredPreviewIndex, setDesiredPreviewIndex] = useState(0);
    const editSliderDetails = useSelector((state) => state.sliders.editSlider);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();
    const mode = location.pathname.includes("edit-slider") ? "edit" : null;

    // const editSliderDetails = useSelector((state) => state.slider.editSlider);

    const defaultValues = {
        heading: '',
        paragraph: '',
        ctaText: '',
        ctaLink: '',
        sliderImage: [],
    };

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setValue,
        setError,
        clearErrors,
        reset,
        watch,
    } = useForm({defaultValues});

    // ✅ Fetch existing slider details if in edit mode
    useEffect(() => {
        if (mode === "edit" && id) {
            dispatch(getSingleSlider(id));
        }
    }, [mode, id, dispatch]);

    // ✅ Pre-fill fields when edit data arrives
    useEffect(() => {
        if (mode === "edit" && editSliderDetails) {
            Object.keys(defaultValues).forEach((field) => {
                if (field !== "sliderImage" && editSliderDetails[field] !== undefined) {
                    setValue(field, editSliderDetails[field]);
                }
            });

            if (editSliderDetails.sliderImage) {
                // ✅ Ensure it's always an array
                setImagePreviews(Array.isArray(editSliderDetails.sliderImage)
                    ? editSliderDetails.sliderImage
                    : [editSliderDetails.sliderImage]
                );
            }
        }
    }, [editSliderDetails, mode, setValue]);

    const removeImage = (index) => {
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
        const updatedFiles = (watch("sliderImage") || []).filter((_, i) => i !== index);
        setImagePreviews(updatedPreviews);
        setValue("sliderImage", updatedFiles, {shouldValidate: true});
    };

    const previewImageChange = (index) => setDesiredPreviewIndex(index);

    const onSubmit = async (data) => {
        try {
            let finalImage = '';

            // ✅ If user uploaded new image, use it
            if (data.sliderImage && data.sliderImage.length > 0) {
                finalImage = data.sliderImage[0];
            }
            // ✅ Else, in edit mode, use existing image from backend
            else if (mode === "edit" && editSliderDetails?.sliderImage) {
                finalImage = editSliderDetails.sliderImage;
            } else {
                showToast({
                    title: "⛔ Image Required",
                    description: "Please upload at least one slider image.",
                    variant: "destructive",
                });
                setError("sliderImage", {
                    type: "manual",
                    message: "Please upload at least one slider image.",
                });
                return;
            }

            // ✅ Prepare final sliderData
            const sliderData = {
                heading: data.heading,
                paragraph: data.paragraph,
                ctaText: data.ctaText,
                ctaLink: data.ctaLink,
                sliderImage: finalImage,
            };

            if (mode === "edit") {
                const result = await dispatch(updateSlider({id, updatedData: sliderData}));
                if (updateSlider.fulfilled.match(result)) {
                    showToast({title: "✅ Slider Updated", description: "Slider updated successfully."});
                    navigate("/sliders");
                } else {
                    showToast({title: "❌ Update Failed", description: "An error occurred.", variant: "destructive"});
                }
            } else {
                const result = await dispatch(createSlider(sliderData));
                if (createSlider.fulfilled.match(result)) {
                    showToast({title: "✅ Slider Created", description: "New slider created successfully."});
                    setImagePreviews([]);
                    reset();
                } else {
                    const errorMessage = result.payload || result.error?.message || "Check required fields.";
                    showToast({title: "⚠️ Submission Failed", description: errorMessage, variant: "destructive"});
                }
            }
        } catch (error) {
            console.error("Submission error:", error);
            showToast({
                title: "❌ Unexpected Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleCancel = () => {
        reset();
        navigate("/sliders");
    };

    return (
        <div className="w-full overflow-hidden p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-lg mt-10">
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Form Fields */}
                <div className="space-y-6">
                    <div>
                        <FormLabel htmlFor="heading">Heading</FormLabel>
                        <InputField id="heading"
                                    placeholder="Slider Heading" {...register('heading', {required: 'Heading is required'})} />
                        {errors.heading && <p className="text-red-600 text-xs">{errors.heading.message}</p>}
                    </div>

                    <div>
                        <FormLabel htmlFor="paragraph">Paragraph</FormLabel>
                        <TextArea id="paragraph"
                                  rows="4" {...register('paragraph', {required: 'Paragraph is required'})} />
                        {errors.paragraph && <p className="text-red-600 text-xs">{errors.paragraph.message}</p>}
                    </div>

                    <div>
                        <FormLabel htmlFor="ctaText">CTA Text</FormLabel>
                        <InputField id="ctaText"
                                    placeholder="Button Text" {...register('ctaText', {required: 'CTA Text is required'})} />
                        {errors.ctaText && <p className="text-red-600 text-xs">{errors.ctaText.message}</p>}
                    </div>

                    <div>
                        <FormLabel htmlFor="ctaLink">CTA Link</FormLabel>
                        <InputField id="ctaLink"
                                    placeholder="https://example.com" {...register('ctaLink', {required: 'CTA Link is required'})} />
                        {errors.ctaLink && <p className="text-red-600 text-xs">{errors.ctaLink.message}</p>}
                    </div>
                </div>

                {/* Right Side - Image Preview and Upload */}
                <div className="space-y-6">
                    <div
                        className="w-full h-64 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden relative">
                        {imagePreviews[0] ? (
                            <img
                                src={imagePreviews[desiredPreviewIndex]}
                                alt="Preview"
                                className="w-full h-full object-cover absolute inset-0"
                            />
                        ) : (
                            <span
                                className="absolute inset-0 flex items-center justify-center text-gray-500">Add Image</span>
                        )}
                    </div>

                    <SliderImageDropzone setValue={setValue} watch={watch} setImagePreviews={setImagePreviews}/>
                    {errors.sliderImage && (
                        <p className="text-red-600 text-xs">{errors.sliderImage.message}</p>
                    )}

                    {/* Thumbnail Previews */}
                    <div className="max-h-64 overflow-y-auto space-y-3">
                        {imagePreviews.map((src, index) => (
                            <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-md">
                                <div className="w-14 h-14 bg-light-gray rounded overflow-hidden">
                                    <img src={src} alt={`Image ${index}`} className="object-cover w-full h-full"/>
                                </div>
                                <span className="flex-grow text-sm">{`Image ${index + 1}`}</span>
                                <Eye size={20} onClick={() => previewImageChange(index)}
                                     className="text-gray-600 cursor-pointer hover:text-blue-600"/>
                                <X size={20} onClick={() => removeImage(index)}
                                   className="text-red-500 cursor-pointer hover:text-red-700"/>
                            </div>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button type="submit" disabled={isSubmitting}
                                className={`px-4 py-2 text-white rounded-md ${isSubmitting ? "bg-gray-400" : "bg-blue hover:bg-blue-700"}`}>
                            {mode === "edit" ? "Update Slider" : (isSubmitting ? "Submitting..." : "Add Slider")}
                        </button>
                        <button type="button" onClick={handleCancel}
                                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                            CANCEL
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
