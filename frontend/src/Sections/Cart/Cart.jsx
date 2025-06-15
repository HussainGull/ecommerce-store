import React, {useState, useEffect} from 'react';
import {X, ChevronUp, ChevronDown, CircleX} from 'lucide-react';
import HomeLayout from "@/Elements/Layouts/HomeLayout.jsx";
import RedColorButton from "@/Elements/Buttons/RedColorButton.jsx";
import BlackBorderButton from "@/Elements/Buttons/BlackBorderButton.jsx";
import RoutePathDisplay from "@/Elements/RoutePathDisplay/RouthPathDisplay.jsx";
import {CartTable} from "@/Elements/Cart/CartTable/CartTable.jsx";
import CartTotal from "@/Elements/Cart/CartTotal.jsx";
import {BlackBorderInput} from "@/Elements/Input/BlackBorderInput.jsx"; // For the 'remove' icon

export default function Cart() {
    // Initial product data
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'LCD Monitor',
            imageUrl: '/src/assets/monitor.png', // Placeholder image
            price: 650,
            quantity: 1,
        },
        {
            id: 2,
            name: 'H1 Gamepad',
            imageUrl: '/src/assets/controller.png', // Placeholder image
            price: 550,
            quantity: 2,
        },
    ]);

    const [subtotal, setSubtotal] = useState(0);

    // Calculate subtotal whenever products change
    useEffect(() => {
        const newSubtotal = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
        setSubtotal(newSubtotal);
    }, [products]);

    // Handle quantity changes
    const handleQuantityChange = (id, delta) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id
                    ? {...product, quantity: Math.max(1, product.quantity + delta)} // Ensure quantity doesn't go below 1
                    : product
            )
        );
    };

    // Handle product removal (not explicitly asked for, but inferred from 'X' icon)
    const handleRemoveProduct = (id) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    };

    return (
        <>
            <div className=" flex flex-col items-center">
                <div
                    className="w-full max-w-6xl bg-white rounded-lg p-0"> {/* Removed padding here, added to children */}

                    <div className={'mt-30 mb-10'}>
                        <RoutePathDisplay/>
                    </div>

                    {/* Product Table */}
                    <CartTable
                        products={products}
                        handleRemoveProduct={handleRemoveProduct}
                        setProducts={setProducts}
                        handleQuantityChange={handleQuantityChange}/>

                    {/* Buttons below table */}
                    <div className="flex justify-between mt-8 mb-16">
                        <BlackBorderButton
                            text={'Back To Home'}
                        >
                        </BlackBorderButton>
                        <BlackBorderButton
                            text={'Update Cart'}
                        >
                        </BlackBorderButton>
                    </div>

                    {/* Coupon Code and Cart Total Section */}
                    <div className="flex flex-col md:flex-row justify-between gap-8">
                        {/* Coupon Code Input */}
                        <div className="flex flex-col gap-4 w-full md:w-1/2">
                            <div className="flex gap-4">
                                <BlackBorderInput/>
                                <RedColorButton
                                    text={'Apply Coupon'}
                                    className={'font-normal w-[210px] h-[55px] max-[450px]:w-1/ max-[450px]:text-xs'}
                                >
                                </RedColorButton>
                            </div>
                        </div>

                        {/* Cart Total */}
                        <CartTotal subtotal={subtotal}/>
                    </div>
                </div>
            </div>
        </>
    );
}