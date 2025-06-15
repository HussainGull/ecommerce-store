import React from "react";

export default function CategoryItem({categoryItem}) {

    const defaultCategory = {
        id: 1, name: 'Phones', imageUrl: '/src/assets/cellphone.svg',

    };

    const currentCategory = categoryItem || defaultCategory;

    return (
        <div className="w-[170px] min-w-[170px] h-[145px] border-[0.5px] mt-15 border-bg-muted flex rounded items-center justify-center transition duration-300 group hover:bg-[var(--text-danger)]">
            <div className="flex flex-col gap-4 text-black group-hover:text-white items-center">
                <img
                    src={currentCategory.imageUrl}
                    alt={currentCategory.name}
                    className="w-14 h-14 transition duration-300 group-hover:filter group-hover:invert group-hover:brightness-200"
                />
                <span>{currentCategory.name}</span>
            </div>
        </div>

    )
}