import BlackBorderButton from "@/Elements/Buttons/BlackBorderButton.jsx";
import Product from "@/Elements/Product/Product.jsx";
import React, {useRef} from "react";
import {ProductsData} from "@/Elements/Product/ProductsData.jsx";
import {ProductsWrapper} from "@/Elements/Wrapper/ProductsWrapper.jsx";
import HorizontalScrollerWrapper from "@/Elements/Wrapper/HorizontalScrollerWrapper.jsx";

export default function WishList() {
    const carouselRef = useRef(null); // Create a ref for the scrollable container

    return (
        <section title={'wishlist'} className={"mt-20"}>

            {/*Wishlist Section*/}
                <div
                    className={"w-full justify-between items-center flex max-[350px]:flex-col max-[350px]:space-y-6 max-[350px]:items-start"}>
                        <span
                            className={"font-poppins text-xl font-normal"}>Add To Wishlist ({ProductsData.length})</span>
                    <BlackBorderButton/>
                </div>

                {/* Wishlist Carousel Section - Overriding HomeLayout's padding */}
                <ProductsWrapper>
                    {ProductsData.slice(0,4).map((product) => (
                            <Product product={product}/>
                    ))}
                </ProductsWrapper>


            {/*Just for You Section*/}

            <div className={"w-full mt-20"}>

                <div
                    className={'w-full max-[350px]:flex-col max-[350px]:space-y-6 max-[350px]:items-start flex justify-between '}>
                    <div className={"flex items-center justify-center "}>
                        <img src={"/src/assets/rectangle.svg"} alt={"Rectangle"} className="w-4 h-8"/>
                        <span className="font-poppins text-xl ml-4">Just For You</span>
                    </div>
                    <BlackBorderButton
                        width='150px'
                        height='55px'
                        text='See All'
                    />
                </div>

                {/* Wishlist Carousel Section - Overriding HomeLayout's padding */}
                <HorizontalScrollerWrapper ref={carouselRef} gap="gap-6 sm:gap-8">
                    {ProductsData.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </HorizontalScrollerWrapper>

            </div>

        </section>
    )
}