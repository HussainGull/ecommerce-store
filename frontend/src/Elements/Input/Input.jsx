import React from "react";

export function Input({value, onChange, placeholder}) {
    return (
        <div>
            <input
                type="text"
                name="name"
                value={value}
                onChange={onChange}
                className="w-full px-4 py-3  rounded-md bg-light text-muted placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder={placeholder}
                required
            />
        </div>

    )
}