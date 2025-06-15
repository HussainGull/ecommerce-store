import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import RoutePathDisplay from "@/Elements/RoutePathDisplay/RouthPathDisplay.jsx";

export default function AccountLayout() {
    const linkClass = ({ isActive }) =>
        isActive
            ? "text-error font-normal"
            : "hover:text-red-500 transition-colors";

    return (
        <div className="bg-white font-poppins mt-20">
            {/* Top Header/Breadcrumbs */}
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-0">
                <RoutePathDisplay/>
                <div className="text-sm text-gray-800">
                    Welcome! <span className="font-medium text-error">Md Rimel</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col lg:flex-row max-w-7xl mx-auto py-10 px-4 sm:px-6 md:px-10 lg:px-0 gap-10 mt-20">
                {/* Left Sidebar Navigation */}
                <div className="w-full lg:w-1/4 flex flex-col gap-6">
                    <div>
                        <h3 className="text-lg font-poppins text-dark mb-4">Manage My Account</h3>
                        <ul className="space-y-3 font-poppins text-light-muted text-base">
                            <li>
                                <NavLink to="profile" className={linkClass}>My Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to="address-book" className={linkClass}>Address Book</NavLink>
                            </li>
                            <li>
                                <NavLink to="payment-options" className={linkClass}>My Payment Options</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-poppins text-dark mb-4">My Orders</h3>
                        <ul className="space-y-3 font-poppins text-light-muted text-base">
                            <li>
                                <NavLink to="returns" className={linkClass}>My Returns</NavLink>
                            </li>
                            <li>
                                <NavLink to="cancellations" className={linkClass}>My Cancellations</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg text-dark mb-4">My Wishlist</h3>
                        <ul className="space-y-3 font-poppins text-light-muted text-base">
                            <li>
                                <NavLink to="/wishlist" className={linkClass}>My WishList</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Side: Routed Content */}
                <div className="w-full lg:w-3/4 bg-white shadow-md rounded-md p-6 sm:p-8 md:p-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
