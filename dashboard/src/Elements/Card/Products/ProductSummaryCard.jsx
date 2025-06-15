import React, {useEffect, useRef, useState} from "react";
import {ArrowUpFromDot, MoreHorizontal} from "lucide-react";
import Boundary from "@/Elements/Boundary/Boundary.jsx";
import ProgressBar from "@/Elements/ProgressBar/ProgressBar.jsx";

export default function ProductSummaryCard({article}) {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [showReadMoreButton, setShowReadMoreButton] = useState(false);
    const descriptionRef = useRef(null);

    const formattedPrice = article.price ? `₹${article.price.toFixed(2)}` : 'N/A';

    useEffect(() => {
        if (descriptionRef.current) {
            const el = descriptionRef.current;
            // Only check for overflow when not expanded
            if (!isDescriptionExpanded) {
                setShowReadMoreButton(el.scrollHeight > el.clientHeight);
            }
        }
    }, [article.description, isDescriptionExpanded]);


    const toggleDescription = () => {
        setIsDescriptionExpanded(prev => !prev);
    };

    return (
        <div className="w-full max-w-sm bg-light rounded-xl p-6 shadow-lg flex flex-col gap-6">
            {/* Top Section */}
            <div className="flex items-start gap-4">
                {/* Product Image */}
                <div className="w-24 h-24 flex-shrink-0">
                    <img
                        src="/src/assets/footballshoes.png"
                        alt="Product Image"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Product Info */}
                <div className="flex-grow flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-semibold text-dark leading-tight flex-1 mr-2 break-words">
                            {article.title}
                        </h3>
                        <div className="flex-shrink-0 w-8 h-8 bg-gray-200 flex items-center justify-center rounded-lg">
                            <MoreHorizontal size={18} className="text-dark cursor-pointer"/>
                        </div>
                    </div>


                    {/* Description */}
                    <p
                        ref={descriptionRef}
                        className={`
                            text-sm text-gray-500 mt-1 transition-all duration-300
                            ${isDescriptionExpanded ? '' : 'line-clamp-2'}
                        `}
                    >
                        {article.description}
                    </p>

                    {(showReadMoreButton || isDescriptionExpanded) && (
                        <button
                            onClick={toggleDescription}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-1 self-start"
                        >
                            {isDescriptionExpanded ? 'Show Less' : 'Read More'}
                        </button>
                    )}


                    <p className="text-lg font-bold text-dark mt-2">{formattedPrice}</p>
                </div>
            </div>

            {/* Summary */}
            <div className="mt-2">
                <h4 className="text-lg font-semibold text-dark mb-2">Summary</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                    {article.summary}
                </p>
            </div>

            {/* Footer */}
            <div className="border border-gray-200 rounded-lg">
                <div className="flex flex-col p-4">
                    {/* Sales */}
                    <div className="flex items-center justify-between">
                        <span className="text-base text-dark">{article.sales}</span>
                        <div className="flex items-center gap-2">
                            <ArrowUpFromDot className="w-4 h-4 text-orange-500"/>
                            <span className="text-base font-semibold text-dark">{article.sales}</span>
                        </div>
                    </div>
                    <Boundary/>

                    {/* Remaining */}
                    <div className="flex items-center justify-between">
                        <span className="text-base text-dark">Remaining Products</span>
                        <div className="flex items-center gap-2">
                            <div className="w-20 h-1 bg-[var(--color-progress-track)] rounded-full overflow-hidden">
                                <ProgressBar value={article.remaining}/>
                            </div>
                            <span className="text-base font-semibold text-dark">
                                {article.remaining}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
