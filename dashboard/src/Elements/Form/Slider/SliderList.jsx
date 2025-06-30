import React, {useEffect} from 'react';
import SliderRow from './SliderRow';
import {deleteSlider, fetchSliders, getSingleSlider} from "@/Redux-Toolkit/Features/Slider/sliderThunks.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const SliderList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ✅ Get Redux state without name conflict
    const sliderItems = useSelector((state) => state.sliders.sliders);
    const loading = sliderItems.loading;
    const error = sliderItems.error;

    useEffect(() => {
        dispatch(fetchSliders());
    }, [dispatch]);

    const handleEdit = (id) =>{
        navigate(`/edit-slider/${id}`);
    };
    const handleDelete = (id) => {
        dispatch(deleteSlider(id));
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Slider Management</h3>
                <p className="text-sm text-gray-600 mt-1">Manage all your website sliders from here</p>
            </div>

            {loading && <p className="p-4">Loading sliders...</p>}
            {error && <p className="p-4 text-red-500">Error: {error}</p>}

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Heading</th>
                        <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">CTA</th>
                        <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {sliderItems && sliderItems.length > 0 ? (
                        sliderItems.map((item) => (
                            <SliderRow
                                key={item._id}
                                sliderData={item}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        !loading && (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-500">
                                    No sliders found.
                                </td>
                            </tr>
                        )
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SliderList;
