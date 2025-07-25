import {Eye, Heart, Star} from "lucide-react";
import React from "react";
import {Link} from "react-router-dom";

export default function Product({product, showAddToCartButton = true, showDiscountTag = true}) {

    // Default product data to use if no product prop is provided
    const defaultProduct = {
        id: 1,
        name: 'HAVIT HV-G92 Gamepad',
        imageUrl: 'https://placehold.co/200x200/E0E0E0/555555?text=Product+Image', // Placeholder image
        price: '$120',
        oldPrice: '$160',
        discount: '-40%',
        rating: 4, // Number of filled stars
        reviews: 88,
    };

    // Use provided product data or fallback to default
    const currentProduct = product || defaultProduct;
    const discountPercentage = ((currentProduct?.salePrice / currentProduct?.regularPrice) * 100).toFixed()
    // Classes for the "Add To Cart" button (always includes hover effect if rendered)
    const addToCartButtonBaseClasses = `
        h-10 absolute bottom-0 left-0 right-0
        bg-black text-white text-base font-medium
        flex items-center justify-center
        opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out
    `;

    return (
        <div className="font-poppins w-full min-w-[270px] h-[380px] mt-10 overflow-hidden rounded-lg shadow-md">
            {/* Image Section */}
            <div
                className="relative w-full h-[250px] bg-light flex items-center justify-center rounded-t-md overflow-hidden group">
                {
                    currentProduct.productImage ? (
                            <img src={currentProduct.productImage} alt={currentProduct.productName}
                                 className="max-w-[80%] max-h-[80%] object-contain"/>)
                        : (
                            <div
                                className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">No
                                Image</div>
                        )
                }
                {
                    // Conditionally render the discount tag based on currentProduct.discount and showDiscountTag prop
                    currentProduct.salePrice && showDiscountTag && (
                        <span
                            className="w-[55px] h-[26px] absolute top-3 left-3 bg-error text-white px-2 py-1 rounded-md text-xs font-light flex items-center justify-center">
                            {discountPercentage}%
                        </span>)
                }
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <button
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md text-gray-700 hover:text-red-500 transition-colors duration-200"
                        aria-label="Add to wishlist"><Heart size={18}/>
                    </button>
                    <Link
                        to="/product-details"
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md text-gray-700 hover:text-blue-500 transition-colors duration-200"
                        aria-label="Quick view"
                    >
                        <Eye size={18} />
                    </Link>

                </div>
                {
                    // Conditionally render the "Add To Cart" button based on showAddToCartButton prop
                    showAddToCartButton && (
                        <button
                            className={addToCartButtonBaseClasses.trim()}
                            aria-label="Add to cart">
                            Add To Cart
                        </button>
                    )
                }
            </div>

            {/* Product Details Section */}
            <div className="w-full flex flex-col mt-4 px-2 pb-4">
                <span className="text-dark text-base font-medium">
                    {currentProduct.productName}
                </span>
                <span className="text-hover-warn font-medium mt-1">
                    {currentProduct.salePrice}PKR…
                    {currentProduct.regularPrice && (
                        <span className="text-gray-400 line-through ml-2">
                                {currentProduct.regularPrice}PKR
                        </span>)}
                </span>
                <div className="flex items-center gap-1 mt-1">
                    {Array.from({length: 5}).map((_, i) => ( // Render 5 stars
                        <Star
                            key={i}
                            size={16} // Adjust icon size
                            className={i < currentProduct.rating ? "text-yellow-400 fill-yellow-400" // Filled star
                                : "text-gray-300" // Empty star
                            }
                        />))}
                    <span className="text-gray-500 text-sm ml-1">
                        ({currentProduct.reviews})
                    </span>
                </div>
            </div>
        </div>
    )
}
