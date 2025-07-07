import React from "react";

// Map of category name to image filename
const categoryImages = {
    "Football Balls": "/src/assets/football-balls.png",
    "Football Kits": "/src/assets/football-kits.png",
    "Football Shoes": "/src/assets/football-shoes.png",
    "Football Equipment": "/src/assets/football-equiqment.png",
    "Football Shins": "/src/assets/football-shins.png",
    "Football Socks": "/src/assets/football-socks.png",
    "Football Gloves": "/src/assets/football-gloves.png",
};

export default function CategoryItem({ categoryItem }) {
    const defaultCategory = {
        id: 1,
        name: "Football Balls",
    };

    const currentCategory = categoryItem || defaultCategory;

    const imageUrl =
        categoryImages[currentCategory.name] || "/src/assets/default.png";

    return (
        <div className="w-[170px] min-w-[170px] h-[145px] border-[0.5px] mt-15 border-bg-muted flex rounded items-center justify-center transition duration-300 group hover:bg-[var(--text-danger)]">
            <div className="flex flex-col gap-4 text-black group-hover:text-white items-center">
                <img
                    src={imageUrl}
                    alt={currentCategory.name}
                    className="w-16 h-16 transition duration-300 group-hover:filter group-hover:invert group-hover:brightness-200"
                />
                <span>{currentCategory.name}</span>
            </div>
        </div>
    );
}
