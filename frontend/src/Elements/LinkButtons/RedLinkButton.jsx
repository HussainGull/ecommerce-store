import React from 'react';
import {Link} from 'react-router-dom';
import {cn} from "@/lib/utils.js";

// Assuming RedColorButton was a component that renders a button with certain styles.
// You now apply those styles directly to the Link.

export default function RedLinkButton({LinkTo, Text, className}) {
    return (
        <Link
            to={LinkTo}
            className={cn(
                "w-[234px] h-[55px] max-[450px]:w-full flex items-center justify-center font-poppins relative overflow-hidden bg-error text-white text-base rounded-[4px] transition-transform duration-500 ease-in-out transform hover:bg-hover-warn hover:scale-105",
                className
            )}
        >
            {Text}
        </Link>
    );
}
