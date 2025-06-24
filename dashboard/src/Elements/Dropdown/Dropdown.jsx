import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {MoreHorizontal, Trash2, Eye, Pencil} from "lucide-react";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {DeleteAlert} from "@/Elements/Alert/DeleteAlert.jsx";
import {showToast} from "@/Elements/Toaster/Toaster.jsx";
import {useDispatch} from 'react-redux';
import {deleteProduct} from "@/Redux-Toolkit/Features/Products/productsThunks.js";


export default function Dropdown({productId}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);


    const handleDelete = async (productId) => {
        const result = await dispatch(deleteProduct(productId));

        if (deleteProduct.fulfilled.match(result)) {
            showToast({
                title: '✅ Product Deleted',
                description: 'Removed from the list.',
            });

            // ✅ No fetchProduct() if already removed from Redux state

        } else {
            showToast({
                title: '❌ Delete Failed',
                description: result.payload || 'Could not delete product.',
                variant: 'destructive',
            });
        }
    };



    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100">
                        <MoreHorizontal size={18} className="text-dark cursor-pointer"/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem onClick={() => navigate(`/product/${productId}`)}>
                        <Eye className="mr-2 h-4 w-4"/> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/edit-product/${productId}`)}>
                        <Pencil className="mr-2 h-4 w-4"/> Edit Product
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setOpenDialog(true)}
                        className="text-red-600 h-8"
                    >
                        <Trash2 className="mr-2 h-4 w-4"/> Delete Product
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DeleteAlert
                open={openDialog}
                setOpen={setOpenDialog}
                onConfirm={() => {
                    handleDelete(productId)
                    setOpenDialog(false);
                }}
            />
        </>
    );
}
