import React, { useState, useEffect } from 'react';
import PromoCarouselHeading from "@/Elements/PromoCarousel/HeroPromoCarousel/PromoCarouselHeading.jsx";
import { fetchSliders } from "@/Redux-ToolKit/Features/Sliders/sliderThunk.js";
import { useDispatch, useSelector } from "react-redux";

export default function PromoCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideInterval = 5000;
    const dispatch = useDispatch();
    const { sliders } = useSelector((state) => state.slider);

    useEffect(() => {
        dispatch(fetchSliders());
    }, [dispatch]);

    // useEffect(() => {
    //     console.log("Fetched sliders:", sliders);
    // }, [sliders]);

    // Auto-slide
    useEffect(() => {
        if (sliders.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % sliders.length);
        }, slideInterval);

        return () => clearInterval(interval);
    }, [sliders.length, slideInterval]);

    // Manual slide via dots
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full h-[350px] max-[430px]:h-[200px] max-[380px]:h-[170px] max-w-screen-xl mt-10 xl:ml-11 xl:mt-10 overflow-hidden rounded-lg shadow-lg">
            {/* Slider Images */}
            <div
                className="flex h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {sliders.map((slider, index) => (
                    <div
                        key={slider._id}
                        className="w-full h-full flex-shrink-0 relative bg-black"
                    >
                        <img
                            src={slider.sliderImage}
                            alt={slider.heading}
                            className="w-full h-full object-cover object-center opacity-70"
                        />

                        <div className="absolute inset-0 flex flex-col justify-center items-start max-[330px]:p-4 p-6 sm:p-10 md:p-16 text-white">
                            <PromoCarouselHeading
                                title={slider.heading}
                                subtitle={slider.paragraph}
                                routerPath={slider.ctaLink}
                                ctaText={slider.ctaText}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Dots Navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {sliders.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                            currentIndex === index
                                ? 'bg-error border border-white'
                                : 'bg-muted hover:bg-gray-300'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>
        </div>
    );
}
