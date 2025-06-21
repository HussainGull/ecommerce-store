import React, {useEffect, useRef, useState} from "react";
import Boundary from "@/Elements/Boundary/Boundary.jsx";
import ProgressBar from "@/Elements/ProgressBar/ProgressBar.jsx";
import Dropdown from "@/Elements/Dropdown/Dropdown.jsx";

export default function ProductSummaryCard({ProductDetails}) {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [showReadMoreButton, setShowReadMoreButton] = useState(false);
    const descriptionRef = useRef(null);

    const formattedPrice = ProductDetails.regularPrice ? `₹${ProductDetails.regularPrice.toFixed(2)}` : 'N/A';
    const formattedSalePrice = ProductDetails.salePrice ? `₹${ProductDetails.salePrice.toFixed(2)}` : 'N/A';

    useEffect(() => {
        if (descriptionRef.current) {
            const el = descriptionRef.current;
            if (!isDescriptionExpanded) {
                setShowReadMoreButton(el.scrollHeight > el.clientHeight);
            }
        }
    }, [ProductDetails.description, isDescriptionExpanded]);

    const toggleDescription = () => {
        setIsDescriptionExpanded(prev => !prev);
    };

    return (
        <div className="w-full max-w-sm bg-white rounded-xl p-4 shadow-lg flex flex-col gap-6">
            {/* Top Section */}
            <div className="flex flex-col gap-4">
                {/*Product Image */}
                <div className="w-full h-48 overflow-hidden rounded-lg bg-gray-100">
                    <img
                        src={ProductDetails.productImage?.[0] || "https://via.placeholder.com/150"}
                        alt={ProductDetails.productName}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Product Info */}
                <div className="flex justify-between items-start">
                    <h3 className="font-poppins text-xl font-semibold text-dark leading-tight">
                        {ProductDetails.productName}
                    </h3>
                    <Dropdown productId={ProductDetails._id}/>
                </div>

                {/* Description */}
                <p
                    ref={descriptionRef}
                    className={`font-poppins text-sm text-gray-600 transition-all duration-300 ${isDescriptionExpanded ? '' : 'line-clamp-2'}`}
                >
                    {ProductDetails.description}
                </p>

                {(showReadMoreButton || isDescriptionExpanded) && (
                    <button
                        onClick={toggleDescription}
                        className="font-poppins text-blue-600 hover:text-blue-800 text-sm font-medium mt-1 self-start"
                    >
                        {isDescriptionExpanded ? 'Show Less' : 'Read More'}
                    </button>
                )}
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                    <p className="font-poppins font-medium text-gray-900">SKU</p>
                    <p className={"font-poppins"}>{ProductDetails.sku}</p>
                </div>
                <div>
                    <p className="font-poppins font-medium text-gray-900">Tags</p>
                    <p className={"font-poppins"}>{ProductDetails.tags?.join(', ')}</p>
                </div>
                <div>
                    <p className="font-poppins font-medium text-gray-900">Regular Price</p>
                    <p className={"font-poppins"}>{formattedPrice}</p>
                </div>
                <div>
                    <p className="font-poppins font-medium text-gray-900">Sale Price</p>
                    <p className={"font-poppins"}>{formattedSalePrice}</p>
                </div>
                <div className="col-span-2">
                    <p className="font-poppins font-medium text-gray-900">Stock Quantity</p>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <ProgressBar value={ProductDetails.stockQuantity}/>
                        </div>
                        <span
                            className="font-poppins text-sm font-medium text-gray-800">{ProductDetails.stockQuantity}</span>
                    </div>
                </div>
            </div>

            <Boundary/>
        </div>
    );
}
