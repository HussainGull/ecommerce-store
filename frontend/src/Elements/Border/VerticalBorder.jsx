import {cn} from "@/lib/utils.js";

export default function VerticalBorder({className}) {
    return (
        <div className={cn("w-[0.5px] bg-muted", className)}/>
    )
}