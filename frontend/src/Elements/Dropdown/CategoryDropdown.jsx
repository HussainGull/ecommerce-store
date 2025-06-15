import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
// Make sure this path is correct for your CategoryAccordionData
import {CategoryDropdownData} from "@/Elements/Header/HeaderData.jsx";
import VerticalBorder from "@/Elements/Border/VerticalBorder.jsx";

export default function CategoryDropdown() {
    return (
        <div className="w-[260px] h-[390px] gap-4 items-stretch overflow-y-auto custom-scrollbar-hide hidden xl:flex">
            <Accordion
                type="single"
                collapsible
                className="w-full  pt-10"
                defaultValue="item-1"
            >
                {CategoryDropdownData.map((item, id) => (
                    <AccordionItem value={`item-${id}`} key={id} className={"border-none gap-4"}>
                        <AccordionTrigger className={"font-poppins font-normal text-base"}>
                            {item.name}
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p>
                                {item.description}
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            {/* Vertical Divider */}
            <VerticalBorder className="self-stretch"/>
        </div>
    )
}
