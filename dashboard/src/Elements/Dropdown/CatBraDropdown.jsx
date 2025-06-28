import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {MoreHorizontal, Trash2, Pencil} from "lucide-react";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {DeleteAlert} from "@/Elements/Alert/DeleteAlert.jsx";
import {showToast} from "@/Elements/Toaster/Toaster.jsx";
import {useDispatch} from 'react-redux';
import {deleteCategory} from "@/Redux-Toolkit/Features/Category/categoriesThunks.js";
import {deleteBrand} from "@/Redux-Toolkit/Features/Brand/brandsThunks.js";


export default function CatBraDropdown({mode, productId}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);


    const handleDelete = async (id) => {
        try {
            if (mode === 'brand') {
                await dispatch(deleteBrand(id)).unwrap();  // ✅ Correct thunk for brand
                showToast({
                    title: '✅ Brand Deleted',
                    description: 'Brand removed from the list.',
                });
            } else {
                await dispatch(deleteCategory(id)).unwrap();  // ✅ Correct thunk for category
                showToast({
                    title: '✅ Category Deleted',
                    description: 'Category removed from the list.',
                });
            }
        } catch (error) {
            showToast({
                title: '❌ Delete Failed',
                description: error || 'Please Try Again Later.',
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
                    <DropdownMenuItem onClick={() => navigate(`/edit-${mode}/${productId}`)}>
                        <Pencil className="mr-2 h-4 w-4"/> Edit {mode}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setOpenDialog(true)}
                        className="text-red-600 h-8"
                    >
                        <Trash2 className="mr-2 h-4 w-4"/> Delete {mode}
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
