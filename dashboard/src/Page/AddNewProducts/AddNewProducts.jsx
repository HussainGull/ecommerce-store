import Heading from "@/Elements/Heading/Heading.jsx";
import RoutePathDisplay from "@/Elements/RoutePathDisplay/RouthPathDisplay.jsx";
import ProductForm from "@/Elements/Form/Product/ProductForm.jsx";

export default function AddNewProducts() {
    return (
        <div className="min-h-screen flex flex-col ">
            <div className={'w-fit flex flex-col'}>
                <Heading
                    heading={'Add New Products'}
                    // paragraph={'Manage your products efficiently with our comprehensive product list.'}
                />
                <RoutePathDisplay/>
            </div>
            <ProductForm
            isDeleteEnable={false}
            />
        </div>
    )
}