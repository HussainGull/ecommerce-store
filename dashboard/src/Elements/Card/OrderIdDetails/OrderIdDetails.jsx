import {CalendarDays, ChevronDown, CreditCard, Download, Lock, MapPin, Printer, User} from "lucide-react";
import InfoCard from "@/Elements/Card/InfoCard/InfoCard.jsx";
import TextArea from "@/Elements/TextArea/TextArea.jsx";
import DataTable from "@/Elements/DataTable/DataTable.jsx";
import CartTotal from "@/Elements/Card/Cart/CartTotal.jsx";

export default function OrderIdDetails() {

    const cards = [
        {
            icon: User,
            title: "Customer",
            details: [
                {label: "Full Name: Shristi Singh", bold: true},
                {label: "Email: shristi@gmail.com"},
                {label: "Phone: +91 904 231 1212"},
            ],
            buttonLabel: "View profile",
        },
        {
            icon: Lock,
            title: "Order Info",
            details: [
                {label: "Shipping: Next express", bold: true},
                {label: "Payment Method: Paypal"},
                {label: "Status: Pending"},
            ],
            buttonLabel: "Download info",
            buttonIcon: Download,
        },
        {
            icon: MapPin,
            title: "Deliver to",
            details: [
                {label: "Address: Dharam Colony,", bold: true},
                {label: "Palam Vihar, Gurgaon,"},
                {label: "Haryana"},
            ],
            buttonLabel: "View profile",
        },
    ];

    return (
        <>
            <div
                className="w-full max-w-6xl bg-light hover-bg-light rounded-xl shadow-lg p-8 flex flex-col gap-6 mt-10">

                {/* Section 1: Orders ID and Status Tag */}
                <div className="flex items-center gap-5">
                    <h1 className="font-poppins text-2xl font-semibold text-dark">
                        Orders ID: #6743
                    </h1>
                    <div className={"w-[70px] h-[32px] bg-yellow flex items-center justify-center p-3 rounded-md"}>
                    <span
                        className="font-poppins text-dark font-medium text-sm">Pending
                    </span>
                    </div>
                </div>

                {/* Section 2: Date, Change Status, Print, Save Buttons */}
                <div
                    className="flex flex-col md:flex-row items-center justify-between gap-4 py-2 border-b border-gray-200 pb-6">
                    <div
                        className="flex items-center gap-2 text-inter-medium text-dark-gray text-base">
                        <CalendarDays size={18} className="text-gray"/>
                        <span className={'font-poppins'}>Feb 16, 2022 - Feb 20, 2022</span>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Change Status Dropdown (mocked) */}
                        <div className="relative inline-block text-left">
                            <button
                                type="button"
                                className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-dark bg-white border border-light-gray rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Change Status
                                <ChevronDown size={16} className="-mr-1 ml-2 text-dark"/>
                            </button>
                            {/* Dropdown menu content would go here, hidden by default */}
                        </div>

                        {/* Print Button */}
                        <button
                            className="p-2 border border-light-gray rounded-md bg-light hover:bg-gray-50 flex items-center justify-center shadow-sm"
                        >
                            <Printer size={20} className="text-dark"/>
                        </button>

                        {/* Save Button */}
                        <button
                            className="px-4 py-2 bg-blue text-light text-sm font-medium rounded-md hover:bg-blue-700 shadow-sm"
                        >
                            Save
                        </button>
                    </div>
                </div>

                {/* Section 3: Three Info Cards (Customer, Order Info, Deliver to) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((card, idx) => (
                        <InfoCard key={idx} {...card} />
                    ))}
                </div>

                {/* Section 4: Payment Info and Note */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Payment Info Card */}
                    <div
                        className="border-light border border-light-gray rounded-xl p-5 flex flex-col gap-3 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 bg-dark rounded-md flex items-center justify-center">
                                <CreditCard size={20} className="text-light"/>
                            </div>
                            <span
                                className="font-poppins text-base font-semibold text-dark">Payment Info</span>
                        </div>
                        <div className="flex flex-col text-sm text-dark leading-relaxed">
                            <span className="font-semibold font-poppins">Master Card **** **** **** 6557</span>
                            <span className="text-dark font-poppins">Business name: Shristi Singh</span>
                            <span className="text-dark font-poppins">Phone: +91 904 231 1212</span>
                        </div>
                    </div>

                    {/* Note Card */}
                    <div
                        className="border-light border border-light-gray rounded-xl p-5 flex flex-col gap-3 shadow-sm">
                        <span className="font-poppins text-base font-semibold text-dark">Note</span>
                        <TextArea
                            className="w-full h-24 p-3 text-sm text-light-gray bg-gray-50 border border-gray-200 placeholder:text-black rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
                            placeholder="Type some notes"
                        />
                    </div>
                </div>
            </div>

            {/* Order Table */}
            <DataTable/>

            <CartTotal subtotal={1800}/>
        </>

    )
}