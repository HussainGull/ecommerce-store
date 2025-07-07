import Heading from "@/Elements/Heading/Heading.jsx";
import RoutePathDisplay from "@/Elements/RoutePathDisplay/RouthPathDisplay.jsx";
import {Link} from "react-router-dom";
import {CirclePlus} from "lucide-react";
import React from "react";
import CarouselList from "@/Elements/Form/Carousels/CarouselList.jsx";

export default function Carousels() {
    return (
        <div className={'w-full flex flex-col gap-10'}>
            <div className={'w-full flex justify-between items-center'}>
                <div className={'w-fit flex flex-col'}>
                    <Heading
                        heading={'All Carousels'}
                        // paragraph={'Manage your products efficiently with our comprehensive product list.'}
                    />
                    <RoutePathDisplay/>
                </div>
                <Link
                    to="/add-carousel"
                    className="w-[220px] h-[50px] gap-3 bg-dark text-white font-semibold flex items-center justify-center rounded-lg hover:bg-brown transition-colors duration-200"
                >
                    <CirclePlus/> Add Carousel
                </Link>
            </div>
            <CarouselList/>
        </div>

    )
}