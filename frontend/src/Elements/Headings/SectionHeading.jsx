import React from "react";

export default function SectionHeading({IconHeading, SectionHeading}) {
    return (
        <div className={"w-full space-y-5"}>
            <div className={'w-full flex items-center'}>
                <img src={"/src/assets/rectangle.svg"} alt={"Rectangle"} className="w-4 h-8"/>
                <span className="text-xl font-poppins font-semibold text-danger ml-4">{IconHeading}</span>
            </div>
                <span
                    className="text-2xl lg:text-4xl font-poppins font-medium text-dark whitespace-nowrap leading-none flex-shrink-0">{SectionHeading}
                </span>
        </div>
    )
}