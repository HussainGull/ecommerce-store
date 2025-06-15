import React from "react";
import {cn} from "@/lib/utils.js";
import {CirclePlus} from 'lucide-react'

export default function AddProduct({type = "submit", text, className = ""}) {
    return (
        <button
            type={type}
            className={cn("font-poppins w-full flex items-center justify-between gap-2 px-6 py-3 bg-dark text-white rounded-md font-medium hover:bg-blue/90 hover:scale-[1.02] transition-all duration-300 ease-in-out transform ", className)}
        >
            <CirclePlus/> {text}
        </button>
    );
}
