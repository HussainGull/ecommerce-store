import React, {useState} from 'react';
import HomeLayout from "@/Elements/Layouts/HomeLayout.jsx";
import {Input} from "@/Elements/Input/Input.jsx";

export default function CheckoutPage() {

    const BillingDetails = [
        {
            id: 1,
            title: 'First Name'
        },
        {
            id: 2,
            title: 'Company Name'
        },
        {
            id: 3,
            title: 'Street Address'
        },
        {
            id: 4,
            title: 'Apartment, floor, etc (optional)'
        },
        {
            id: 5,
            title: 'Town/City'
        },
        {
            id: 6,
            title: 'Phone Number'
        },
        {
            id: 7,
            title: 'Email Address'
        },

    ]

    const [cartItems] = useState([
        {id: 1, name: 'LCD Monitor', price: 650, imageUrl: '/src/assets/monitor.png'},
        {id: 2, name: 'H1 Gamepad', price: 1100, imageUrl: '/src/assets/controller.png'},
    ]);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const shipping = 'Free'; // As per screenshot
    const total = subtotal; // Assuming total is same as subtotal if shipping is free

    const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery'); // State for payment method

    return (
            <div className="bg-white font-poppins mt-40">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Left Section: Billing Details */}
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-normal text-gray-900 mb-6">Billing Details</h2>

                        <form className="grid grid-cols-1 gap-y-6">

                            {
                                BillingDetails.map((item, index) => (
                                    <div
                                        key={index}
                                    >
                                        <label htmlFor="firstName" className="block text-sm font-light text-muted mb-2">
                                            {item.title}
                                        </label>
                                        <Input
                                            type="text"
                                            id={item.title}
                                            className="w-full px-4 py-3 rounded-[4px] bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                                            placeholder={item.title}
                                        />
                                    </div>
                                ))
                            }

                        </form>
                    </div>

                    {/* Right Section: Your Order */}
                    <div className="flex flex-col justify-center">
                        <div className="rounded p-6">
                            <h2 className="text-xl font-medium text-gray-900 mb-4">Your Order</h2>

                            {/* Product List in Order Summary */}
                            <div className="mb-4">
                                {cartItems.map((item) => (
                                    <div key={item.id}
                                         className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                                        <div className="flex items-center gap-2">
                                            <img src={item.imageUrl} alt={item.name}
                                                 className="w-8 h-8 object-contain"/>
                                            <span className="text-gray-800">{item.name}</span>
                                        </div>
                                        <span className="text-gray-800">${item.price}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Subtotal, Shipping, Total */}
                            <div className="flex justify-between border-b border-gray-200 py-3">
                                <span className="text-gray-800">Subtotal:</span>
                                <span className="text-gray-900 font-medium">${subtotal}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 py-3">
                                <span className="text-gray-800">Shipping:</span>
                                <span className="text-gray-900">{shipping}</span>
                            </div>
                            <div className="flex justify-between py-3 mb-6">
                                <span className="text-gray-800 font-medium text-lg">Total:</span>
                                <span className="text-gray-900 font-medium text-lg">${total}</span>
                            </div>

                            {/* Payment Methods */}
                            <div className="flex flex-col gap-4 mb-6">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="bank"
                                        checked={paymentMethod === 'bank'}
                                        onChange={() => setPaymentMethod('bank')}
                                        className="form-radio h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
                                    />
                                    <span className="ml-2 text-gray-900">Bank</span>
                                    {/* Placeholder for payment icons */}
                                    <div className="ml-auto flex gap-2">
                                        <img src="/src/assets/bcash.svg" alt="B Cash"
                                             className="h-5 w-auto"/>
                                        <img src="/src/assets/visa.svg" alt="Visa"
                                             className="h-5 w-auto"/>
                                        <img src="/src/assets/mastercard.svg" alt="Master Card"
                                             className="h-5 w-auto"/>
                                        <img src="/src/assets/nagad.svg" alt="Nagad"
                                             className="h-5 w-auto"/>
                                    </div>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cash_on_delivery"
                                        checked={paymentMethod === 'cash_on_delivery'}
                                        onChange={() => setPaymentMethod('cash_on_delivery')}
                                        className="form-radio h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
                                    />
                                    <span className="ml-2 text-gray-900">Cash on delivery</span>
                                </label>
                            </div>

                            {/* Coupon Code Input */}
                            <div className="flex gap-4 mb-6">
                                <input
                                    type="text"
                                    placeholder="Coupon Code"
                                    className="flex-grow px-4 py-2 border border-bg-dark rounded focus:outline-none focus:ring-1 focus:ring-blue-500 transition-transform duration-500 ease-in-out "
                                />
                                <button
                                    className="px-6 py-3 bg-error text-white rounded hover:bg-red-600 transition-transform duration-500 ease-in-out transform hover:scale-105">
                                    Apply Coupon
                                </button>
                            </div>

                            {/* Place Order Button */}
                            <button
                                className="w-full px-6 py-3 bg-error text-white rounded hover:bg-red-600 text-lg font-medium transition-transform duration-500 ease-in-out transform hover:scale-105">
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    );
}