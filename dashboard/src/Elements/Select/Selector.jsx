import * as React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function Selector({ placeholder, label, items = [], value, onChange }) {
    return (
        <Select
            value={value}
            onValueChange={(val) => {
                onChange(val);
            }}
        >
            <SelectTrigger
                className="w-full min-h-[48px] px-3 border-[0.5px] border-[var(--text-dark)] rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 flex items-center justify-between"
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {items.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
