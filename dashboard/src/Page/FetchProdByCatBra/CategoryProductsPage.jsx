import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {fetchProductsByCategory} from "/src/Redux-Toolkit/Features/Category/categoriesThunks.js";
import ProductSummaryCard from "@/Elements/Card/Products/ProductSummaryCard.jsx";
import Heading from "@/Elements/Heading/Heading.jsx";
import RoutePathDisplay from "@/Elements/RoutePathDisplay/RouthPathDisplay.jsx";


const CategoryProductsPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    const {productsByCategory} = useSelector((state) => state.categories);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductsByCategory(id));
        }
    }, [id, dispatch]);

    return (

        <div className="h-screen flex flex-col space-y-4">
            <div className={'w-full flex justify-between items-center mb-10'}>
                <div className={'w-fit flex flex-col'}>
                    <Heading
                        heading={'Category Products'}
                        // paragraph={'Products Which Consists the Following Category Will Appear Here.'}
                    />
                    <RoutePathDisplay/>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {productsByCategory && productsByCategory.map((product) => (
                    <ProductSummaryCard key={product._id} ProductDetails={product}/>
                ))}
            </div>
        </div>
    );
};

export default CategoryProductsPage;
