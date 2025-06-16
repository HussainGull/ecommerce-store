import {cn} from "@/lib/utils.js";
import React from "react";
import {Input} from "@/components/ui/input";

// ✅ Forward ref for react-hook-form support
const InputField = React.forwardRef(function InputField(
    {type, name, placeholder, className = "", ...rest},
    ref
) {
    return (
        <Input
            ref={ref} // 💡 Needed by react-hook-form
            type={type}
            name={name}
            placeholder={placeholder}
            className={cn("h-[48px] sm:text-sm w-full font-poppins px-4 py-3 border-black border-[0.5px] rounded-[8px] placeholder-gray-600", className)}
            {...rest} // 💡 Includes onChange, onBlur, etc.
        />
    );
});

export default InputField;
