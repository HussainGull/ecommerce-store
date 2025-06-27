import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {PlusCircle, Loader2, CheckCircle, XCircle} from 'lucide-react';
import Heading from "@/Elements/Heading/Heading.jsx";
import RoutePathDisplay from "@/Elements/RoutePathDisplay/RouthPathDisplay.jsx";
import {useDispatch} from "react-redux";
import {createCategory} from "@/Redux-Toolkit/Features/Category/categoriesThunks.js";
import {createBrand} from "@/Redux-Toolkit/Features/Brand/brandsThunks.js";
import {showToast} from "@/Elements/Toaster/Toaster.jsx";

// Reusable Form Component for both Category and Brand
export default function CreateEntityForm({entityType}) {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
    } = useForm({
        defaultValues: {
            name: '',
        },
    });

    const dispatch = useDispatch();
    const [submitMessage, setSubmitMessage] = useState({type: '', text: ''});
    const capitalizedEntity = entityType.charAt(0).toUpperCase() + entityType.slice(1);

    const onSubmit = async (data) => {
        setSubmitMessage({type: '', text: ''});

        if (entityType === 'category') {
            const result = await dispatch(createCategory(data))
            if (createCategory.fulfilled.match(result)) {
                showToast({
                    title: '✅ Category Created',
                    description: 'Category Created Successfully',
                });
            } else {
                showToast({
                    title: '🚨 Category Not Created',
                    description: 'Please Try Again Creating Category',
                });
            }
            reset();
        } else {
            const result = await dispatch(createBrand(data))
            if (createBrand.fulfilled.match(result)) {
                showToast({
                    title: '✅ Brand Created',
                    description: 'Brand Created Successfully',
                });
            } else {
                showToast({
                    title: '🚨 Brand Not Created',
                    description: 'Please Try Again Creating Brand !',
                });
            }
            reset();
        }

    }

    return (
        <div>
            <div className="w-full flex justify-between items-center">
                <div className="w-fit flex flex-col">
                    <Heading heading={`Create ${capitalizedEntity}`}/>
                    <RoutePathDisplay/>
                </div>
            </div>

            <div className="flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md lg:max-w-lg xl:max-w-xl mt-30">
                    {/* Form Header */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                        <PlusCircle className="inline-block mr-2" size={24}/>
                        Create New {capitalizedEntity}
                    </h2>
                    <p className="text-gray-600 text-center mb-6">
                        Enter the name for your new {entityType}.
                    </p>

                    {/* Submission Message */}
                    {submitMessage.text && (
                        <div
                            className={`p-3 mb-4 rounded-md flex items-center text-sm font-medium ${
                                submitMessage.type === 'success'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                            }`}
                        >
                            {submitMessage.type === 'success' ? (
                                <CheckCircle className="mr-2" size={18}/>
                            ) : (
                                <XCircle className="mr-2" size={18}/>
                            )}
                            {submitMessage.text}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                {capitalizedEntity} Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                {...register('name', {
                                    required: `${capitalizedEntity} name is required.`,
                                    minLength: {
                                        value: 3,
                                        message: 'Name must be at least 3 characters.',
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: 'Name cannot exceed 50 characters.',
                                    },
                                    pattern: {
                                        value: /^\S.*\S$|^(\S)$/,
                                        message: 'Name cannot be just spaces.',
                                    },
                                    validate: (value) => value.trim() !== '' || `${capitalizedEntity} name cannot be empty.`,
                                })}
                                className={`w-full px-3 py-2 border ${
                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                                placeholder={`e.g., Cleats, Grippers`}
                                disabled={isSubmitting}
                            />
                            {errors.name && (
                                <p className="mt-1 text-xs text-red-600 flex items-center">
                                    <XCircle className="mr-1" size={14}/>
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue text-white font-semibold py-2.5 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" size={18}/>
                                    Creating...
                                </>
                            ) : (
                                `Create ${capitalizedEntity}`
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
