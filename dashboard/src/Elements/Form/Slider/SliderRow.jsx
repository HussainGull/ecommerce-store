import React, {useState} from 'react';
import {Edit, Trash2, ExternalLink} from 'lucide-react';
import {DeleteAlert} from "@/Elements/Alert/DeleteAlert.jsx";

const SliderRow = ({sliderData, onEdit, onDelete}) => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleDeleteClick = () => {
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = () => {
        onDelete(sliderData._id);
        setOpenDeleteDialog(false);
    };

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4">
                <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100">
                    <img
                        src={sliderData.sliderImage}
                        alt={sliderData.heading}
                        className="w-full h-full object-cover"
                    />
                </div>
            </td>

            <td className="px-6 py-4">
                <div className="max-w-xs">
                    <h4 className="font-medium text-gray-900 truncate">{sliderData.heading}</h4>
                </div>
            </td>

            <td className="px-6 py-4">
                <div className="max-w-sm">
                    <p className="text-sm text-gray-600 line-clamp-2">{sliderData.paragraph}</p>
                </div>
            </td>

            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-blue-600">{sliderData.ctaText}</span>
                    <ExternalLink size={14} className="text-gray-400"/>
                </div>
                <p className="text-xs text-gray-500 mt-1">{sliderData.ctaLink}</p>
            </td>

            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onEdit(sliderData._id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit slider"
                    >
                        <Edit size={16}/>
                    </button>

                    <button
                        onClick={handleDeleteClick}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete slider"
                    >
                        <Trash2 size={16}/>
                    </button>

                    {/* ✅ Delete Confirmation Dialog */}
                    <DeleteAlert
                        open={openDeleteDialog}
                        setOpen={setOpenDeleteDialog}
                        onConfirm={handleConfirmDelete}
                    />
                </div>
            </td>
        </tr>
    );
};

export default SliderRow;
