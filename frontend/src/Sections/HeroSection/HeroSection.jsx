import CategoryDropdown from "@/Elements/Dropdown/CategoryDropdown.jsx";
import PromoCarousel from "@/Elements/PromoCarousel/HeroPromoCarousel/PromoCarousel.jsx";

export default function HeroSection() {
    return (
        <div className={"w-full flex mb-35 max-[430px]:mb-20"}>
            <CategoryDropdown/>
            <PromoCarousel/>
        </div>
    )
}