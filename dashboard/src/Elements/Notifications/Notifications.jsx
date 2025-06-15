import React from 'react';

// Functional component for displaying notifications
export default function Notifications() {
    // Dummy data for notifications to simulate a list
    const notifications = [
        { id: 1, title: 'Lorem Ipsum', price: '₹140', date: 'Nov 15, 2023', status: 'Sold' },
        { id: 2, title: 'Lorem Ipsum', price: '₹140', date: 'Nov 15, 2023', status: 'Sold' },
        { id: 3, title: 'Lorem Ipsum', price: '₹140', date: 'Nov 15, 2023', status: 'Sold' },
        { id: 4, title: 'Lorem Ipsum', price: '₹140', date: 'Nov 15, 2023', status: 'Sold' },
    ];

    return (
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                {/* Header Section */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800">Notifications</h3>
                    <button
                        aria-label="Close notifications"
                        className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-1"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Notifications List */}
                <div className="py-2">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="flex items-center space-x-4 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                            {/* Placeholder for product image/thumbnail */}
                            <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0"></div>

                            {/* Notification Details */}
                            <div className="flex-grow">
                                <p className="text-base font-medium text-gray-900">{notification.title}</p>
                                <p className="text-sm text-gray-700">{notification.price}</p>
                                <p className="text-xs text-gray-500">{notification.date}</p>
                            </div>

                            {/* Status Badge */}
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {notification.status}
              </span>
                        </div>
                    ))}
                </div>

                {/* Footer Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center p-4 pt-2 space-y-3 sm:space-y-0 sm:space-x-3">
                    {/* Mark All As Read Button */}
                    <button
                        className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md px-3 py-1.5"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1.5 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        MARK ALL AS READ
                    </button>

                    {/* View All Notifications Button */}
                    <button
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 whitespace-nowrap"
                    >
                        VIEW ALL NOTIFICATION
                    </button>
                </div>
            </div>
    );
}

