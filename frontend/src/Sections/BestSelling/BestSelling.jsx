import React from "react";
import RedColorButton from "@/Elements/Buttons/RedColorButton.jsx";
import Product from "@/Elements/Product/Product.jsx";
import {BestSellingData} from "@/Sections/BestSelling/BestSellingData.jsx";
import SectionHeading from "@/Elements/Headings/SectionHeading.jsx";
import {ProductsWrapper} from "@/Elements/Wrapper/ProductsWrapper.jsx";

export default function BestSelling() {
    return (
        <section title={'categories'} className={'mt-20 xl:mt-25'}>

            <div className={"w-full flex max-[430px]:flex-col max-[430px]:items-start items-center space-y-5"}>
                <SectionHeading
                    IconHeading={'New This Month'}
                    SectionHeading={'Best Selling Products'}
                />

                <RedColorButton
                    text={'View All'}
                />
            </div>

            <ProductsWrapper>
                {BestSellingData.map((sellingProduct) => (
                    <Product key={sellingProduct.id} product={sellingProduct} showAddToCartButton={false}
                             showDiscountTag={false}/>
                ))}
            </ProductsWrapper>
        </section>
    )
}