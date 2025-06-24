import React, {useEffect, useState} from 'react';
import InputField from "@/Elements/InputField/InputField.jsx";
import FormLabel from "@/Elements/Label/FormLabel.jsx";
import TextArea from "@/Elements/TextArea/TextArea.jsx";
import {Selector} from "@/Elements/Select/Selector.jsx";
import {Controller, useForm} from 'react-hook-form';
import {Eye, X} from 'lucide-react';
import ImageDropzone from "@/Elements/DropZone/ImageDropzone.jsx";
import {useDispatch, useSelector} from 'react-redux';
import {addProduct} from "@/Redux-Toolkit/Features/Products/productsThunks.js";

export default function ProductForm({isDeleteEnable}) {
    const [imagePreviews, setImagePreviews] = useState([]);
    const [desiredPreviewIndex, setDesiredPreviewIndex] = useState(0);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.products.loading);
    const productsList = useSelector((state) => state.products.list);
    const error = useSelector((state) => state.products.error);

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        control,
        reset,
        setValue,
        watch,
    } = useForm({
        defaultValues: {
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
        },
    });

    const brand = [
        {value: "nike", label: "Nike"},
        {value: "adidas", label: "Adidas"},
        {value: "puma", label: "Puma"},
        {value: "armour", label: "Armour"},
    ];
    const category = [
        {value: "cleats", label: "Cleats"},
        {value: "grippers", label: "Grippers"},
        {value: "laceless", label: "Laceless"},
    ];

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


    useEffect(() => {
        console.log("Redux Toolkit List :", productsList)
    }, [productsList]);


    const onSubmit = async (productData) => {
        console.log("Form Data :", productData);
        dispatch(addProduct(productData));
        console.log(loading)
        console.log(error)
    }


    return (
        <div className="w-full overflow-hidden p-4 sm:p-6 md:p-8 lg:p-6 bg-white shadow-lg rounded-lg mt-10">
            <form onSubmit={handleSubmit(onSubmit)}
                  className="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,50%)_1fr] gap-8">
                <div className="flex-1 space-y-6 mb-8 lg:mb-0">
                    <div>
                        <FormLabel htmlFor="productName">Product Name</FormLabel>
                        <InputField id="productName"
                                    placeholder={"Product Name"} {...register('productName', {required: 'Product Name is required'})} />
                        {errors.productName && <p className="text-red-600 text-xs">{errors.productName.message}</p>}
                    </div>

                    <div>
                        <FormLabel htmlFor="description">Description</FormLabel>
                        <TextArea id="description"
                                  rows="4" {...register('description', {required: 'Description is required'})} />
                        {errors.description && <p className="text-red-600 text-xs">{errors.description.message}</p>}
                    </div>

                    <div>
                        <FormLabel htmlFor="category">Category</FormLabel>
                        <Controller
                            name="category"
                            control={control}
                            placeholder={"Category"}
                            rules={{required: 'Category is required'}}
                            render={({field}) => <Selector placeholder={'Choose Category'} label="Choose Category"
                                                           items={category} {...field} />}
                        />
                        {errors.category && <p className="text-red-600 text-xs">{errors.category.message}</p>}
                    </div>

                    <div>
                        <FormLabel htmlFor="brand">Brand</FormLabel>
                        <Controller
                            name="brand"
                            control={control}
                            rules={{required: 'Brand Name is required'}}
                            render={({field}) => <Selector placeholder={'Choose Brand'} label="Choose Brand"
                                                           items={brand} {...field} />}
                        />
                        {errors.brand && <p className="text-red-600 text-xs">{errors.brand.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <FormLabel htmlFor="sku">SKU</FormLabel>
                            <InputField id="sku"
                                        placeholder={'Enter SKU'} {...register('sku', {required: 'SKU is required'})} />
                            {errors.sku && <p className="text-red-600 text-xs">{errors.sku.message}</p>}
                        </div>
                        <div>
                            <FormLabel htmlFor="stockQuantity">Stock Quantity</FormLabel>
                            <InputField id="stockQuantity" placeholder={'Stock Quantity'}
                                        type="number" {...register('stockQuantity', {required: 'Stock Quantity is required'})} />
                            {errors.stockQuantity &&
                                <p className="text-red-600 text-xs">{errors.stockQuantity.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <FormLabel htmlFor="regularPrice">Regular Price</FormLabel>
                            <InputField id="regularPrice" placeholder={'Regular Price'} type="number"
                                        step="0.01" {...register('regularPrice', {required: 'Regular Price is required'})} />
                            {errors.regularPrice &&
                                <p className="text-red-600 text-xs">{errors.regularPrice.message}</p>}
                        </div>
                        <div>
                            <FormLabel htmlFor="salePrice">Sale Price</FormLabel>
                            <InputField id="salePrice" placeholder={'Sale Price'} type="number"
                                        step="0.01" {...register('salePrice')} />
                        </div>
                    </div>

                    <div>
                        <FormLabel htmlFor="tags">Tags</FormLabel>
                        <InputField id="tags" placeholder={'Choose Tags'} {...register('tags')} />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">

                    <div
                        className="w-full h-70 bg-gray-200 p-2 rounded-md flex items-center justify-center relative overflow-hidden"
                    >
                        {imagePreviews[0] ? (
                            <img
                                src={imagePreviews[desiredPreviewIndex]}
                                alt="Add Image to Appear Here"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none'; // Hide broken image
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

                    <ImageDropzone
                        setValue={setValue}
                        watch={watch}
                        setImagePreviews={setImagePreviews}
                    />


                    {/* Preview Images */}
                    <div className="max-h-[270px] overflow-y-auto space-y-4">
                        {imagePreviews.map((src, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                                <div className="w-14 h-14 bg-light-gray rounded-md overflow-hidden">
                                    <img src={src} alt={`Preview ${index}`} className="object-fit w-full h-full"/>
                                </div>
                                <span className="font-poppins flex-grow text-sm text-dark-gray">Image {index + 1}</span>
                                <div className={'flex items-center  gap-4'}>
                                    <Eye
                                        size={22}
                                        onClick={() => previewImageChange(index)}
                                        className="text-gray-600 hover:text-blue-600 hover:scale-110 transform transition-all duration-200 cursor-pointer"
                                    />

                                    <X
                                        onClick={() => removeImage(index)}
                                        className="text-red-500 hover:text-red-700 hover:scale-110 transform transition-all duration-200 cursor-pointer"
                                    />

                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="mt-70 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-4 py-2 text-white rounded-md transition
                            ${isSubmitting ? "bg-gray-400" : "bg-blue hover:bg-blue-700"}`}
                        >
                            {isSubmitting ? "Submitting" : "Add Product"}
                        </button>
                        {isDeleteEnable && (
                            <button type="button"
                                    className="w-full sm:w-auto px-6 py-2 text-red-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md">DELETE
                            </button>
                        )}
                        <button type="button" onClick={() => reset()}
                                className="w-full sm:w-auto px-6 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md">CANCEL
                        </button>
                    </div>

                </div>

            </form>
        </div>
    );
}
