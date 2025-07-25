import React, {useEffect, useState} from 'react';
import InputField from "@/Elements/InputField/InputField.jsx";
import FormLabel from "@/Elements/Label/FormLabel.jsx";
import TextArea from "@/Elements/TextArea/TextArea.jsx";
import {Selector} from "@/Elements/Select/Selector.jsx";
import {Controller, useForm} from 'react-hook-form';
import {Eye, X} from 'lucide-react';
import ImageDropzone from "@/Elements/DropZone/ImageDropzone.jsx";
import {useDispatch, useSelector} from 'react-redux';
import {addProduct, fetchEditProduct, updateProduct} from "@/Redux-Toolkit/Features/Products/productsThunks.js";
import {showToast} from "@/Elements/Toaster/Toaster.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {fetchCategories} from "@/Redux-Toolkit/Features/Category/categoriesThunks.js";
import {fetchBrands} from "@/Redux-Toolkit/Features/Brand/brandsThunks.js";

export default function ProductForm({isDeleteEnable, mode}) {
    const [imagePreviews, setImagePreviews] = useState([]);
    const [desiredPreviewIndex, setDesiredPreviewIndex] = useState(0);
    const navigate = useNavigate();

    const editProductDetails = useSelector((state) => state.products.editProductList);
    const categories = useSelector((state) => state.categories.categories);
    const brands = useSelector((state) => state.brands.brands);
    const dispatch = useDispatch();
    const {id} = useParams();

    const defaultValues = {
        productName: '',
        description: '',
        category: '',
        brand: '',
        sku: '',
        stockQuantity: '',
        regularPrice: '',
        salePrice: '',
        tags: '',
        productImage: [],
    };

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        control,
        reset,
        setValue,
        watch,
    } = useForm({defaultValues});

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchBrands());
    }, [dispatch]);


    // ✅ Fetch product for edit mode
    useEffect(() => {
        if (mode === "edit" && id) {
            dispatch(fetchEditProduct(id));
        }
    }, [mode, id, dispatch]);


    // ✅ Pre-fill form fields after fetching edit data
    useEffect(() => {
        if (mode === "edit" && editProductDetails) {
            Object.keys(defaultValues).forEach((field) => {
                if (field !== "productImage" && editProductDetails[field] !== undefined) {
                    setValue(field, editProductDetails[field]);
                }
            });

            if (Array.isArray(editProductDetails.productImage) && editProductDetails.productImage.length > 0) {
                setImagePreviews(editProductDetails.productImage);
            }
        }
    }, [editProductDetails, mode, setValue]);

    const categoryOptions = categories.map((category) => ({
        value: category._id,     // ✅ Backend expects _id
        label: category.name,    // ✅ User sees readable name
    }));

    const brandOptions = brands.map((brand) => ({
        value: brand._id,        // ✅ Backend expects _id
        label: brand.name,
    }));


    const removeImage = (index) => {
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        const currentFiles = watch("productImage") || [];
        const newFiles = currentFiles.filter((_, i) => i !== index);

        setImagePreviews(newPreviews);
        setValue("productImage", newFiles, {shouldValidate: true});
    };

    const previewImageChange = (index) => {
        setDesiredPreviewIndex(index);
    };

    const onSubmit = async (productData) => {
        console.log("Form Data:", productData)
        if (mode === "edit") {
            const result = await dispatch(updateProduct({id, updatedData: productData}));
            if (updateProduct.fulfilled.match(result)) {
                showToast({
                    title: "✅ Product Updated",
                    description: "Product details were saved successfully.",
                });
                navigate("/products")
            } else {
                showToast({
                    title: "❌ Update Failed",
                    description: result.payload || "An error occurred.",
                    variant: "destructive",
                });
            }
        } else {
            const result = await dispatch(addProduct(productData));

            if (addProduct.fulfilled.match(result)) {
                showToast({
                    title: "✅ Product Created",
                    description: "Your product has been added successfully.",
                });
                reset();
                setImagePreviews([]);
            } else {
                const status = result?.error?.code || result?.error?.status || result?.meta?.response?.status;
                if (status === 408) {
                    showToast({
                        title: "⏳ Missing Images",
                        description: "Please add at least one product image.",
                        variant: "destructive",
                    });
                } else {
                    showToast({
                        title: "⚠️ Invalid Submission",
                        description: result.payload || "Please fill all required fields.",
                        variant: "destructive",
                    });
                }
            }
        }
    };

    const handleCancel = () => {
        reset();
        navigate("/products")
    }

    return (
        <div className="w-full overflow-hidden p-4 sm:p-6 md:p-8 lg:p-6 bg-white shadow-lg rounded-lg mt-10">
            <form onSubmit={handleSubmit(onSubmit)}
                  className="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,50%)_1fr] gap-8">
                <div className="flex-1 space-y-6 mb-8 lg:mb-0">

                    {/* ✅ Text Fields */}
                    <div>
                        <FormLabel htmlFor="productName">Product Name</FormLabel>
                        <InputField id="productName"
                                    placeholder="Product Name" {...register('productName', {required: 'Product Name is required'})} />
                        {errors.productName && <p className="text-red-600 text-xs">{errors.productName.message}</p>}
                    </div>

                    <div>
                        <FormLabel htmlFor="description">Description</FormLabel>
                        <TextArea id="description"
                                  rows="4" {...register('description', {required: 'Description is required'})} />
                        {errors.description && <p className="text-red-600 text-xs">{errors.description.message}</p>}
                    </div>

                    {/* ✅ Selectors with Controller */}
                    <div>
                        <FormLabel htmlFor="category">Category</FormLabel>
                        <Controller
                            name="category"
                            control={control}
                            rules={{ required: "Category is required" }}
                            render={({ field }) => (
                                <Selector
                                    {...field}
                                    placeholder="Choose Category"
                                    label="Choose Category"
                                    items={categoryOptions}
                                />
                            )}
                        />

                        {errors.category && <p className="text-red-600 text-xs">{errors.category.message}</p>}
                    </div>

                    <div>
                        <FormLabel htmlFor="brand">Brand</FormLabel>
                        <Controller
                            name="brand"
                            control={control}
                            rules={{ required: "Brand is required" }}
                            render={({ field }) => (
                                <Selector
                                    {...field}
                                    placeholder="Choose Brand"
                                    label="Choose Brand"
                                    items={brandOptions}
                                />
                            )}
                        />
                        {errors.brand && <p className="text-red-600 text-xs">{errors.brand.message}</p>}
                    </div>

                    {/* ✅ Number & Other Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <FormLabel htmlFor="sku">SKU</FormLabel>
                            <InputField id="sku"
                                        placeholder="Enter SKU" {...register('sku', {required: 'SKU is required'})} />
                            {errors.sku && <p className="text-red-600 text-xs">{errors.sku.message}</p>}
                        </div>

                        <div>
                            <FormLabel htmlFor="stockQuantity">Stock Quantity</FormLabel>
                            <InputField id="stockQuantity" type="number"
                                        placeholder="Stock Quantity" {...register('stockQuantity', {required: 'Stock Quantity is required'})} />
                            {errors.stockQuantity &&
                                <p className="text-red-600 text-xs">{errors.stockQuantity.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <FormLabel htmlFor="regularPrice">Regular Price</FormLabel>
                            <InputField id="regularPrice" type="number" step="0.01"
                                        placeholder="Regular Price" {...register('regularPrice', {required: 'Regular Price is required'})} />
                            {errors.regularPrice &&
                                <p className="text-red-600 text-xs">{errors.regularPrice.message}</p>}
                        </div>

                        <div>
                            <FormLabel htmlFor="salePrice">Sale Price</FormLabel>
                            <InputField id="salePrice" type="number" step="0.01"
                                        placeholder="Sale Price" {...register('salePrice')} />
                        </div>
                    </div>

                    <div>
                        <FormLabel htmlFor="tags">Tags</FormLabel>
                        <InputField id="tags" placeholder="Tags" {...register('tags')} />
                    </div>
                </div>

                {/* ✅ Right Column (Images + Buttons) */}
                <div className="space-y-6">

                    {/* Image Preview */}
                    <div
                        className="w-full h-70 bg-gray-200 p-2 rounded-md flex items-center justify-center relative overflow-hidden">
                        {imagePreviews[0] ? (
                            <img
                                src={imagePreviews[desiredPreviewIndex]}
                                alt="Preview"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                                className="w-full h-full object-cover absolute inset-0 rounded-md"
                            />
                        ) : (
                            <span
                                className="absolute inset-0 flex items-center justify-center text-gray-500 font-semibold z-10 text-center">
                                Add Image to Appear Here
                           </span>
                        )}
                    </div>

                    <ImageDropzone setValue={setValue} watch={watch} setImagePreviews={setImagePreviews}/>

                    {/* Image Thumbnail Previews */}
                    <div className="max-h-[270px] overflow-y-auto space-y-4">
                        {imagePreviews.map((src, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                                <div className="w-14 h-14 bg-light-gray rounded-md overflow-hidden">
                                    <img src={src} alt={`Preview ${index}`} className="object-fit w-full h-full"/>
                                </div>
                                <span className="flex-grow text-sm">{`Image ${index + 1}`}</span>
                                <div className="flex items-center gap-4">
                                    <Eye size={22} onClick={() => previewImageChange(index)}
                                         className="text-gray-600 cursor-pointer hover:text-blue-600 hover:scale-110 transition"/>
                                    <X onClick={() => removeImage(index)}
                                       className="text-red-500 cursor-pointer hover:text-red-700 hover:scale-110 transition"/>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="mt-70 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-4 py-2 text-white rounded-md transition ${isSubmitting ? "bg-gray-400" : "bg-blue hover:bg-blue-700"}`}
                        >
                            {mode === "edit" ? "Update Product" : (isSubmitting ? "Submitting..." : "Add Product")}
                        </button>

                        {isDeleteEnable && (
                            <button type="button"
                                    className="w-full sm:w-auto px-6 py-2 text-red-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md">
                                DELETE
                            </button>
                        )}

                        <button type="button" onClick={handleCancel}
                                className="w-full sm:w-auto px-6 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md">
                            CANCEL
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
