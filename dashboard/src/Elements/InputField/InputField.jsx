import { Input } from "@/components/ui/input";
import {cn} from "@/lib/utils.js";

export default function InputField({ type = "text", name, value, onChange, placeholder, required = false, className }) {
    return (
        <Input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={cn("h-[48px] sm:text-sm w-full font-poppins px-4 py-3 border-black border-[0.5px] rounded-[8px] placeholder-gray-600", className)}
        />
    );
}
