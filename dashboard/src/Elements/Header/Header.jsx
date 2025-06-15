'use client';

import * as React from "react"

import {useState} from 'react';
import {Link} from 'react-router-dom';
import {NavLink} from "react-router-dom";

import {Search, Menu,Bell} from "lucide-react"; // Import your desired icon
import MobileMenu from "@/Elements/Header/MobileMenu.jsx";
import {NavigationRoutes} from "@/Elements/Header/NavigationRoutes.jsx";
import Boundary from "@/Elements/Boundary/Boundary.jsx";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


    return (
        <header>
            <nav className="h-23.5 mx-auto flex max-w-7xl items-center justify-end p-3 lg:px-8" aria-label="Global">

                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Menu className="size-10" aria-hidden="true"/>
                    </button>
                </div>

                <div className="flex items-center gap-10">
                    {/* Bell/Notification Icon - Remains visible */}
                    <button className="text-dark-gray hover:text-dark-gray focus:outline-none">
                        <Bell size={30}/>
                    </button>

                    {/* Search Icon - Hidden on all screens */}
                    <button className="text-dark-gray hover:text-dark-gray focus:outline-none hidden">
                        <Search size={24}/>
                    </button>


                    {/* Admin Profile/Button - Hidden on all screens */}
                    <div className="flex items-center justify-center
                            border border-[var(--text-dark)] rounded-md
                            px-4 py-2 cursor-pointer
                            hover:bg-gray-100 transition-colors hidden"> {/* Added hidden class */}
                        <span className="font-poppins text-base font-medium text-dark-gray">Admin</span>
                    </div>
                </div>

            </nav>

            <MobileMenu
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                NavigationRoutes={NavigationRoutes}
                headerItems={NavigationRoutes}
            />
        </header>
    );
}
