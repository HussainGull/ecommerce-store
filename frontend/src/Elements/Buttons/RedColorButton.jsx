import React from "react";
import {Button} from "@headlessui/react";
import {cn} from "@/lib/utils.js";

export default function RedColorButton({
                                           text = "View All Products",
                                           className = "",
                                       }) {
    return (
        <Button
            className={cn(
                "w-[234px] h-[55px] max-[450px]:w-full font-poppins relative overflow-hidden bg-error text-white text-base rounded-[4px] transition-transform duration-500 ease-in-out transform hover:bg-hover-warn hover:scale-105",
                className
            )}
        >
              <span className="relative z-10 transition-transform duration-500 ease-in-out">
                {text}
              </span>
        </Button>
    );
}
