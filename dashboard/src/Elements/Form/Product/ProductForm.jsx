import React, {useEffect, useState} from 'react';
import InputField from "@/Elements/InputField/InputField.jsx";
import FormLabel from "@/Elements/Label/FormLabel.jsx";
import TextArea from "@/Elements/TextArea/TextArea.jsx";
import {Selector} from "@/Elements/Select/Selector.jsx";
import {Controller, useForm} from 'react-hook-form';
import {Eye, X} from 'lucide-react';

export default function ProductForm() {
    const [imagePreviews, setImagePreviews] = useState([]);
    const [desiredPreviewIndex, setDesiredPreviewIndex] = useState(0);

    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
        reset,
        setValue,
        watch
    } = useForm({
        defaultValues: {
            productName: '',
            description: '',
            category: '',
            brandName: '',
            sku: '',
            stockQuantity: '',
            regularPrice: '',
            salePrice: '',
            tags: '',
            productImages: [],
        },
    });

    const fruitOptions = [
        {value: "apple", label: "Apple"},
        {value: "banana", label: "Banana"},
        {value: "blueberry", label: "Blueberry"},
        {value: "grapes", label: "Grapes"},
        {value: "pineapple", label: "Pineapple"},
    ];

    const handleImageChange = (e) => {
        const newFiles = Array.from(e.target.files);
        const existingFiles = watch("productImages") || [];

        // 🔍 Filter out duplicates by name and size
        const uniqueFiles = newFiles.filter((newFile) => {
            return !existingFiles.some((existingFile) => existingFile.name === newFile.name && existingFile.size === newFile.size);
        });

        // If no unique files, exit early
        if (uniqueFiles.length === 0) return;

        // 🖼️ Generate previews for new unique files
        const newPreviews = uniqueFiles.map((file) => URL.createObjectURL(file));

        // ✅ Append previews
        setImagePreviews((prev) => [...prev, ...newPreviews]);

        // ✅ Update react-hook-form field
        setValue("productImages", [...existingFiles, ...uniqueFiles], {
            shouldValidate: true,
        });

        // Reset file input to allow re-selection of the same file later
        e.target.value = null;

    };


    const removeImage = (index) => {
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        const currentFiles = watch("productImages") || [];
        const newFiles = currentFiles.filter((_, i) => i !== index);

        setImagePreviews(newPreviews);
        setValue("productImages", newFiles, {shouldValidate: true});
    };

    const previewImageChange = (index) => {
        setDesiredPreviewIndex(index);
    };

    const onSubmit = async (data) => {
        console.log(data)
        // try {
        //     const formData = new FormData();
        //
        //     Object.entries(data).forEach(([key, value]) => {
        //         if (key === 'productImages') {
        //             value.forEach(file => formData.append('productImage', file));
        //         } else {
        //             formData.append(key, value);
        //         }
        //     });
        //
        //     const res = await axiosClient.post('/product/add-product', formData, {
        //         headers: { 'Content-Type': 'multipart/form-data' },
        //     });
        //
        //     showToast({
        //         title: "✅ Product Added!",
        //         description: "Product is added successfully!",
        //     });
        //
        //     console.log(res)
        //     reset();
        //     setImagePreviews([]);
        //
        // } catch (error) {
        //     const status = error.response?.status;
        //     const message = error.response?.data?.message || error.message;
        //     showToast({ title: status, description: message });
        // }
    };

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
                                                           items={fruitOptions} {...field} />}
                        />
                        {errors.category && <p className="text-red-600 text-xs">{errors.category.message}</p>}
                    </div>

                    <div>
                        <FormLabel htmlFor="brandName">Brand</FormLabel>
                        <Controller
                            name="brandName"
                            control={control}
                            rules={{required: 'Brand Name is required'}}
                            render={({field}) => <Selector placeholder={'Choose Brand'} label="Choose Brand"
                                                           items={fruitOptions} {...field} />}
                        />
                        {errors.brandName && <p className="text-red-600 text-xs">{errors.brandName.message}</p>}
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
                        className="w-full h-64 bg-gray-200 p-2 rounded-md flex items-center justify-center relative overflow-hidden"
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

                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center relative">
                        <input
                            id="productImages"
                            type="file"
                            accept="image/png, image/jpeg"
                            multiple
                            onChange={handleImageChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                             viewBox="0 0 48 48">
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className="mt-2 text-sm text-dark-gray">Drop your image here or
                            <label htmlFor="productImages"
                                   className="ml-2 mt-3 inline-block text-sm font-medium  cursor-pointer rounded-md ">
                                Browse Files
                            </label>
                        </p>
                        <p className="mt-2 text-xs text-dark-gray">jpeg, png are allowed</p>
                    </div>

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

                </div>
            </form>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                <button type="submit" onClick={handleSubmit(onSubmit)}
                        className="w-full sm:w-auto px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md">UPDATE
                </button>
                <button type="button"
                        className="w-full sm:w-auto px-6 py-2 text-red-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md">DELETE
                </button>
                <button type="button" onClick={() => reset()}
                        className="w-full sm:w-auto px-6 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md">CANCEL
                </button>
            </div>
        </div>
    );
}
