import React, {useEffect} from 'react';
import {Package} from 'lucide-react';
import CarouselRow from './CarouselRow.jsx';
import {deleteCarouselThunk, fetchCarouselsThunk} from "@/Redux-Toolkit/Features/Carousel/carouselThunk.js";
import {useDispatch, useSelector} from "react-redux";
import {showToast} from "@/Elements/Toaster/Toaster.jsx";
import {useNavigate} from "react-router-dom";

const CarouselList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const carouselsData = useSelector((state) => state.carousels.carousels)

    const handleEdit = (id) => {
        console.log('Edit carousel:', id);
        navigate(`/edit-carousel/${id}`);
    };

    const handleDelete = (id) => {
        dispatch(deleteCarouselThunk(id))
        if (deleteCarouselThunk.fulfilled) {
            showToast({
                title: "✅ Carousel Deleted !",
                description: "The carousel has been successfully deleted.",
            })
        } else {
            showToast({
                title: "❌ Unsuccessful!",
                description: "Error While Deleting Carousel !",
            })
        }
    };

    useEffect(() => {
        dispatch(fetchCarouselsThunk())
    }, [dispatch])

    // useEffect(() => {
    //     console.log("Carousels Data:", carouselsData)
    // }, [carouselsData])

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Carousel Management</h3>
                <p className="text-sm text-gray-600 mt-1">Manage all your carousel content from here</p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Image
                        </th>
                        <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Heading
                        </th>
                        <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                        </th>
                        <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            CTA
                        </th>
                        <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {carouselsData.map((carousel) => (
                        <CarouselRow
                            key={carousel._id}
                            carousel={carousel}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                    </tbody>
                </table>
            </div>

            {carouselsData.length === 0 && (
                <div className="p-12 text-center">
                    <div className="text-gray-400 mb-4">
                        <Package size={48} className="mx-auto"/>
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No carousels found</h4>
                </div>
            )}
        </div>
    );
};

export default CarouselList;