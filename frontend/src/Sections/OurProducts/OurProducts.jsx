import React from "react";
import {OurProductsData} from "@/Sections/OurProducts/OurProductsData.jsx";
import Product from "@/Elements/Product/Product.jsx";
import SectionHeading from "@/Elements/Headings/SectionHeading.jsx";
import {ProductsWrapper} from "@/Elements/Wrapper/ProductsWrapper.jsx";
import RedColorButton from "@/Elements/Buttons/RedColorButton.jsx";

export default function OurProducts() {
    return (
        <section title={'categories'} className={'mt-17.5'}>

            <div className={'w-full flex'}>
                <SectionHeading
                    IconHeading={'Our Products'}
                    SectionHeading={'Explore Our Products'}
                />

            </div>

            <ProductsWrapper>
                {OurProductsData.map((product) => (
                    <Product key={product.id} product={product} showDiscountTag={false}/>
                ))}
            </ProductsWrapper>

            <div className="mt-16 text-center">
                <RedColorButton
                    text={'View All Products'}
                />
            </div>

        </section>
    )
}