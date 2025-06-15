import { Separator } from "@/components/ui/separator"
import {cn} from "@/lib/utils.js";

export default function Boundary({heading, paragraph, className}) {
    return (
        <div>
            <div className="space-y-1">
                <h4 className="text-sm leading-none font-medium">{heading}</h4>
                <p className="text-muted-foreground text-sm">
                    {paragraph}
                </p>
            </div>
            <Separator className={cn("my-4",className)} />
            {/*<div className="flex h-5 items-center space-x-4 text-sm">*/}
            {/*    <div>Blog</div>*/}
            {/*    <Separator orientation="vertical" />*/}
            {/*    <div>Docs</div>*/}
            {/*    <Separator orientation="vertical" />*/}
            {/*    <div>Source</div>*/}
            {/*</div>*/}
        </div>
    )
}
