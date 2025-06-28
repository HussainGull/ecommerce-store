import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {fetchProductsByBrand} from "/src/Redux-Toolkit/Features/Brand/brandsThunks.js";
import ProductSummaryCard from "@/Elements/Card/Products/ProductSummaryCard.jsx";
import Heading from "@/Elements/Heading/Heading.jsx";
import RoutePathDisplay from "@/Elements/RoutePathDisplay/RouthPathDisplay.jsx";
import {CirclePlus} from "lucide-react";


const BrandProductsPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    const productsByBrand = useSelector((state) => state.brands.productsByBrand);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductsByBrand(id));
        }
    }, [id, dispatch]);

    return (
        <div className="h-min-screen flex flex-col space-y-4">

            <div className={'w-full flex justify-between items-center'}>
                <div className={'w-full flex justify-between items-center mb-10'}>
                    <div className={'w-fit flex flex-col'}>
                        <Heading
                            heading={'Brand Products'}
                            // paragraph={'Products Which Consists the Following Brand Will Appear Here.'}
                        />
                        <RoutePathDisplay />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {productsByBrand && productsByBrand.map((product) => (
                    <div key={product._id} className="mt-4">
                        <ProductSummaryCard ProductDetails={product} />
                    </div>
                ))}
            </div>
        </div>
    );


};


export default BrandProductsPage;
