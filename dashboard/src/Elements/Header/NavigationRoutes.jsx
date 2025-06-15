import {
    LayoutDashboard, // For Dashboard
    Boxes,         // For All Products
    ListChecks,    // For Order List
    ChevronDown,   // For Categories dropdown
    Footprints,    // For Running shoes
    Volleyball,    // For Basketball shoes
    Smile,         // For Lifestyle (general positive/everyday feel)
    Dumbbell,      // For Training shoes
    Flag,          // For Golf (like a golf hole flag)
    Orbit,    // For Skateboarding shoes
    LoaderPinwheel,    // For Football (soccer) shoes
    RailSymbol,        // For Tennis shoes
} from 'lucide-react';


export const NavigationRoutes = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'All Products', path: '/products', icon: Boxes },
    { name: 'Order List', path: '/order-list', icon: ListChecks },
    {
        name: 'Categories',
        path: '/categories', // A base path for the category section
        icon: ChevronDown, // Icon for the dropdown
        subItems: [
            { name: 'Nike Running', path: '/categories/nike/running', icon: Footprints },
            { name: 'Nike Basketball', path: '/categories/nike/basketball', icon: Volleyball },
            { name: 'Nike Lifestyle', path: '/categories/nike/lifestyle', icon: Smile }, // Using Smile for a general lifestyle feel
            { name: 'Nike Training', path: '/categories/nike/training', icon: Dumbbell },
            { name: 'Nike Golf', path: '/categories/nike/golf', icon: Flag },
            { name: 'Nike Skateboarding', path: '/categories/nike/skateboarding', icon: Orbit },
            { name: 'Nike Football', path: '/categories/nike/football', icon: LoaderPinwheel },
            { name: 'Nike Tennis', path: '/categories/nike/tennis', icon: RailSymbol },
        ],
    },
];
