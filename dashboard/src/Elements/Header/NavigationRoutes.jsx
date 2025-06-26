import {
    LayoutDashboard,    // Dashboard
    Boxes,              // All Products
    ListChecks,         // Order List
    ChevronDown,        // Categories dropdown
    Footprints,         // Studs
    GripHorizontal,     // Grippers
    Smile,              // Laceless
    Zap,                // Speed Boots
    Target,             // Control Boots
    Rocket,             // Power Boots
    Layers, CirclePlus,             // Leather Boots
} from 'lucide-react';
import React from "react";

export const NavigationRoutes = [
    {name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard},
    {name: 'All Products', path: '/products', icon: Boxes},
    {name: 'Add Category', path: '/create-category', icon: CirclePlus},
    {name: 'Add Brand', path: '/create-brand', icon: CirclePlus},
    {name: 'Order List', path: '/order-list', icon: ListChecks},
    {
        name: 'Categories',
        path: '/categories',
        icon: ChevronDown,
    },
    {
        name: 'Brands',
        path: '/brands',
        icon: ChevronDown,
    }
];
