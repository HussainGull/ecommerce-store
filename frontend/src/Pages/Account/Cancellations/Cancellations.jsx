import React, { useState } from 'react';

export default function Cancellations() {
    // Dummy data for past cancellation requests
    const [cancellations, setCancellations] = useState([
        {
            id: 'CAN001',
            orderId: 'ORD78901',
            product: 'Smartwatch X',
            reason: 'Ordered wrong item',
            cancellationDate: '2024-05-25',
            status: 'Confirmed', // Could be 'Pending', 'Confirmed', 'Refunded'
        },
        {
            id: 'CAN002',
            orderId: 'ORD23456',
            product: 'Bluetooth Speaker',
            reason: 'Found a better deal',
            cancellationDate: '2024-05-10',
            status: 'Confirmed',
        },
        {
            id: 'CAN003',
            orderId: 'ORD67890',
            product: 'Wireless Earbuds',
            reason: 'No longer needed',
            cancellationDate: '2024-04-01',
            status: 'Refunded',
        },
    ]);

    // Dummy function to handle viewing cancellation details
    const handleViewDetails = (cancellationId) => {
        alert(`Viewing details for cancellation ID: ${cancellationId}`);
        console.log(`View details for cancellation ID: ${cancellationId}`);
        // In a real application, you would navigate to a detailed cancellation page
    };

    return (
        <>
            <h2 className="font-poppins text-xl font-normal text-error mb-6">My Cancellations</h2>

            {cancellations.length === 0 ? (
                <div className="text-center text-gray-600 py-10">
                    <p className="mb-4">You have no past cancellation requests.</p>
                    <button
                        // This button could link to 'My Orders' page or a general help page
                        onClick={() => alert('Navigating to My Orders to view existing orders.')}
                        className="px-8 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                    >
                        View My Orders
                    </button>
                </div>
            ) : (
                <>
                    <div className="space-y-6 mb-8">
                        {cancellations.map((item) => (
                            <div key={item.id} className="p-4 border border-gray-200 rounded-md bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                <div className="flex flex-col">
                                    <span className="font-medium text-gray-900">Cancellation ID: {item.id}</span>
                                    <span className="text-sm text-gray-700">Order: {item.orderId} - {item.product}</span>
                                    <span className="text-xs text-gray-500">Date: {item.cancellationDate}</span>
                                    <span className="text-xs text-gray-600">Reason: {item.reason}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span
                                        className={`text-sm font-semibold px-3 py-1 rounded-full ${
                                            item.status === 'Confirmed' || item.status === 'Refunded' ? 'bg-green-100 text-green-800' :
                                                'bg-yellow-100 text-yellow-800' // For 'Pending' or other statuses
                                        }`}
                                    >
                                        {item.status}
                                    </span>
                                    <button
                                        onClick={() => handleViewDetails(item.id)}
                                        className="mt-2 text-blue-600 hover:underline text-sm"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Optional: Add a button for general order history or support */}
                    <div className="flex justify-end">
                        <button
                            onClick={() => alert('Navigating to general order history.')}
                            className="px-8 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
                        >
                            View All Orders
                        </button>
                    </div>
                </>
            )}
        </>
    );
}
