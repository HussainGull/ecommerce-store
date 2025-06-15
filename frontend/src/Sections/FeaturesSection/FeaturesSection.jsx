import React from 'react';
import {FeaturesSectionData} from "@/Sections/FeaturesSection/FeaturesSectionData.jsx";

export default function FeaturesSection() {
    return (
        // Main container for the entire section, providing overall padding and centering
        <div className="font-poppins mt-40">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap justify-center gap-y-10 gap-x-6 md:gap-x-10">
                    {FeaturesSectionData.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center flex-[1_1_250px] max-w-sm"
                        >
                            {/* Icon Container */}
                            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-4">
                                <div className="w-14 h-14 bg-dark rounded-full flex items-center justify-center overflow-hidden">
                                    <img
                                        src={feature.icon}
                                        alt={feature.title}
                                        className="object-cover w-8 h-8"
                                    />
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-semibold text-dark mb-2">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-[14px] text-dark px-2 sm:px-4">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}
