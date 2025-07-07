import React, { useEffect, useState } from 'react';
import InputField from '@/Elements/InputField/InputField.jsx';
import FormLabel from '@/Elements/Label/FormLabel.jsx';
import { Eye, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { showToast } from '@/Elements/Toaster/Toaster.jsx';
import CarouselDropzone from '@/Elements/DropZone/CarouselDropzone.jsx';
import {
    createCarouselThunk,
    getSingleCarouselThunk,
    updateCarouselThunk
} from "@/Redux-Toolkit/Features/Carousel/carouselThunk.js";


export default function CarouselForm() {
    const location = useLocation();
    const [imagePreviews, setImagePreviews] = useState([]);
    const [desiredPreviewIndex, setDesiredPreviewIndex] = useState(0);
    const editCarouselDetails = useSelector((state) => state.carousels.editCarousel);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const mode = location.pathname.includes('edit-carousel') ? 'edit' : null;

    const defaultValues = {
        title: '',
        subtitle: '',
        link: '',
        carouselImage: []
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        setError,
        clearErrors,
        reset,
        watch
    } = useForm({ defaultValues });

    useEffect(() => {
        if (mode === 'edit' && id) {
            dispatch(getSingleCarouselThunk(id));
        }
    }, [mode, id, dispatch]);

    useEffect(() => {
        if (mode === 'edit' && editCarouselDetails) {
            Object.keys(defaultValues).forEach((field) => {
                if (field !== 'carouselImage' && editCarouselDetails[field] !== undefined) {
                    setValue(field, editCarouselDetails[field]);
                }
            });

            if (editCarouselDetails.imageUrl) {
                setImagePreviews([editCarouselDetails.imageUrl]);
            }
        }
    }, [editCarouselDetails, mode, setValue]);

    const removeImage = (index) => {
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
        const updatedFiles = (watch('carouselImage') || []).filter((_, i) => i !== index);
        setImagePreviews(updatedPreviews);
        setValue('carouselImage', updatedFiles, { shouldValidate: true });
    };

    const previewImageChange = (index) => setDesiredPreviewIndex(index);

    const onSubmit = async (data) => {
        console.log(data)
        try {
            let finalImage = '';

            if (data.carouselImage && data.carouselImage.length > 0) {
                finalImage = data.carouselImage[0];
            } else if (mode === 'edit' && editCarouselDetails?.imageUrl) {
                finalImage = editCarouselDetails.imageUrl;
            } else {
                showToast({
                    title: '⛔ Image Required',
                    description: 'Please upload at least one image.',
                    variant: 'destructive'
                });
                setError('carouselImage', {
                    type: 'manual',
                    message: 'Please upload at least one image.'
                });
                return;
            }

            const carouselData = {
                title: data.title,
                subtitle: data.subtitle,
                link: data.link,
                image: finalImage
            };

            if (mode === 'edit') {
                const result = await dispatch(updateCarouselThunk({ id, updatedData: carouselData }));
                if (updateCarouselThunk.fulfilled.match(result)) {
                    showToast({ title: '✅ Carousel Updated', description: 'Carousel updated successfully.' });
                    navigate('/carousels');
                } else {
                    showToast({ title: '❌ Update Failed', description: 'An error occurred.', variant: 'destructive' });
                }
            } else {
                const result = await dispatch(createCarouselThunk(carouselData));
                if (createCarouselThunk.fulfilled.match(result)) {
                    showToast({ title: '✅ Carousel Created', description: 'Carousel added successfully.' });
                    setImagePreviews([]);
                    reset();
                } else {
                    const errorMessage = result.payload || result.error?.message || 'Check required fields.';
                    showToast({ title: '⚠️ Submission Failed', description: errorMessage, variant: 'destructive' });
                }
            }
        } catch (error) {
            console.error('Submission error:', error);
            showToast({
                title: '❌ Unexpected Error',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive'
            });
        }
    };

    const handleCancel = () => {
        reset();
        navigate('/carousels');
    };

    return (
        <div className="w-full overflow-hidden p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-lg mt-10">
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <InputField id="title" placeholder="Carousel Title" {...register('title', { required: 'Title is required' })} />
                        {errors.title && <p className="text-red-600 text-xs">{errors.title.message}</p>}
                    </div>

                    <div>
                        <FormLabel htmlFor="subtitle">Subtitle</FormLabel>
                        <InputField id="subtitle" placeholder="Carousel Subtitle" {...register('subtitle', { required: 'Subtitle is required' })} />
                        {errors.subtitle && <p className="text-red-600 text-xs">{errors.subtitle.message}</p>}
                    </div>

                    <div>
                        <FormLabel htmlFor="link">Link</FormLabel>
                        <InputField id="link" placeholder="https://example.com" {...register('link', { required: 'Link is required' })} />
                        {errors.link && <p className="text-red-600 text-xs">{errors.link.message}</p>}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="w-full h-64 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden relative">
                        {imagePreviews[0] ? (
                            <img
                                src={imagePreviews[desiredPreviewIndex]}
                                alt="Preview"
                                className="w-full h-full object-cover absolute inset-0"
                            />
                        ) : (
                            <span className="absolute inset-0 flex items-center justify-center text-gray-500">Add Image</span>
                        )}
                    </div>

                    <CarouselDropzone setValue={setValue} watch={watch} setImagePreviews={setImagePreviews} />
                    {errors.carouselImage && <p className="text-red-600 text-xs">{errors.carouselImage.message}</p>}

                    <div className="max-h-64 overflow-y-auto space-y-3">
                        {imagePreviews.map((src, index) => (
                            <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-md">
                                <div className="w-14 h-14 bg-light-gray rounded overflow-hidden">
                                    <img src={src} alt={`Image ${index}`} className="object-cover w-full h-full" />
                                </div>
                                <span className="flex-grow text-sm">{`Image ${index + 1}`}</span>
                                <Eye size={20} onClick={() => previewImageChange(index)} className="text-gray-600 cursor-pointer hover:text-blue-600" />
                                <X size={20} onClick={() => removeImage(index)} className="text-red-500 cursor-pointer hover:text-red-700" />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button type="submit" disabled={isSubmitting} className={`px-4 py-2 text-white rounded-md ${isSubmitting ? 'bg-gray-400' : 'bg-blue hover:bg-blue-700'}`}>
                            {mode === 'edit' ? 'Update Carousel' : isSubmitting ? 'Submitting...' : 'Add Carousel'}
                        </button>
                        <button type="button" onClick={handleCancel} className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                            CANCEL
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
