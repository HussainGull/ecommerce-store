import React, {useEffect, useRef} from "react";
import CategoryItem from "@/Elements/CategoryItem/CategoryItem.jsx";
import SectionHeading from "@/Elements/Headings/SectionHeading.jsx";
import Border from "@/Elements/Border/Border.jsx";
import Scroller from "@/Elements/Scroller/Scroller.jsx";
import HorizontalScrollerWrapper from "@/Elements/Wrapper/HorizontalScrollerWrapper.jsx";
import {fetchCategories} from "@/Redux-ToolKit/Features/Category/categoryThunk.js";
import {useDispatch, useSelector} from "react-redux";

export default function Categories() {
    const dispatch = useDispatch(); // Initialize the Redux dispatch function
    const carouselRef = useRef(null); // Create a ref for the scrollable container
    const categoriesData = useSelector((state) => state.category.categories); // Access categories from the Redux store

    useEffect(() => {
        dispatch(fetchCategories()); // Fetch categories when the component mounts
    }, []);


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
                {categoriesData.map((category) => (
                    <CategoryItem key={category._id} categoryItem={category} />
                ))}
            </HorizontalScrollerWrapper>

            <Border/>
        </section>
    )
}