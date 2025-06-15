import React from 'react';
import {Send, Facebook, Twitter, Instagram, Linkedin} from 'lucide-react';
import {Link} from 'react-router-dom';
import {FooterItemsWrapper} from "@/Elements/Wrapper/FooterItemsWrapper.jsx";

export default function Footer() {
    const footerData = {
        QuickLinks: [
            {title: 'Privacy Policy', path: 'privacy-policy'},
            {title: 'Terms Of Use', path: 'terms-of-use'},
            {title: 'FAQ', path: 'faq'},
            {title: 'Contact', path: 'contact'}
        ],
        Account: [
            {title: 'My Account', path: 'my-account'},
            {title: 'Login', path: 'login'},
            {title: 'Register', path: 'register'},
            {title: 'Cart', path: 'cart'},
            {title: 'Wishlist', path: 'wishlist'},
            {title: 'Shop', path: 'shop'}
        ],
        Support: [
            {title: 'Gulberg City Villa 540B, Pakistan', path: 'address'},
            {title: 'hussaingull@', path: 'email'},
            {title: '+923157115542', path: 'phone-number'}
        ],
        DownloadApp: [
            {
                title: 'GET IT ON',
                name: 'Google Play',
                imgSrc: '/src/assets/playstore.png',
                path: 'google-play'
            },
            {
                title: 'Download on the',
                name: 'App Store',
                imgSrc: '/src/assets/apple.png',
                path: 'app-store'
            }
        ]
    };

    const renderLinks = (links) => (
        <ul className="space-y-2">
            {links.map((link, index) => (
                <li key={index} className={'flex'}>
                    <Link
                        to={link.path}
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                        {link.title}
                    </Link>
                </li>
            ))}
        </ul>
    );

    const renderAppDownload = (apps) => (
        <div className="space-y-3">
            {apps.map((app, index) => (
                <Link
                    key={index}
                    to={app.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex bg-gray-800 hover:bg-gray-700 rounded-lg p-2 transition-colors duration-200"
                >
                    <img
                        src={app.imgSrc}
                        alt={app.name}
                        className="w-8 h-8 mr-3 object-contain"
                    />
                    <div>
                        <p className="text-xs text-gray-300">{app.title}</p>
                        <p className="text-sm font-medium">{app.name}</p>
                    </div>
                </Link>
            ))}
        </div>
    );

    return (
        <footer className="bg-black text-white font-poppins py-16 px-4 md:px-8 lg:px-16 mt-35">

            <div
                className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-6 lg:gap-12 pb-12 border-b border-gray-700">

                {/* Column 1: Exclusive / Subscribe */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-bold mb-2">Exclusive</h3>
                    <span className="text-xl font-semibold">Subscribe</span>
                    <p className="text-sm text-gray-300">Get 10% off your first order</p>
                    <div className="relative w-full max-w-[250px]">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full py-2 px-4 pr-10 bg-black border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white"
                        />
                        <button
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            aria-label="Subscribe"
                        >
                            <Send size={20}/>
                        </button>
                    </div>
                </div>

                <FooterItemsWrapper
                    heading={"Support"}
                >
                    {renderLinks(footerData.Support)}
                </FooterItemsWrapper>

                <FooterItemsWrapper
                    heading={"Account"}
                >
                    {renderLinks(footerData.Account)}
                </FooterItemsWrapper>

                <FooterItemsWrapper
                    heading={"Quick Links"}
                >
                    {renderLinks(footerData.QuickLinks)}
                </FooterItemsWrapper>

                {/* Column 5: Download App */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Download App</h3>
                        {renderAppDownload(footerData.DownloadApp)}
                </div>

            </div>

            {/* Copyright Section */}
            <div className="text-center text-gray-500 text-sm mt-8">
                © {new Date().getFullYear()} Hussain. All rights reserved.
            </div>
        </footer>
    );
}
