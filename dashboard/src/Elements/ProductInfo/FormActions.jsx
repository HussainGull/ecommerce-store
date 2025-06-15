// components/ProductInfo/FormActions.jsx
import React from 'react';

const FormActions = ({ButtonText}) => (
    <div
        className="bg-light rounded-lg max-w-7xl h-[100px] mx-auto mt-8 shadow-md pr-8 flex items-center sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 w-full">
        <button type="button"
                className="h-[48px] px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">{ButtonText || 'Update'}
        </button>
        <button type="button"
                className="h-[48px] px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500">DELETE
        </button>
        <button type="button"
                className="h-[48px] px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">CANCEL
        </button>
    </div>
);

export default FormActions;
