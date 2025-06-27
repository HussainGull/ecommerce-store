import React from 'react';
import { useLocation } from 'react-router-dom';

export default function RoutePathDisplay() {
    const location = useLocation(); // e.g., "/dashboard/settings" or "/product-details/685e8279634b791bfa8aac14"

    // Function to capitalize the first letter of a string
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    // Define a mapping for known parameterized routes to display a friendly name
    // This assumes your IDs are always the last segment and follow a pattern
    const parameterizedRouteMap = {
        '/product-details': 'Product Details',
        '/edit-product': 'Edit Product',
        '/edit-category': 'Edit Category',
        '/edit-brand': 'Edit Brand',
        // Add more as needed:
        // '/edit-category': 'Edit Category', // If you start passing ID for edit category
        // '/edit-brand': 'Edit Brand',       // If you start passing ID for edit brand
    };

    // Split the pathname into segments and filter out empty strings (e.g., from leading/trailing slashes)
    const pathSegments = location.pathname.split('/').filter(Boolean);

    // Determine if the current path is just the dashboard
    const isDashboardOnly = pathSegments.length === 1 && pathSegments[0].toLowerCase() === 'dashboard';

    return (
        <div className="text-gray-700 text-base mt-0 flex items-center space-x-1">
            {/* Always start with Dashboard */}
            <span className="font-semibold">Dashboard</span>

            {!isDashboardOnly &&
                pathSegments.map((segment, index) => {
                    const currentPath = `/${pathSegments.slice(0, index + 1).join('/')}`;
                    const parentPath = `/${pathSegments.slice(0, index).join('/')}`;

                    // Check if the current segment is likely an ID based on the parent path
                    // This is a common heuristic: if the parent path maps to a known parameterized route,
                    // and the current segment looks like a long ID (e.g., MongoDB ObjectId length),
                    // then replace it. You might need to refine this regex based on your ID format.
                    const isIdSegment =
                        (parameterizedRouteMap[parentPath] && segment.length >= 20 && /^[0-9a-fA-F]+$/.test(segment));

                    // If it's an ID segment, replace it with meaningful text (e.g., "ID")
                    // Or, you could just skip rendering it: `return null;`
                    if (isIdSegment) {
                        return (
                            <span key={index} className="text-gray-700 text-base">
                                / <span className="font-light italic text-sm">(ID)</span> {/* Or some other placeholder */}
                            </span>
                        );
                    }

                    // For non-ID segments or the base parameterized path
                    // Check if the entire path up to this segment is a known parameterized route
                    // This handles cases like /edit-brand (where 'edit-brand' itself is a segment)
                    const displaySegment = parameterizedRouteMap[currentPath]
                        ? capitalize(pathSegments[index]) // Keep original segment if it's the named part of a known route
                        : capitalize(segment.replace(/-/g, ' ')); // Capitalize and replace hyphens for display

                    return (
                        <span key={index} className="text-gray-700 text-base">
                            / {displaySegment}
                        </span>
                    );
                })
            }
        </div>
    );
}
