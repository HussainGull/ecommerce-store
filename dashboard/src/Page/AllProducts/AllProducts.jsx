import ProductSummaryCard from "@/Elements/Card/Products/ProductSummaryCard.jsx";
import Heading from "@/Elements/Heading/Heading.jsx";
import RoutePathDisplay from "@/Elements/RoutePathDisplay/RouthPathDisplay.jsx";
import {Link} from 'react-router-dom';
import {CirclePlus} from "lucide-react";
import React, {useEffect, useState} from "react";
import axiosClient from "@/Elements/AxiosClient/AxiosClient.js";

export default function AllProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosClient('/product/get-all-products');
                setProducts(response.data.data);
            } catch (error) {
                console.error("❌ Error while fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

// // Log whenever products update
//     useEffect(() => {
//         console.log(products)
//     }, [products]);


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
                {products.map((product) => (
                    <ProductSummaryCard key={product.id} ProductDetails={product}/>
                ))}
            </div>
        </div>
    )
}