import ProductSummaryCard from "@/Elements/Card/Products/ProductSummaryCard.jsx";
import Heading from "@/Elements/Heading/Heading.jsx";
import RoutePathDisplay from "@/Elements/RoutePathDisplay/RouthPathDisplay.jsx";
import {Link} from 'react-router-dom';
import {CirclePlus} from "lucide-react";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {fetchProduct} from "@/Redux-Toolkit/Features/Products/productsThunks.js";


export default function AllProducts() {
    const dispatch = useDispatch();
    const productsList = useSelector((state) => state.products.list);

    // ✅ Fetch products on mount
    useEffect(() => {
        dispatch(fetchProduct());
    }, []);


    return (
        <div className="h-min-screen flex flex-col space-y-4">

            <div className={'w-full flex justify-between items-center'}>
                <div className={'w-fit flex flex-col'}>
                    <Heading
                        heading={'All Products'}
                        // paragraph={'Manage your products efficiently with our comprehensive product list.'}
                    />
                    <RoutePathDisplay/>
                </div>

                {/* Add your product management components here */}

                <Link
                    to="/add-new-product"
                    className="w-[220px] h-[50px] gap-3 bg-dark text-white font-semibold flex items-center justify-center rounded-lg hover:bg-brown transition-colors duration-200"
                >
                    <CirclePlus/> Add New Product
                </Link>

            </div>

            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mt-4"
            >
                {productsList.map((product) => (
                    <ProductSummaryCard key={product._id} ProductDetails={product}/>
                ))}
            </div>
        </div>
    )
}