import React from "react";
// Import the data array
import { NewArrivalsData } from "@/Sections/NewArrivals/NewArrivalsData.jsx";

export default function ArrivalsCarousel() {
    // Assign data items to specific sections for clarity
    const playstationData = NewArrivalsData[0];
    const womenCollectionData = NewArrivalsData[1];
    const speakersData = NewArrivalsData[2];
    const perfumeData = NewArrivalsData[3];

    return (
        <div className="bg-white font-poppins mt-15">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto"> {/* Added max-w and mx-auto for content centering */}

                {/* Left Side: PlayStation Card */}
                <div className="relative rounded-lg overflow-hidden bg-gray-900 text-white flex flex-col justify-end h-[500px] lg:h-[600px]">
                    {/* Image positioned to allow background to show if image isn't full bleed */}
                    <img
                        src={playstationData.imageUrl} // Use imageUrl from data
                        alt={playstationData.name} // Use name from data for alt text
                        className="w-full h-full object-cover absolute inset-0 z-0"
                    />

                    {/* Text Content Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 z-10 flex flex-col justify-end p-6">
                        <h2 className="text-2xl md:text-4xl font-semibold mb-2">{playstationData.name}</h2> {/* Use name from data */}
                        <p className="text-sm md:text-base mt-1 mb-4">{playstationData.description}</p> {/* Use description from data */}
                        <a
                            href="#"
                            className="mt-3 text-lg font-medium inline-block underline hover:text-red-500 transition-colors duration-300"
                        >
                            Shop Now
                        </a>
                    </div>
                </div>

                {/* Right Side: Grid of 3 cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                    {/* Women's Collection (Top Right - spans 2 columns) */}
                    <div className="relative rounded-lg overflow-hidden bg-gray-900 text-white flex flex-col justify-end sm:col-span-2 h-[240px] md:h-[280px]">
                        {/* Background Image */}
                        <img
                            src={womenCollectionData.imageUrl} // Use imageUrl from data
                            alt={womenCollectionData.name} // Use name from data
                            className="w-full h-full object-cover absolute inset-0 z-0"
                        />

                        {/* Text Content Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-40 z-10 flex flex-col justify-end p-6">
                            <h2 className="text-2xl font-semibold">{womenCollectionData.name}</h2> {/* Use name from data */}
                            <p className="text-sm mt-1">{womenCollectionData.description}</p> {/* Use description from data */}
                            <a href="#" className="mt-3 underline hover:text-red-500 transition-colors duration-300">Shop Now</a>
                        </div>
                    </div>

                    {/* Speakers (Bottom Left) */}
                    <div className="relative rounded-lg overflow-hidden bg-gray-900 text-white flex flex-col justify-end h-[240px] md:h-[280px]">
                        {/* Background Image */}
                        <img
                            src={speakersData.imageUrl} // Use imageUrl from data
                            alt={speakersData.name} // Use name from data
                            className="w-full h-full object-cover absolute inset-0 z-0"
                        />

                        {/* Text Content Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-40 z-10 flex flex-col justify-end p-4">
                            <h3 className="text-lg font-semibold">{speakersData.name}</h3> {/* Use name from data */}
                            <p className="text-sm mt-1">{speakersData.description}</p> {/* Use description from data */}
                            <a href="#" className="mt-3 underline hover:text-red-500 transition-colors duration-300">Shop Now</a>
                        </div>
                    </div>

                    {/* Perfume (Bottom Right) */}
                    <div className="relative rounded-lg overflow-hidden bg-gray-900 text-white flex flex-col justify-end h-[240px] md:h-[280px]">
                        {/* Background Image */}
                        <img
                            src={perfumeData.imageUrl} // Use imageUrl from data
                            alt={perfumeData.name} // Use name from data
                            className="w-full h-full object-cover absolute inset-0 z-0"
                        />

                        {/* Text Content Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-40 z-10 flex flex-col justify-end p-4">
                            <h3 className="text-lg font-semibold">{perfumeData.name}</h3> {/* Use name from data */}
                            <p className="text-sm mt-1">{perfumeData.description}</p> {/* Use description from data */}
                            <a href="#" className="mt-3 underline hover:text-red-500 transition-colors duration-300">Shop Now</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
