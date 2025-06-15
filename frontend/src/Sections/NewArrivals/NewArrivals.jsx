import React from "react";
import {OurProductsData} from "@/Sections/OurProducts/OurProductsData.jsx";
import Product from "@/Elements/Product/Product.jsx";
import ArrivalsCarousel from "@/Elements/PromoCarousel/ArrivalsCarousel.jsx";
import SectionHeading from "@/Elements/Headings/SectionHeading.jsx";

export default function NewArrivals() {
    return (
        <section title={'categories'} className={'mt-17.5'}>
            <SectionHeading
                IconHeading={'New Arrivals'}
                SectionHeading={'Explore New Arrivals'}
            />
            <ArrivalsCarousel/>
        </section>
    )
}