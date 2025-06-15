import React from "react";

export function BlackBorderInput() {
    return (
        <input
            type="text"
            placeholder="Coupon Code"
            className="max-[450px]:w-[140px] flex-grow px-4 py-2 border border-bg-dark rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
    )
}