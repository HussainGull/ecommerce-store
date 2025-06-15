import {
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    ArrowPathIcon
} from "@heroicons/react/24/outline";
import {PhoneIcon, PlayCircleIcon} from "@heroicons/react/20/solid/index.js";
import {CircleUserRound, Heart, ShoppingCart, User} from "lucide-react";

export const CategoryDropdownData = [
    {
        name: "Men's Fashion",
        description: "Get a better understanding of your traffic",
        to: "/mens-fashion",
        icon: ChartPieIcon,
    },
    {
        name: "Women's Fashion",
        description: "Speak directly to your customers",
        to: "/womens-fashion",
        icon: CursorArrowRaysIcon,
    },
    {
        name: "Electronics",
        description: "Your customers’ data will be safe and secure",
        to: "/electronics",
        icon: FingerPrintIcon,
    },
    {
        name: "Home & Lifestyle",
        description: "Connect with third-party tools",
        to: "/home-lifestyle",
        icon: SquaresPlusIcon,
    },
    {
        name: "Medicine",
        description: "Build strategic funnels that will convert",
        to: "/medicine",
        icon: ArrowPathIcon,
    },
    {
        name: "Sports & Outdoor",
        description: "Build strategic funnels that will convert",
        to: "/sports-outdoor",
        icon: ArrowPathIcon,
    },
    {
        name: "Babys & Toys",
        description: "Toys and accessories for babies and kids",
        to: "/babys-toys",
        icon: ArrowPathIcon,
    },
    {
        name: "Groceries & Pets",
        description: "Daily groceries and pet essentials",
        to: "/groceries-pets",
        icon: ArrowPathIcon,
    },
    {
        name: "Health & Beauty",
        description: "Products for your health and personal care",
        to: "/health-beauty",
        icon: ArrowPathIcon,
    },
];

export const callsToAction = [
    {name: 'Watch demo', href: '#', icon: PlayCircleIcon},
    {name: 'Contact sales', href: '#', icon: PhoneIcon},
];

export const headerItems = [
    {name: 'Contact', path: '/contact'},
    {name: 'About', path: '/about'},
    {name: 'Sign Up', path: '/sign-up'},
];


export const headerIcons = [
    {icon:Heart, to:'/wishlist'},
    {icon:ShoppingCart, to:'/cart'},
    {icon:User, to:'/account'},

]