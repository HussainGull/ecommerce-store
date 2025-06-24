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
import axiosClient from "@/Elements/AxiosClient/AxiosClient.js";
import {showToast} from "@/Elements/Toaster/Toaster.jsx";

export default function Dropdown({productId}) {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);


    const deleteProduct = async (productId) => {
        try {
            const response = await axiosClient.delete('/product/delete-product', {
                data: {id: productId}, // 👈 DELETE needs 'data' wrapper
            });

            if (response.status === 200) {
                showToast({
                    title: "Deleted Successfully !",
                    description: "Product Has Been Deleted Successfully",
                });
            }

        } catch (error) {
            const status = error?.response?.status || error?.status || "Error";
            const message =
                error?.response?.data?.message ||  // From backend
                error?.message ||                 // From JS/Axios
                "Something went wrong.";

            if (status === 401) {
                showToast(
                    {
                        title: "Request Denied",
                        description: "Please try After Sometime"
                    }
                )
            } else {
                showToast({
                    title: "Error !",
                    description: message
                })
            }

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
                    console.log("🧨 Delete confirmed for:", productId);
                    deleteProduct(productId)
                    setOpenDialog(false);
                }}
            />
        </>
    );
}
