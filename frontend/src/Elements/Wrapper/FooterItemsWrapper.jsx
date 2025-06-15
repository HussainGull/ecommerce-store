import {Link} from "react-router-dom";
import React from "react";

export function FooterItemsWrapper({heading, children}) {
    return (
        <div className={"flex flex-col"}>
            <h3 className="font-poppins text-lg font-semibold mb-4">{heading}</h3>
            {children}
        </div>
    )
}