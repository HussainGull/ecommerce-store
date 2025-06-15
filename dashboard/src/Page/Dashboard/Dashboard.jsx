import {EllipsisVertical, ArrowDown, ShoppingBag} from 'lucide-react'
import {SalesGraph} from "@/Elements/Graphs/SalesGraph.jsx";
import MostSellingItems from "@/Elements/Card/MostSellingItems/MostSellingItems.jsx";
import DataTable from "@/Elements/DataTable/DataTable.jsx";
import {StatCard} from "@/Elements/Card/StatCard/StatCard.jsx";
import RoutePathDisplay from "@/Elements/RoutePathDisplay/RouthPathDisplay.jsx";
import Heading from "@/Elements/Heading/Heading.jsx";

export default function Dashboard() {

    const statCard = [
        {
            id: 1,
            title: "Total Orders",
            value: "₹126.500",
            change: "34.7%",
            icon: <ShoppingBag className={'text-white'}/>
        },
        {
            id: 2,
            title: "Active Orders",
            value: "₹126.500",
            change: "34.7%",
            icon: <ShoppingBag className={'text-white'}/>
        },
        {
            id: 3,
            title: "Completed Orders",
            value: "₹126.500",
            change: "34.7%",
            icon: <ShoppingBag className={'text-white'}/>
        },
        {
            id: 4,
            title: "Return Orders",
            value: "₹126.500",
            change: "34.7%",
            icon: <ShoppingBag className={'text-white'}/>
        },
    ]

    return (
        <div className={'w-full min-h-screen'}>
            <div className={'w-fit flex flex-col'}>
                <Heading
                    heading={'Dashboard'}
                    // paragraph={'Manage your products efficiently with our comprehensive product list.'}
                />
                <RoutePathDisplay/>
            </div>
            <div className={"w-full flex flex-wrap gap-5 mt-15"}>
                {
                    statCard.map((card, index) => (
                        <StatCard key={index} index={card.id} card={card}/>
                    ))
                }
            </div>
            <div className="w-full flex flex-col xl:flex-row gap-4 mt-10">
                {/* Chart Section: Full width on small screens, flex-grow on desktop */}
                <div className="w-full xl:flex-1">
                    <SalesGraph/>
                </div>

                {/* Report Section: Fixed width on desktop, full width on small screens */}
                <div className="w-full xl:w-[360px]">
                    <MostSellingItems/>
                </div>
            </div>
            <DataTable/>
        </div>
    )
}