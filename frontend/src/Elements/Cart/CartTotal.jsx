import React from "react";

export default function CartTotal({subtotal}) {
    return (
        <div
            className="border border-bg-dark rounded p-6 w-full md:w-1/2 lg:w-[400px] flex flex-col justify-end">
            <h2 className="text-xl font-normal text-gray-900 mb-4">Cart Total</h2>
            <div className="flex justify-between border-b-[0.5px] border-bg-muted py-3">
                <span className="text-gray-800">Subtotal:</span>
                <span className="text-gray-900 font-medium">${subtotal}</span>
            </div>
            <div className="flex justify-between border-b-[0.5px] border-bg-muted py-3">
                <span className="text-gray-800">Shipping:</span>
                <span className="text-gray-900">Free</span>
            </div>
            <div className="flex justify-between py-3">
                <span className="text-gray-800">Total:</span>
                <span className="text-gray-900 font-medium text-lg">${subtotal}</span>
            </div>
            <button
                className="w-[260px] h-[55px] max-[450px]:w-full  mt-6 self-center px-6 py-3 bg-error text-white rounded hover:bg-red-600 transition-transform duration-500 ease-in-out transform hover:scale-105">
                Proceed to checkout
            </button>
        </div>
    )
}