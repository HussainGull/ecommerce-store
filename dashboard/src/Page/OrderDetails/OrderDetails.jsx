import Heading from "@/Elements/Heading/Heading.jsx";
import OrderIdDetails from "@/Elements/Card/OrderIdDetails/OrderIdDetails.jsx";
import Table from "@/Elements/Table/Table.jsx";
import OrderTable from "@/Elements/Table/Table.jsx";
import RoutePathDisplay from "@/Elements/RoutePathDisplay/RouthPathDisplay.jsx";


export default function OrderDetails() {
    return (
        <div>
            <div className={'w-fit flex flex-col'}>
                <Heading
                    heading={'Order Details'}
                    // paragraph={'Manage your products efficiently with our comprehensive product list.'}
                />
                <RoutePathDisplay/>
            </div>
            <OrderTable/>
        </div>
    )
}