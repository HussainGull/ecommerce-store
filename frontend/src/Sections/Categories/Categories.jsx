import React, {useRef} from "react";
import CategoryItem from "@/Elements/CategoryItem/CategoryItem.jsx";
import {CategoriesData} from "@/Sections/Categories/CategoriesData.jsx";
import SectionHeading from "@/Elements/Headings/SectionHeading.jsx";
import Border from "@/Elements/Border/Border.jsx";
import Scroller from "@/Elements/Scroller/Scroller.jsx";
import HorizontalScrollerWrapper from "@/Elements/Wrapper/HorizontalScrollerWrapper.jsx";

export default function Categories() {
    const carouselRef = useRef(null); // Create a ref for the scrollable container



    return (
        <section title={'categories'} className={"mt-17.5 xl:mt-25"}>

            <div className={"mt-5 max-[450px]:flex-wrap flex gap-5 justify-between items-end"}>
                <SectionHeading
                    IconHeading={'Categories'}
                    SectionHeading={'Browse by Category'}
                />
                <Scroller
                carouselRef={carouselRef}
                />
            </div>

            <HorizontalScrollerWrapper ref={carouselRef} marginTop="mt-15">
                {CategoriesData.map((category) => (
                    <CategoryItem key={category.id} categoryItem={category} />
                ))}
            </HorizontalScrollerWrapper>

            <Border/>
        </section>
    )
}