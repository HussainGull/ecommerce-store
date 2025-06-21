// src/Elements/ImageDropzone/ImageDropzone.jsx
import React from 'react';
import { useDropzone } from 'react-dropzone';

export default function ImageDropzone({ setValue, watch, setImagePreviews }) {
    const onDrop = (acceptedFiles) => {
        const existingFiles = watch("productImages") || [];

        const uniqueFiles = acceptedFiles.filter((newFile) => {
            return !existingFiles.some(
                (existingFile) =>
                    existingFile.name === newFile.name &&
                    existingFile.size === newFile.size
            );
        });

        if (uniqueFiles.length === 0) return;

        const newPreviews = uniqueFiles.map((file) => URL.createObjectURL(file));

        setImagePreviews((prev) => [...prev, ...newPreviews]);
        setValue("productImages", [...existingFiles, ...uniqueFiles], {
            shouldValidate: true,
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': []
        },
        multiple: true
    });

    return (
        <div
            {...getRootProps()}
            className={`border-2 border-dashed border-gray-300 rounded-md p-6 text-center relative ${
                isDragActive ? "bg-blue-50 border-blue-500" : ""
            }`}
        >
            <input {...getInputProps()} />
            <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
            >
                <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <p className="mt-2 text-sm text-dark-gray">
                Drop your image here or
                <span className="ml-2 text-blue-600 underline cursor-pointer">
                    Browse Files
                </span>
            </p>
            <p className="mt-1 text-xs text-dark-gray">jpeg, png are allowed</p>
        </div>
    );
}
