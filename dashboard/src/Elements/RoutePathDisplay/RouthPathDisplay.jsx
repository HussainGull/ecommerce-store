import React from 'react';
import { useLocation } from 'react-router-dom';

export default function RoutePathDisplay() {
    const location = useLocation();

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const parameterizedRouteMap = {
        '/product-details': 'Product Details',
        '/edit-product': 'Edit Product',
        '/edit-category': 'Edit Category',
        '/edit-brand': 'Edit Brand',
        '/category': 'Category',
        '/brand': 'Brand',
    };

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const isDashboardOnly = pathSegments.length === 1 && pathSegments[0].toLowerCase() === 'dashboard';

    return (
        <div className="text-gray-700 text-base mt-0 flex items-center space-x-1">
            <span className="font-semibold">Dashboard</span>

            {!isDashboardOnly &&
                pathSegments.map((segment, index) => {
                    const currentPath = `/${pathSegments.slice(0, index + 1).join('/')}`;
                    const parentPath = `/${pathSegments.slice(0, index).join('/')}`;

                    const isIdSegment =
                        (parameterizedRouteMap[parentPath] &&
                            segment.length >= 20 &&
                            /^[0-9a-fA-F]+$/.test(segment));

                    if (isIdSegment) {
                        return (
                            <span key={index} className="text-gray-700 text-base">
                                / <span className="font-light italic text-sm">(ID)</span>
                            </span>
                        );
                    }

                    const displaySegment = parameterizedRouteMap[currentPath]
                        ? capitalize(pathSegments[index])
                        : capitalize(segment.replace(/-/g, ' '));

                    return (
                        <span key={index} className="text-gray-700 text-base">
                            / {displaySegment}
                        </span>
                    );
                })}
        </div>
    );
}
