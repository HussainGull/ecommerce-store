import React, {useState, useEffect} from 'react';
import {images} from "@/Elements/PromoCarousel/HeroPromoCarousel/PromoCarouselData.jsx";
import PromoCarouselHeading from "@/Elements/PromoCarousel/HeroPromoCarousel/PromoCarouselHeading.jsx"; // For the "Shop Now" arrow

export default function PromoCarousel() {

    const [currentIndex, setCurrentIndex] = useState(0); // State to track the current active image
    const slideInterval = 5000; // Time in milliseconds for auto-slide

    // Effect for automatic sliding
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, slideInterval);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, [images.length, slideInterval]);

    // Function to handle manual navigation via dots
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (

        <div
            className="relative w-full h-[350px] max-[430px]:h-[200px] max-[380px]:h-[170px] max-w-screen-xl mt-10 xl:ml-11 xl:mt-10 overflow-hidden rounded-lg shadow-lg ">

            {/* Carousel Images */}
            <div
                className="flex h-full transition-transform duration-700 ease-in-out"
                style={{transform: `translateX(-${currentIndex * 100}%)`}}
            >
                {images.map((image, index) => (
                    <div key={index}
                         className="w-full h-full flex-shrink-0 relative bg-black"> {/* Height set to 350px */}
                        {/* Background Image */}
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full  opacity-70" // Added opacity to make text stand out
                        />

                        {/* Content Overlay */}
                        <div
                            className="absolute inset-0 flex flex-col justify-center items-start max-[330px]:p-4 p-6 sm:p-10 md:p-16 text-white">
                            <PromoCarouselHeading
                                title={image.title}
                                subtitle={image.subtitle}
                                routerPath={image.to}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigators (Dots) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                            currentIndex === index ? 'bg-error border-1 border-white' : 'bg-muted hover:bg-gray-300'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>

        </div>
    );
}
