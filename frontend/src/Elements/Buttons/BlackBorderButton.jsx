import React from "react";
import { Button } from "@/components/ui/button.jsx";
import { cn } from "@/lib/utils.js";

export default function BlackBorderButton({
                                              text = "Move All to Bag",
                                              className = "",
                                          }) {
    return (
        <Button
            className={cn(
                // Base styles
                "w-[210px] h-[55px] max-[450px]:text-base max-[450px]:w-[130px] relative overflow-hidden bg-transparent border-[0.5px] border-dark text-dark text-base rounded-[4px] font-normal",
                // Hover effect
                "transition-transform duration-500 ease-in-out transform hover:scale-105",
                // Allow external classes like width, height, responsive text, etc.
                className
            )}
        >
            <span className="relative z-10 transition-transform duration-500 ease-in-out">
                {text}
            </span>
        </Button>
    );
}
