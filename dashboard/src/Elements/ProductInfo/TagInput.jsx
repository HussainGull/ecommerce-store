// components/ProductInfo/TagInput.jsx
import React from 'react';
import InputField from "@/Elements/InputField/InputField.jsx";

const TagInput = ({tags, tagInput, onChange}) => (
    <div>
        <label htmlFor="tagInput" className="block text-sm font-medium text-dark-gray mb-1">Tag</label>
        <div className="mt-1 flex flex-wrap items-center border-black border-[0.5px] rounded-md shadow-sm p-2">
            {tags.map((t, index) => (
                <span key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-[4px] text-sm font-medium bg-gray-200 text-gray-700 mr-2 mb-5 mt-3">
          {t}
        </span>
            ))}
            <InputField
                type="text"
                id="tagInput"
                value={tagInput}
                onChange={onChange}
            />
        </div>
    </div>
);

export default TagInput;
