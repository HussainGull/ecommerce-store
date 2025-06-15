import {ArrowDown, EllipsisVertical} from "lucide-react";

export function StatCard({index, card}) {
    return (
        <div
            key={index}
            className="w-full max-w-[280px] h-[170px] justify-between bg-light rounded-xl px-5 py-6 shadow-md flex flex-col">

            <div className="flex justify-between items-center mb-2">
                <h3 className="text-md font-bold text-dark font-poppins">Total Orders</h3>
                <EllipsisVertical className={'w-6 h-6 '}/>
            </div>

            <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue">
                    {card.icon}
                </div>

                <div className="flex flex-col flex-grow">
                    <div className="flex items-center justify-between">
                        <span className="font-poppins text-lg font-bold text-dark">₹126.500</span>
                        <div
                            className="font-poppins flex items-center text-green-500 font-medium text-base">
                            <ArrowDown/>
                            34.7%
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-xs font-semibold text-dark mt-2 self-end">Compared to Oct 2023</p>

        </div>
    )
}