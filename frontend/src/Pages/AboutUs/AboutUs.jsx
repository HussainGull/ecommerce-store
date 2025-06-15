import React from 'react';
import {Facebook, Twitter, Instagram, Linkedin} from 'lucide-react';
import FeaturesSection from "@/Sections/FeaturesSection/FeaturesSection.jsx";
import RoutePathDisplay from "@/Elements/RoutePathDisplay/RouthPathDisplay.jsx";
import MembersCarousel from "@/Sections/Members/MembersCarousel.jsx";
import {Description} from "@/Elements/Description/Description.jsx";

export default function AboutUs() {

    const statCard = [
        {
            id: 1,
            value: "10.5k",
            description: "Sellers active on our site",
            img: '/src/assets/shop.svg'
        },
        {
            id: 2,
            value: "45.5k",
            description: "Customers active in our site",
            backgroundColor: "bg-red-500",
            img: '/src/assets/sale.svg'

        },
        {
            id: 3,
            value: "45.5k",
            description: "Customers active in our site",
            img: '/src/assets/shopbag.svg'

        },
        {
            id: 4,
            value: "25k",
            description: "Annual gross sale in our site",
            img: '/src/assets/moneybag.svg'

        }

    ]

    return (
        <>
            <div className="font-poppins">

                {/* Top Breadcrumbs */}
                <div className="mt-20">
                    <RoutePathDisplay/>
                </div>

                {/* Our Story Section */}
                <div
                    className="max-w-7xl mx-auto  py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    {/* Left: Text Content */}
                    <div className="flex flex-col">
                        <h1 className="text-4xl md:text-5xl font-semibold text-dark mb-6">Our Story</h1>
                        <Description
                            className={'text-md'}
                            text={'Launched in 2015, Exclusive is South Asia\'s premier online shopping\n' +
                                '                            marketplace with an active presence in Bangladesh. Supported\n' +
                                '                            by a wide range of tailored marketing, data and service solutions,\n' +
                                '                            Exclusive has 10,500 sellers and 300 brands and serves 3\n' +
                                '                            million customers across the region.\n' +
                                '                            Exclusive has more than 1 Million products to offer, growing at a\n' +
                                '                            very fast rate. Exclusive offers a diverse assortment in categories\n' +
                                '                            ranging from consumer electronics, fashion, home appliances, and more.'}/>
                    </div>
                    {/* Right: Image */}
                    <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden ">
                        <img
                            src="https://picsum.photos/id/25/800/600" // Placeholder image for shopping women
                            alt="Two women shopping"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Stat Card */}

                <div className="max-w-7xl mx-auto py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {
                            statCard.map((card, index) => (
                                <div
                                    key={index}
                                    className="group w-full min-h-[230px] flex flex-col items-center justify-center p-6 border border-gray-200 rounded-lg shadow-sm text-center hover:bg-red-500 bg-white transform transition-transform duration-500 ease-in-out scale-100 hover:scale-[1.05] will-change-transform"
                                >
                                    {/* Outer circle */}
                                    <div
                                        className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-4 transform transition-transform duration-500 ease-in-out scale-100 hover:scale-[1.1]"
                                    >
                                        {/* Inner circle */}
                                        <div
                                            className="w-14 h-14 border-2 border-gray-500 rounded-full flex items-center justify-center bg-gray-300 transform transition-transform duration-500 ease-in-out scale-100 hover:scale-[1.15]"
                                        >
                                            <img
                                                src={card.img}
                                                alt="Card Icon"
                                                className="w-8 h-8 transition-transform duration-500 ease-in-out transform scale-100 hover:scale-110"
                                            />
                                        </div>
                                    </div>

                                    {/* Value */}
                                    <h3 className="text-3xl font-semibold text-dark leading-none mb-1 transition-transform duration-500 ease-in-out transform scale-100 hover:scale-105">
                                        {card.value}
                                    </h3>

                                    {/* Description */}
                                    <Description text={card.description} className={'text-base'}/>

                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* Team Section */}
                <MembersCarousel/>

            </div>
            <FeaturesSection/>
        </>
    );
}
