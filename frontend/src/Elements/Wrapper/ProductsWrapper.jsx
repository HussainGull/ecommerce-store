import {BestSellingData} from "@/Sections/BestSelling/BestSellingData.jsx";
import Product from "@/Elements/Product/Product.jsx";
import React from "react";

export function ProductsWrapper({children}) {
    return (
        <div
            className="grid gap-[30px] justify-items-center mt-10"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))' }}
        >
            {children}
        </div>

    )
}