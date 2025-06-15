import React, { useState } from 'react';
import { Star, Heart, Plus, Minus, Truck, RotateCcw } from 'lucide-react';
import FlashSales from "@/Sections/FlashSales/FlashSales.jsx";
import RoutePathDisplay from "@/Elements/RoutePathDisplay/RouthPathDisplay.jsx"; // Icons from lucide-react

export default function ProductDetail() {
    // Dummy product data
    const product = {
        name: 'Havic HV G-92 Gamepad',
        rating: 4.5,
        reviews: 150,
        inStock: true,
        price: 192.00,
        description: 'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
        colors: ['#DB4444', '#000000'], // Red and Black
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        images: [
            'https://picsum.photos/id/23/600/600', // Main image placeholder
            'https://picsum.photos/id/24/100/100', // Thumbnail 1
            'https://picsum.photos/id/25/100/100', // Thumbnail 2
            'https://picsum.photos/id/26/100/100', // Thumbnail 3
            'https://picsum.photos/id/27/100/100', // Thumbnail 4
        ]
    };

    const [mainImage, setMainImage] = useState(product.images[0]);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [quantity, setQuantity] = useState(1);
    const [postalCode, setPostalCode] = useState('');

    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const handleBuyNow = () => {
        alert(`Buying ${quantity} of ${product.name}!`);
        // Add to cart logic here
    };

    const handleAddToWishlist = () => {
        alert(`${product.name} added to wishlist!`);
    };

    return (
        <div className="bg-white font-poppins">
            {/* Top Breadcrumbs */}
            <div className="py-8 mt-20 ">
                <RoutePathDisplay/>
            </div>

            {/* Main Product Display Section */}
            <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-0 py-6 sm:py-8 md:py-10 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-16">
                {/* Left Side: Image Gallery */}
                <div className="flex flex-col md:flex-row-reverse gap-3 sm:gap-4"> {/* flex-row-reverse to put main image on right on desktop */}
                    {/* Main Product Image */}
                    <div className="flex-1 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                            src={mainImage}
                            alt={product.name}
                            className="max-w-[90%] max-h-[90%] object-contain"
                        />
                    </div>
                    {/* Thumbnail Images */}
                    <div className="flex md:flex-col gap-2 sm:gap-3 justify-center md:justify-start">
                        {product.images.map((imgSrc, index) => (
                            <div
                                key={index}
                                className={`w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-md flex items-center justify-center cursor-pointer overflow-hidden
                        ${mainImage === imgSrc ? 'border-2 border-red-500' : 'border border-gray-200'}
                        hover:border-red-500 transition-colors duration-200`}
                                onClick={() => setMainImage(imgSrc)}
                            >
                                <img src={imgSrc} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-contain" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Product Details */}
                <div className="flex flex-col justify-between">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-1 sm:mb-2">{product.name}</h1>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2 sm:mb-4">
                        {/* Rating Stars */}
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                size={16}
                                className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                            />
                        ))}
                        <span className="text-gray-600 text-xs sm:text-sm">({product.reviews} Reviews)</span>
                        <span className="h-3 sm:h-4 w-px bg-gray-300 mx-1 sm:mx-2"></span> {/* Separator */}
                        <span className={`text-xs sm:text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">${product.price.toFixed(2)}</p>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed border-b border-gray-200 pb-4 sm:pb-6 mb-4 sm:mb-6">
                        {product.description}
                    </p>

                    {/* Colors */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4 sm:mb-6">
                        <span className="text-gray-800 font-medium text-sm">Colours:</span>
                        {product.colors.map((color, index) => (
                            <button
                                key={index}
                                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 ${selectedColor === color ? 'border-gray-900' : 'border-transparent'} transition-all duration-200`}
                                style={{ backgroundColor: color }}
                                onClick={() => setSelectedColor(color)}
                                aria-label={`Select color ${color}`}
                            ></button>
                        ))}
                    </div>

                    {/* Sizes */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4 sm:mb-6">
                        <span className="text-gray-800 font-medium text-sm">Size:</span>
                        {product.sizes.map((size, index) => (
                            <button
                                key={index}
                                className={`px-3 py-1.5 sm:px-4 sm:py-2 border rounded-md text-xs sm:text-sm font-medium
                        ${selectedSize === size ? 'bg-red-500 text-white' : 'border-gray-300 text-gray-800 hover:bg-gray-100'}
                        transition-colors duration-200`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>

                    {/* Quantity, Buy Now, Wishlist */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                        <div className="flex items-center border border-gray-300 rounded-md max-w-[120px] sm:max-w-none">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                className="px-3 py-1.5 sm:px-4 sm:py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 rounded-l-md"
                                aria-label="Decrease quantity"
                            >
                                <Minus size={14} />
                            </button>
                            <input
                                type="text"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-10 sm:w-12 text-center border-x border-gray-300 focus:outline-none focus:ring-0 text-base font-medium"
                                readOnly
                            />
                            <button
                                onClick={() => handleQuantityChange(1)}
                                className="px-3 py-1.5 sm:px-4 sm:py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 rounded-r-md"
                                aria-label="Increase quantity"
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                        <button
                            onClick={handleBuyNow}
                            className="px-6 py-2.5 sm:px-8 sm:py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 font-medium text-sm sm:text-base flex-grow sm:flex-grow-0"
                        >
                            Buy Now
                        </button>
                        <button
                            onClick={handleAddToWishlist}
                            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200 self-start sm:self-auto"
                            aria-label="Add to wishlist"
                        >
                            <Heart size={20} />
                        </button>
                    </div>

                    {/* Delivery & Return Information */}
                    <div className="border border-gray-300 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border-b border-gray-200">
                            <Truck size={20} className="text-gray-800 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-sm sm:text-base font-medium text-gray-900">Free Delivery</h3>
                                <p className="text-xs sm:text-sm text-gray-600">
                                    Enter your postal code for Delivery Availability
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4">
                            <RotateCcw size={20} className="text-gray-800 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-sm sm:text-base font-medium text-gray-900">Return Delivery</h3>
                                <p className="text-xs sm:text-sm text-gray-600">
                                    Free 30 Days Delivery Returns. <a href="#" className="underline hover:text-red-500">Details</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Item Section (Placeholder) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-0 py-16 mt-35">
                <FlashSales></FlashSales>
            </div>
        </div>
    );
}
