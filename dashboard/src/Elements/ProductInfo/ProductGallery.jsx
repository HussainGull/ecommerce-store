// components/ProductInfo/ProductGallery.jsx
import React from 'react';

const ProductGallery = () => (
    <div className="space-y-6">
        <div
            className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xl font-semibold">
            {/* Placeholder for image */}
        </div>
        <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Product Gallery</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="mt-2 text-sm text-gray-600">Drop your image here, or <span
                    className="font-medium text-blue-600 cursor-pointer">browse</span></p>
                <p className="mt-1 text-xs text-gray-500">jpeg, png are allowed</p>
            </div>
        </div>
        <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                    <div className="w-12 h-12 bg-gray-200 rounded-md">
                        <img src={'/src/assets/footballshoes.png'} alt={'Football Shoes'}/>
                    </div>
                    <span className="font-poppins flex-grow text-sm text-gray-700">Nike Predator</span>
                    <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"/>
                    </svg>
                </div>
            ))}
        </div>
    </div>
);

export default ProductGallery;
