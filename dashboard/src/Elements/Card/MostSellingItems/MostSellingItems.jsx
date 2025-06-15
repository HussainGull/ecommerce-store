import {EllipsisVertical} from 'lucide-react'
import {BlueButton} from "@/Elements/Buttons/BlueButton.jsx";
import CustomScroller from "@/Elements/Scroller/CustomScroller.jsx";
import Boundary from "@/Elements/Boundary/Boundary.jsx";


export default function MostSellingItems() {
    const mostSellingItemsData = [
        {
            id: 1,
            name: "Lorem Ipsum",
            price: "₹126.50",
            sales: 999,
            imageUrl: "https://via.placeholder.com/150"
        },
        {
            id: 2,
            name: "Dolor Sit Amet",
            price: "₹150.00",
            sales: 750,
            imageUrl: "https://via.placeholder.com/150"
        },
        {
            id: 3,
            name: "Consectetur Adipiscing",
            price: "₹200.00",
            sales: 500,
            imageUrl: "https://via.placeholder.com/150"
        },
        {
            id: 4,
            name: "Consectetur Adipiscing",
            price: "₹200.00",
            sales: 500,
            imageUrl: "https://via.placeholder.com/150"
        },
        {
            id: 5,
            name: "Consectetur Adipiscing",
            price: "₹200.00",
            sales: 500,
            imageUrl: "https://via.placeholder.com/150"
        }, {
            id: 6,
            name: "Consectetur Adipiscing",
            price: "₹200.00",
            sales: 500,
            imageUrl: "https://via.placeholder.com/150"
        }, {
            id: 7,
            name: "Consectetur Adipiscing",
            price: "₹200.00",
            sales: 500,
            imageUrl: "https://via.placeholder.com/150"
        },
    ]
    return (
        <div className="w-full xl:h-full h-[550px] bg-light rounded-xl p-4 sm:p-6 shadow-lg flex flex-col gap-4">

            <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-[var(--color-primary-dark)]">Most Selling</h3>
                <EllipsisVertical/>
            </div>

            <Boundary className="mt-1"/>

            <CustomScroller>
                {/* Scrollable list */}
                <div className="flex flex-col gap-4 overflow-y-auto flex-grow min-h-0">
                    {mostSellingItemsData.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4"
                        >
                            <div className="w-16 h-16 bg-[var(--color-dark-gray)] rounded-lg flex-shrink-0"/>

                            <div className="flex flex-col flex-grow sm:ml-4">
                                <span
                                    className="text-base font-medium text-[var(--color-primary-dark)]">{item.name}</span>
                                <span className="text-sm text-[var(--color-text-subtle)]">{item.price}</span>
                            </div>

                            <div className="flex flex-row sm:flex-col items-end sm:items-end justify-between">
                                <span
                                    className="text-base font-semibold text-[var(--color-primary-dark)]">{item.price}</span>
                                <span className="text-sm text-[var(--color-text-subtle)]">{item.sales}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CustomScroller>

            <BlueButton
                type="submit"
                text="REPORT"
                ArrowRightIcon={false}
                className="w-full sm:w-fit self-end"
            >
                REPORT
            </BlueButton>
        </div>

    )
}