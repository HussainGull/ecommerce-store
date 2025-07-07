import React, {useEffect} from "react";
import Product from "@/Elements/Product/Product.jsx";
import SectionHeading from "@/Elements/Headings/SectionHeading.jsx";
import {ProductsWrapper} from "@/Elements/Wrapper/ProductsWrapper.jsx";
import RedColorButton from "@/Elements/Buttons/RedColorButton.jsx";
import {fetchShuffledProducts} from "@/Redux-ToolKit/Features/Products/productsThunks.js";
import {useDispatch, useSelector} from "react-redux";

export default function OurProducts() {
    const shuffledProducts = useSelector((state) => state.product.shuffledProducts);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchShuffledProducts())
    }, []);


    return (
        <section title={'categories'} className={'mt-17.5'}>

            <div className={'w-full flex'}>
                <SectionHeading
                    IconHeading={'Our Products'}
                    SectionHeading={'Explore Our Products'}
                />
            </div>

            <ProductsWrapper>
                {shuffledProducts.slice(0, 8).map((product) => (
                    <Product key={product._id} product={product} showDiscountTag={false}/>
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