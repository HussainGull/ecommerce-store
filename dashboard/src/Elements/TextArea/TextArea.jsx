import {Textarea} from "@/components/ui/textarea";

export default function TextArea() {
    return (
        <Textarea
            className="w-full h-24 p-3 text-sm text-light-gray border-black border-[0.5px] placeholder:text-black rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
            placeholder="Type some notes"
        />
    )
}
