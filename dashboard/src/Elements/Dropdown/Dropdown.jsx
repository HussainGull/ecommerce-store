import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {MoreHorizontal} from "lucide-react";
import React from "react";
import {useNavigate} from "react-router-dom";

export default function Dropdown({ productId }) {
    const navigate = useNavigate();

    // ✅ Confirm the ID is being passed
    console.log("Dropdown received productId:", productId);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100">
                    <MoreHorizontal size={18} className="text-dark cursor-pointer"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem onClick={() => navigate(`/product/${productId}`)}>
                    👁 View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`/edit-product/${productId}`)}>
                    ✏️ Edit Product
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("🖨 Duplicate logic here", productId)}>
                    🖨 Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => console.log("🗑 Delete logic or modal here", productId)}
                    className="text-red-600 focus:text-red-600"
                >
                    🗑 Delete Product
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
