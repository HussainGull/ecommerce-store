import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Edit2, Loader2, XCircle} from 'lucide-react';
import Heading from "@/Elements/Heading/Heading.jsx";
import RoutePathDisplay from "@/Elements/RoutePathDisplay/RouthPathDisplay.jsx";
import {showToast} from "@/Elements/Toaster/Toaster.jsx";
import {updateCategory, fetchCategoryById} from "@/Redux-Toolkit/Features/Category/categoriesThunks.js";
import {updateBrand, fetchBrandById} from "@/Redux-Toolkit/Features/Brand/brandsThunks.js";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useParams} from "react-router-dom";

export default function EditEntityForm() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const location = useLocation();
    const urlMode = location.pathname.split('/')[1]; // Example: "/edit-brand/123"
    const mode = urlMode.includes('brand') ? 'brand' : 'category';

    const entityDetails = useSelector((state) =>
        mode === 'brand' ? state.brands.editBrand : state.categories.editCategory
    );

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

    // ✅ Fetch existing entity data
    useEffect(() => {
        if (mode === 'brand') {
            dispatch(fetchBrandById(id));
        } else {
            dispatch(fetchCategoryById(id));
        }
    }, [mode, id, dispatch]);

    // ✅ Pre-fill form when entityDetails change
    useEffect(() => {
        if (entityDetails?.name) {
            reset({name: entityDetails.name});
        }
    }, [entityDetails, reset]);

    // ✅ On form submit
    const onSubmit = async (data) => {
        try {
            if (mode === 'brand') {
                await dispatch(updateBrand({id, name: data.name})).unwrap();
                showToast({
                    title: "✅ Brand Updated",
                    description: "Brand updated successfully.",
                });
            } else {
                await dispatch(updateCategory({id, name: data.name})).unwrap();
                showToast({
                    title: "✅ Category Updated",
                    description: "Category updated successfully.",
                });
            }
        } catch (error) {
            showToast({
                title: "❌ Update Failed",
                description: error || "An error occurred.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-between items-center">
                <div className="w-fit flex flex-col">
                    <Heading heading={`Edit ${mode.charAt(0).toUpperCase() + mode.slice(1)}`}/>
                    <RoutePathDisplay/>
                </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-30">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    <Edit2 className="inline-block mr-2 text-indigo-600" size={24}/>
                    {`Edit ${mode === 'brand' ? 'Brand' : 'Category'}`}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            {mode === 'brand' ? 'Brand' : 'Category'} Name
                        </label>
                        <input
                            id="name"
                            {...register('name', {
                                required: `${mode === 'brand' ? 'Brand' : 'Category'} name is required.`,
                                minLength: {value: 2, message: "Minimum 2 characters required."},
                                maxLength: {value: 50, message: "Maximum 50 characters allowed."},
                            })}
                            placeholder={`Enter ${mode}`}
                            className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-600 flex items-center">
                                <XCircle className="mr-1" size={14}/> {errors.name.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full text-white font-semibold py-2.5 px-4 rounded-md shadow-sm bg-blue focus:outline-none flex items-center justify-center disabled:opacity-60`}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="animate-spin mr-2" size={18}/>
                                Updating...
                            </>
                        ) : (
                            `Update ${mode === 'brand' ? 'Brand' : 'Category'}`
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
