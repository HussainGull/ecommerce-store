import Countdown from "@/Elements/CountdownTimer/Countdown.jsx";
import React, {useEffect, useRef} from 'react'; // Import useRef
import Product from "@/Elements/Product/Product.jsx";
import RedColorButton from "@/Elements/Buttons/RedColorButton.jsx";
import SectionHeading from "@/Elements/Headings/SectionHeading.jsx";
import Border from "@/Elements/Border/Border.jsx";
import Scroller from "@/Elements/Scroller/Scroller.jsx";
import HorizontalScrollerWrapper from "@/Elements/Wrapper/HorizontalScrollerWrapper.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchShuffledProducts} from "@/Redux-ToolKit/Features/Products/productsThunks.js";


export default function FlashSales() {
    const carouselRef = useRef(null); // Create a ref for the scrollable container
    const shuffledProducts = useSelector((state) => state.product.shuffledProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchShuffledProducts())
    }, []);


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
                {shuffledProducts.map((product) => (
                    <Product key={product._id} product={product}/>
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