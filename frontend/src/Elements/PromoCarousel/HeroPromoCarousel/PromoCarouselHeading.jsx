import {ArrowRight} from "lucide-react";
import React from "react";
import {Link} from "react-router-dom";

export default function PromoCarouselHeading(
    {title, subtitle, routerPath, ctaText }
) {
    return (
        <>
            {/* Apple Logo */}
            <span className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl mb-1 sm:mb-2"></span>

            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
                {title}
            </h2>

            <p className="text-base xs:text-lg sm:text-xl md:text-2xl mb-2 sm:mb-4">
                {subtitle}
            </p>

            <Link
                to={routerPath}
                className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 text-base xs:text-lg sm:text-xl md:text-2xl font-medium underline hover:text-gray-300 transition-colors duration-300"
            >
                {ctaText} <ArrowRight size={20} className="xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
            </Link>
        </>

    )
}