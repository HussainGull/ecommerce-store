import HomeLayout from "@/Elements/Layouts/HomeLayout.jsx";
import Countdown from "@/Elements/CountdownTimer/Countdown.jsx";
import React, {useRef} from 'react'; // Import useRef
import Product from "@/Elements/Product/Product.jsx";
import {Button} from "@headlessui/react";
import {ArrowLeft, ArrowRight} from 'lucide-react';
import {ProductsData} from "@/Elements/Product/ProductsData.jsx";
import RedColorButton from "@/Elements/Buttons/RedColorButton.jsx";
import SectionHeading from "@/Elements/Headings/SectionHeading.jsx";
import Border from "@/Elements/Border/Border.jsx";
import Scroller from "@/Elements/Scroller/Scroller.jsx";
import HorizontalScrollerWrapper from "@/Elements/Wrapper/HorizontalScrollerWrapper.jsx";


export default function FlashSales() {
    const carouselRef = useRef(null); // Create a ref for the scrollable container

    return (
        <>
            <div className="w-full max-w-7xl mx-auto mt-6">

                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-10 ">
                    {/* Left Section: Heading + Timer */}
                    <div className=" w-full flex flex-col items-start justify-center gap-4">
                        <SectionHeading
                            SectionHeading="Flash Sales"
                            IconHeading="Today's"
                        />
                        <div className="flex-shrink-0">
                            <Countdown initialDays={2} initialHours={3} initialMinutes={10} initialSeconds={30}/>
                        </div>
                    </div>

                    {/* Right Section: Arrows */}
                    <Scroller carouselRef={carouselRef}/>
                </div>

            </div>

            {/* Product Carousel Section */}
            <HorizontalScrollerWrapper ref={carouselRef} gap="gap-6 sm:gap-8">
                {ProductsData.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </HorizontalScrollerWrapper>


            {/* Button */}
            <div className="mt-16 text-center">
                <RedColorButton
                    text="View All Products"
                />
            </div>

            <Border/>
        </>
    )
}