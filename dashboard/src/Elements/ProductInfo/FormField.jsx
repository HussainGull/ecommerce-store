// components/ProductInfo/FormField.jsx
import React from "react";
import TextArea from "@/Elements/TextArea/TextArea.jsx";
import InputField from "@/Elements/InputField/InputField.jsx";

const FormField = ({ label, id, type = 'text', value, onChange, placeholder = '', prefix = null, rows = 1 }) => (
    <div>
        <label htmlFor={id} className="font-poppins block text-base font-medium text-dark mb-2">{label}</label>
        {type === 'textarea' ? (
            <TextArea
                id={id}
                rows={rows}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        ) : (
            <div className="mt-1 relative rounded-md shadow-sm">
                {prefix && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">{prefix}</span>
                    </div>
                )}
                <InputField
                    type={type}
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`${prefix ? 'pl-7 pr-3' : 'px-3'}`}
                />
            </div>
        )}
    </div>
);

export default FormField;
