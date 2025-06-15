import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {ChevronDown} from 'lucide-react'
import {NavigationRoutes} from "@/Elements/Header/NavigationRoutes.jsx";

export default function Sidebar() {
    const location = useLocation(); // Get the current location object from react-router-dom

    // State to manage the expanded/collapsed status of the Categories dropdown
    const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);

    // Function to toggle the Categories dropdown
    const toggleCategories = () => {
        setIsCategoriesExpanded(!isCategoriesExpanded);
    };

    // Helper function to render a single navigation item
    const renderNavItem = (item, isSubItem = false) => {

        // Determine if this is the currently active item by comparing its path with location.pathname
        // For sub-items, check if the current path exactly matches or starts with the sub-item's path
        const isActive = location.pathname === item.path || (isSubItem && location.pathname.startsWith(item.path));

        // Base classes for all navigation items
        const baseClasses = `flex items-center p-3 rounded-md transition-colors duration-200 ease-in-out`;

        // Classes for the active state (blue background, white text)
        const activeClasses = 'bg-blue text-light font-medium hover:bg-blue-700'; // Darker blue for active, white text

        // Classes for the default (inactive) state
        const defaultClasses = 'text-dark-gray hover-bg-light-gray font-medium';

        return (
            <li key={item.name} className={isSubItem ? 'mt-1' : 'mb-2'}> {/* Adjust margin for sub-items */}
                <Link
                    to={item.path}
                    className={`${baseClasses} ${isActive ? activeClasses : defaultClasses}`}
                    // No onClick handler here, Link handles navigation automatically
                >
                    {item.icon && <item.icon size={20} className="mr-3" />}
                    {item.name}
                </Link>
            </li>
        );
    };

    return (
        <aside className="min-w-50 xl:w-64 h-screen bg-light hidden shadow-lg p-4 lg:flex lg:flex-col xl:flex xl:flex-col">

            {/* Logo and Name Space */}
            <div className="mb-8 mt-4 flex self-center items-center">
                {/* Placeholder for your actual logo image */}
                <img
                    src="https://placehold.co/40x40/E0E7FF/3B82F6?text=H" // Placeholder image URL
                    alt="Company Logo"
                    className="h-10 w-10 mr-3 rounded-md"
                />
                {/* Placeholder for your company/app name */}
                <span className="text-xl font-bold text-gray-800">H Sports</span>
            </div>

            {/* Navigation Links */}
            <nav className="flex-grow">
                <ul className="text-sm font-poppins">
                    {NavigationRoutes.map((item, index) => {
                        // Determine if any sub-item is active, or if the parent path matches
                        const isParentActive = item.subItems && (
                            item.subItems.some(subItem => location.pathname === subItem.path || location.pathname.startsWith(subItem.path)) ||
                            location.pathname.startsWith(item.path)
                        );
                        // If the item has subItems, it's a category header
                        if (item.subItems) {
                            return (
                                <li key={index} className="mb-2">
                                    <button
                                        onClick={toggleCategories}
                                        className={`font-poppins flex items-center justify-between w-full p-3 rounded-md
                                                   text-gray-800 font-medium text-lg
                                                   hover:bg-gray-100 transition-colors duration-200 ease-in-out
                                                   ${isParentActive && !isCategoriesExpanded ? 'bg-gray-100' : ''} `}
                                        aria-expanded={isCategoriesExpanded}
                                    >
                                        {item.name}
                                        {/* Rotate icon based on expanded state */}
                                        <ChevronDown size={20} className={`w-5 h-5 transition-transform duration-200 ${isCategoriesExpanded ? 'rotate-180' : ''}`} />
                                    </button>
                                    {/* Render sub-items if expanded */}
                                    {isCategoriesExpanded && (
                                        <ul className="ml-4 mt-2">
                                            {item.subItems.map(subItem => renderNavItem(subItem, true))}
                                        </ul>
                                    )}
                                </li>
                            );
                        } else {
                            // Regular navigation item
                            return renderNavItem(item);
                        }
                    })}
                </ul>
            </nav>
        </aside>
    );
}
