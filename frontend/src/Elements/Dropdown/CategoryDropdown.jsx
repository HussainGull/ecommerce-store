import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import VerticalBorder from "@/Elements/Border/VerticalBorder.jsx";
import {useEffect} from "react";
import {fetchCategories} from "@/Redux-ToolKit/Features/Category/categoryThunk.js";
import {useDispatch, useSelector} from "react-redux";

export default function CategoryDropdown() {

    const dispatch = useDispatch();
    const {categories} = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(fetchCategories())
    }, []);

    useEffect(() => {
        console.log(categories)
    }, [categories]);

    return (
        <div className="w-[260px] h-[390px] gap-4 items-stretch overflow-y-auto custom-scrollbar-hide hidden xl:flex">
            <Accordion
                type="single"
                className="w-full  pt-10"
                defaultValue="item-1"
            >
                {categories.map((item) => (
                    <AccordionItem
                        key={item._id}
                        className={"border-none gap-4"}>
                        <AccordionTrigger
                            onClick={() => console.log(item._id)}
                            className={"font-poppins font-normal text-base "}>
                            {item.name}
                        </AccordionTrigger>
                    </AccordionItem>
                ))}
            </Accordion>

            {/* Vertical Divider */}
            <VerticalBorder className="self-stretch"/>
        </div>
    )
}
