import ProductInfo from "@/Elements/ProductInfo/ProductInfo.jsx";
import Heading from "@/Elements/Heading/Heading.jsx";
import RoutePathDisplay from "@/Elements/RoutePathDisplay/RouthPathDisplay.jsx";

export default function ProductDetails() {
    return (
        <div className="min-h-screen flex flex-col ">
                <div className={'w-fit flex flex-col'}>
                    <Heading
                        heading={'Product Details'}
                        // paragraph={'Manage your products efficiently with our comprehensive product list.'}
                    />
                    <RoutePathDisplay/>
                </div>
                <ProductInfo/>
        </div>
    )
}