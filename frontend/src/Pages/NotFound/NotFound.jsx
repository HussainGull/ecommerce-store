import React from 'react';
import RedColorButton from "@/Elements/Buttons/RedColorButton.jsx";
import {Link} from "react-router-dom";
import RedLinkButton from "@/Elements/LinkButtons/RedLinkButton.jsx";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white font-poppins flex flex-col">
            {/* Top Breadcrumbs */}
            <div className="py-8 px-4 sm:px-6 md:px-10 lg:px-20">
                <div className="text-sm text-gray-600">
                    <span className="text-gray-400">Home / </span>
                    <span className="font-medium text-gray-800">404 Error</span>
                </div>
            </div>

            {/* Main Content Area - Centered */}
            <div className="flex-grow flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-10">
                <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-900 mb-6">
                    404 Not Found
                </h1>
                <p className="text-base sm:text-lg text-gray-700 mb-10 max-w-md">
                    Your visited page not found. You may go home page.
                </p>
                <RedLinkButton
                    LinkTo="/"
                    Text={'Back to Home Page'}
                >
                </RedLinkButton>
            </div>
        </div>
    );
}
