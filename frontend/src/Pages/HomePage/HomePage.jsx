import FlashSales from "@/Sections/FlashSales/FlashSales.jsx";
import Categories from "@/Sections/Categories/Categories.jsx";
import BestSelling from "@/Sections/BestSelling/BestSelling.jsx";
import OurProducts from "@/Sections/OurProducts/OurProducts.jsx";
import NewArrivals from "@/Sections/NewArrivals/NewArrivals.jsx";
import FeaturesSection from "@/Sections/FeaturesSection/FeaturesSection.jsx";
import HeroSection from "@/Sections/HeroSection/HeroSection.jsx";
import HomePageImage from "@/Elements/HomePageImage/HomePageImage.jsx";

export default function HomePage() {
    return (
        <>
            <HeroSection/>
            <FlashSales/>
            <Categories/>
            <BestSelling/>
            <HomePageImage
                ImgPath={"/src/assets/homepage.jpg"}
            />
            <OurProducts/>
            <NewArrivals/>
            <FeaturesSection/>
        </>

    )
}