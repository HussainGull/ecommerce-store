'use client';

import * as React from "react"

import {useState} from 'react';
import {Link} from 'react-router-dom';
import {NavLink} from "react-router-dom";
import {callsToAction, headerItems, CategoryDropdownData, headerIcons} from './HeaderData.jsx';


import {
    Select,
    SelectContent, SelectGroup,
    SelectItem, SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Button,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react';

import {
    Bars3Icon,
} from '@heroicons/react/24/outline';

import {
    ChevronDownIcon,
} from '@heroicons/react/20/solid';
import {Input} from "@/components/ui/input"
import {Search, ShoppingCart, Heart, CircleUserRound} from "lucide-react"; // Import your desired icon
import MobileMenu from "@/Elements/Header/MobileMenu.jsx";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


    return (
        <header>
            <div className={"bg-base w-full h-12 flex items-center justify-between  lg:justify-around p-3"}>
                <div className={'max-w-50 flex text-primary text-[10px] lg:text-[14px] lg:max-w-full'}>
                    <p>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
                        <Button className={"ml-2"}>
                            ShopNow
                            <div className={"bg-white w-full h-[1px] rounded-md relative bottom-[2px]"}/>
                        </Button>
                    </p>

                </div>

                <Select>
                    <SelectTrigger
                        className="text-primary text-[10px] outline-none border-none shadow-none p-0 gap-2 lg:text-[14px]">
                        <SelectValue placeholder="English"/>
                    </SelectTrigger>

                    <SelectContent
                        side="bottom"
                        align="center"
                        sideOffset={6}
                        className="w-[48px] bg-black text-primary border-none rounded-sm py-0.5 shadow-md animate-in fade-in zoom-in-95 duration-200"
                    >
                        <SelectItem
                            value="urdu"
                            className="text-[10px] px-1 py-[2px] hover:bg-light hover:text-dark cursor-pointer transition-all lg:text-[14px]"
                        >
                            Urdu
                        </SelectItem>
                        <SelectItem
                            value="english"
                            className="text-[10px] px-1 py-[2px] hover:bg-light hover:text-dark cursor-pointer transition-all lg:text-[14px]"
                        >
                            English
                        </SelectItem>
                        <SelectItem
                            value="spanish"
                            className="text-[10px] px-1 py-[2px] hover:bg-light hover:text-dark cursor-pointer transition-all lg:text-[14px]"
                        >
                            Spanish
                        </SelectItem>
                    </SelectContent>
                </Select>


            </div>
            <nav className="h-23.5 mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8" aria-label="Global">
                <div className="flex w-fit items-center"> {/* Use w-fit */}
                    <Link to="/home" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            className="h-20 w-auto" // The img will dictate the width here
                            src="/src/assets/hsports.png"
                            alt="H Sports"
                        />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="size-6" aria-hidden="true"/>
                    </button>
                </div>
                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <Popover className="relative">
                        <div className={"flex"}>
                            <NavLink
                                to="/home"
                                className={({isActive}) =>
                                    isActive
                                        ? "text-error underline underline-offset-4 decoration-2 font-semibold"
                                        : "text-gray-700 hover:text-red-400 transition"
                                }
                            >
                                Home
                            </NavLink>

                            <PopoverButton
                                className="flex items-center gap-x-1 text-base font-normal text-dark xl:hidden">
                                <ChevronDownIcon className="size-5 text-gray-400" aria-hidden="true"/>
                            </PopoverButton>
                        </div>

                        <PopoverPanel
                            className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                            <div className="p-4">
                                {CategoryDropdownData.map((item) => (
                                    <div
                                        key={item.name}
                                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
                                    >
                                        <div
                                            className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                            <item.icon className="size-6 text-gray-600 group-hover:text-indigo-600"
                                                       aria-hidden="true"/>
                                        </div>
                                        <div className="flex-auto">
                                            <a href={item.href} className="block font-semibold text-gray-900">
                                                {item.name}
                                                <span className="absolute inset-0"/>
                                            </a>
                                            <p className="mt-1 text-gray-600">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                {callsToAction.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                                    >
                                        <item.icon className="size-5 text-gray-400" aria-hidden="true"/>
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </PopoverPanel>
                    </Popover>

                    {headerItems.map((item, idx) => (
                        <NavLink
                            key={idx}
                            to={item.path}
                            className={({isActive}) =>
                                isActive
                                    ? "text-error underline underline-offset-4 decoration-2 font-semibold"
                                    : "text-gray-700 hover:text-red-400 transition"
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}


                </PopoverGroup>

                <div className="hidden lg:flex items-center justify-center gap-5 lg:w-fit lg:justify-end">

                    <div className="relative flex items-center">
                        <Input
                            type="text"
                            placeholder="What are you looking for?"
                            className="bg-light placeholder:text-xs outline-none border-none w-60 pl-5 pr-5 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        <Search className="h-4 w-4 text-dark absolute right-3 ml-4 "/>
                    </div>

                    {
                        <ul className="flex items-center space-x-6">
                            {headerIcons.map((item, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={item.to}
                                    >
                                        {React.createElement(item.icon, { className: "w-5 h-5 text-black hover:text-red-500" })}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    }

                </div>
            </nav>

            <MobileMenu
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                products={CategoryDropdownData}
                callsToAction={callsToAction}
                headerItems={headerItems}
            />

            <div className={"h-[0.5px] bg-muted"}/>
        </header>
    );
}
