import {ArrowLeft, ArrowRight} from "lucide-react";
import React from "react";

export default function Scroller({carouselRef}) {

    const scrollAmount = 802;
    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth' // Smooth scroll animation
            });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth' // Smooth scroll animation
            });
        }
    };

    return (
        <div className="flex gap-4 w-full justify-end max-[450px]:justify-start">
            <button
                onClick={scrollLeft}
                className="w-10 h-10 xl:w-14 xl:h-14 lg:w-13 lg:h-13 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                aria-label="Scroll left"
            >
                <ArrowLeft className={"xl:size-8 lg:size-8"} size={20}/>
            </button>
            <button
                onClick={scrollRight}
                className="w-10 h-10 xl:w-14 xl:h-14 lg:w-13 lg:h-13  flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                aria-label="Scroll right"
            >
                <ArrowRight className={"xl:size-8 lg:size-8"} size={20}/>
            </button>
        </div>
    )
}