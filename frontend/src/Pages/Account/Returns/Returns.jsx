import React, { useState } from 'react';

export default function Returns() {
    // Dummy data for past return requests
    const [returns, setReturns] = useState([
        {
            id: 'RET001',
            orderId: 'ORD98765',
            product: 'LCD Monitor',
            status: 'Processing',
            requestDate: '2024-05-20',
            reason: 'Item not as described',
        },
        {
            id: 'RET002',
            orderId: 'ORD12345',
            product: 'Gaming Headset',
            status: 'Completed',
            requestDate: '2024-04-15',
            reason: 'Changed my mind',
        },
        {
            id: 'RET003',
            orderId: 'ORD54321',
            product: 'Wireless Keyboard',
            status: 'Rejected',
            requestDate: '2024-03-01',
            reason: 'Beyond return period',
        },
    ]);

    // Dummy function to handle initiating a new return
    const handleInitiateNewReturn = () => {
        alert('Initiating a new return request. (This would navigate to a new form)');
        console.log('Initiate new return');
        // In a real application, you would navigate to a return request form
    };

    return (
        <>
            <h2 className="font-poppins text-xl text-error mb-6">My Returns</h2>

            {returns.length === 0 ? (
                <div className="text-center text-gray-600 py-10">
                    <p className="mb-4">You have no past return requests.</p>
                    <button
                        onClick={handleInitiateNewReturn}
                        className="px-8 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                    >
                        Initiate New Return
                    </button>
                </div>
            ) : (
                <>
                    <div className="space-y-6 mb-8">
                        {returns.map((item) => (
                            <div key={item.id} className="p-4 border border-gray-200 rounded-md bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                <div className="flex flex-col">
                                    <span className="font-medium text-gray-900">Return ID: {item.id}</span>
                                    <span className="text-sm text-gray-700">Order: {item.orderId} - {item.product}</span>
                                    <span className="text-xs text-gray-500">Requested on: {item.requestDate}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span
                                        className={`text-sm font-semibold px-3 py-1 rounded-full ${
                                            item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                item.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {item.status}
                                    </span>
                                    <button className="mt-2 text-blue-600 hover:underline text-sm">View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={handleInitiateNewReturn}
                            className="px-8 py-3 bg-error text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                        >
                            Initiate New Return
                        </button>
                    </div>
                </>
            )}
        </>
    );
}
