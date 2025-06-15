import React from "react";
import {cn} from "@/lib/utils.js";

export function Description({text, className}) {
    return (
        <>
            <p className={cn("font-poppins max-[450px]:text-[8px] text-sm text-dark mb-2 whitespace-normal m-0", className)}>
                {text}
            </p>
        </>
    )
}