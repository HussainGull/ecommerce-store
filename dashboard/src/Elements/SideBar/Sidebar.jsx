import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {ChevronDown,} from 'lucide-react';
import {fetchCategories} from '@/Redux-Toolkit/Features/Category/categoriesThunks.js';
import {fetchBrands} from '@/Redux-Toolkit/Features/Brand/brandsThunks.js';
import {NavigationRoutes} from "@/Elements/Header/NavigationRoutes.jsx";
import CatBraDropdown from "@/Elements/Dropdown/CatBraDropdown.jsx";

export default function Sidebar() {
    const location = useLocation();
    const dispatch = useDispatch();

    const categories = useSelector((state) => state.categories.categories);
    const brands = useSelector((state) => state.brands.brands);

    const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
    const [isBrandsExpanded, setIsBrandsExpanded] = useState(false);

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchBrands());
    }, [dispatch]);

    const toggleCategories = () => setIsCategoriesExpanded((prev) => !prev);
    const toggleBrands = () => setIsBrandsExpanded((prev) => !prev);

    const renderNavItem = (item, isSubItem = false) => {
        const isActive = location.pathname === item.path || (isSubItem && location.pathname.startsWith(item.path));
        const baseClasses = `flex items-center p-3 rounded-md transition-colors duration-200 ease-in-out`;
        const activeClasses = 'bg-blue text-light font-medium hover:bg-blue-700';
        const defaultClasses = 'text-dark-gray hover:bg-light-gray font-medium';

        return (
            <li key={item.name} className={isSubItem ? 'mt-1' : 'mb-2'}>
                <Link
                    to={item.path}
                    className={`${baseClasses} ${isActive ? activeClasses : defaultClasses}`}
                >
                    {item.icon && <item.icon size={20} className="mr-3"/>}
                    {item.name}
                </Link>
            </li>
        );
    };

    return (
        <aside
            className="min-w-50 xl:w-64 h-screen bg-light hidden shadow-lg p-4 lg:flex lg:flex-col xl:flex xl:flex-col">
            {/* Logo */}
            <div className="mb-8 mt-4 flex self-center items-center">
                <img src="/src/assets/H Sports.png" alt="Logo"
                     className="h-10 w-10 mr-3 rounded-md"/>
                <span className="text-xl font-bold text-gray-800">H Sports</span>
            </div>

            {/* Navigation */}
            <nav className="flex-grow">
                <ul className="text-sm font-poppins">

                    {NavigationRoutes.map((item, index) => {
                        const isParentActive = item.subItems &&
                            (item.subItems.some(subItem => location.pathname.startsWith(subItem.path)) ||
                                location.pathname.startsWith(item.path));

                        // Categories Section
                        if (item.name === 'Categories') {
                            return (
                                <li key={index} className="mb-2">
                                    <button
                                        onClick={toggleCategories}
                                        className={`font-poppins flex items-center justify-between w-full p-3 rounded-md
                                        text-gray-800 font-medium text-lg hover:bg-gray-100 transition-colors duration-200
                                        ${isParentActive && !isCategoriesExpanded ? 'bg-gray-100' : ''}`}
                                    >
                                        Categories
                                        <ChevronDown size={20}
                                                     className={`${isCategoriesExpanded ? 'rotate-180' : ''} transition-transform`}/>
                                    </button>

                                    {isCategoriesExpanded && (
                                        <ul className="ml-4 mt-2 h-30 overflow-y-auto">
                                            {categories.map((cat) => (
                                                <li key={cat._id} className="mt-1 flex items-center justify-between">
                                                    {/* ✅ Clicking name → Navigates */}
                                                    <Link
                                                        to={`/category/${cat._id}`}
                                                        className="flex items-center p-2 rounded-md hover:bg-gray-100 text-dark-gray flex-grow"
                                                    >
                                                        {cat.name}
                                                    </Link>

                                                    {/* ✅ Clicking dropdown → Opens delete/edit */}
                                                    <CatBraDropdown mode={'category'} productId={cat._id}/>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        }

                        // Brands Section
                        if (item.name === 'Brands') {
                            return (
                                <li key={index} className="mb-2">
                                    <button
                                        onClick={toggleBrands}
                                        className={`font-poppins flex items-center justify-between w-full p-3 rounded-md
                                        text-gray-800 font-medium text-lg hover:bg-gray-100 transition-colors duration-200
                                        ${isParentActive && !isBrandsExpanded ? 'bg-gray-100' : ''}`}
                                    >
                                        Brands
                                        <ChevronDown size={20}
                                                     className={`${isBrandsExpanded ? 'rotate-180' : ''} transition-transform`}/>
                                    </button>

                                    {isBrandsExpanded && (
                                        <ul className="ml-4 mt-2 h-30 overflow-y-auto">
                                            {brands.map((brand) => (
                                                <li key={brand._id} className="mt-1 flex items-center justify-between">
                                                    <Link
                                                        to={`/brand/${brand._id}`}
                                                        className="flex items-center p-2 rounded-md hover:bg-gray-100 text-dark-gray flex-grow"
                                                    >
                                                        {brand.name}
                                                    </Link>
                                                    <CatBraDropdown mode={'brand'} productId={brand._id}/>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        }

                        return renderNavItem(item);
                    })}

                </ul>
            </nav>
        </aside>
    );
}
