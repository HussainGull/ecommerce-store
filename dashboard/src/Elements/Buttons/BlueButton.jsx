import { ArrowRight } from "lucide-react";
import {Button} from '/src/components/ui/button.jsx'
import React from "react";
import {cn} from "@/lib/utils.js";

export function BlueButton({ type = "submit", text, ArrowRightIcon = true, className = "" }) {
    return (
        <Button
            type={type}
            className={cn("font-poppins w-full h-[48px] flex items-center justify-between gap-2 px-6 py-3 bg-blue text-light rounded-md font-medium hover:bg-blue/90 hover:scale-[1.02] transition-all duration-300 ease-in-out transform mt-6", className)}
        >
            {text}
            {
                ArrowRightIcon && (
                    <ArrowRight
                        size={20}
                        className="transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                    />
                )
            }

        </Button>
    );
}
