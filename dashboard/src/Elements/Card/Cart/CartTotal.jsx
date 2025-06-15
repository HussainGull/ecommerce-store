import React from "react";
import {BlueButton} from "@/Elements/Buttons/BlueButton.jsx";

export default function CartTotal({ subtotal }) {
    const SubTotal = subtotal || 1700;

    return (
        <div className="w-full max-w-md ml-auto border border-bg-dark rounded-xl p-6 shadow-sm bg-white dark:bg-dark mt-10">
            <h2 className="font-poppins text-2xl font-semibold text-dark mb-4 text-center">Cart Total</h2>

            <div className="space-y-3 text-base text-dark">
                <div className="flex justify-between border-b border-light-gray pb-2">
                    <span className={"font-poppins"}>Subtotal:</span>
                    <span className="font-medium font-poppins">${SubTotal}</span>
                </div>
                <div className="flex justify-between border-b border-light-gray pb-2">
                    <span className={"font-poppins"}>Shipping:</span>
                    <span className="font-poppins text-success font-medium">Free</span>
                </div>
                <div className="flex justify-between pt-2 text-lg font-semibold">
                    <span className={"font-poppins"}>Total:</span>
                    <span className={"font-poppins"}>${SubTotal}</span>
                </div>
            </div>

            <BlueButton
                text={'Proceed to Checkout'}
                />
        </div>
    );
}
