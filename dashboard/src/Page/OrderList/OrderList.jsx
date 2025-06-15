import DataTable from "@/Elements/DataTable/DataTable.jsx";
import AddProductButton from "@/Elements/Buttons/AddProductButton.jsx";
import Heading from "@/Elements/Heading/Heading.jsx";
import RoutePathDisplay from "@/Elements/RoutePathDisplay/RouthPathDisplay.jsx";

export default function OrderList() {
    return (
        <div className={'w-full h-min-screen flex flex-col space-y-4'}>
            <div className={'w-fit flex flex-col'}>
                <Heading
                    heading={'Order List'}
                    // paragraph={'Manage your products efficiently with our comprehensive product list.'}
                />
                <RoutePathDisplay/>
            </div>
            <DataTable/>
        </div>

    )
}