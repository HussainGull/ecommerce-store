import React from "react";
import {cn} from "@/lib/utils.js";

export default function Border({className}) {
    return (
        <div className={cn("mt-17.5 h-[0.5px] bg-muted",className)}/>
    )
}