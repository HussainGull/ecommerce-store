import React, { useState } from 'react';

export default function PaymentOptions() {
    // State for new payment card details
    const [newCard, setNewCard] = useState({
        cardNumber: '',
        nameOnCard: '',
        expiryDate: '', // Format: MM/YY
        cvv: '',
    });

    // Dummy state for existing payment methods (you'd fetch this from a backend)
    const [existingCards, setExistingCards] = useState([
        { id: 1, type: 'Visa', last4: '1234', expiry: '12/25' },
        { id: 2, type: 'Mastercard', last4: '5678', expiry: '08/24' },
    ]);

    // Handle input changes for the new card form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCard((prevCard) => ({
            ...prevCard,
            [name]: value,
        }));
    };

    // Handle Save Changes (dummy function)
    const handleSaveChanges = (e) => {
        e.preventDefault();
        console.log('New card added/Payment options saved:', newCard);
        // In a real app, you'd send this data to your API
        alert('Payment options saved!');
        // Optionally, add the new card to existingCards and clear the form
        setExistingCards((prev) => [...prev, {
            id: Date.now(), // Unique ID
            type: 'New Card', // Determine type based on card number
            last4: newCard.cardNumber.slice(-4),
            expiry: newCard.expiryDate
        }]);
        setNewCard({ cardNumber: '', nameOnCard: '', expiryDate: '', cvv: '' });
    };

    // Handle Cancel (dummy function)
    const handleCancel = () => {
        console.log('Payment options changes cancelled.');
        // In a real app, you might reset the form or navigate away
        alert('Changes cancelled!');
        setNewCard({ cardNumber: '', nameOnCard: '', expiryDate: '', cvv: '' }); // Reset form
    };

    return (
        <>
            <h2 className="font-poppins font-medium text-xl  text-error mb-6">My Payment Options</h2>

            {/* Section for Existing Payment Methods (Optional, based on screenshot interpretation) */}
            {existingCards.length > 0 && (
                <div className="mb-8">
                    <h3 className="font-poppins text-base text-dark mb-4">Existing Cards</h3>
                    <div className="space-y-4">
                        {existingCards.map((card) => (
                            <div key={card.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-md bg-gray-50">
                                <span className="font-medium text-gray-800">{card.type} ending in {card.last4}</span>
                                <span className="text-sm text-gray-600">Expires: {card.expiry}</span>
                                {/* Add actions like 'Edit' or 'Remove' here if needed */}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Section to Add New Payment Method */}
            <h3 className="font-poppins text-base text-dark mb-4">Add New Card</h3>
            <form onSubmit={handleSaveChanges} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Card Number */}
                <div className="md:col-span-2">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number*
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={newCard.cardNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-24" // Added pr for icons
                            placeholder="XXXX XXXX XXXX XXXX"
                            maxLength="19" // Max length for typical card numbers with spaces
                        />
                        {/* Placeholder for card type icons */}
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
                            <img src="https://placehold.co/30x20/E0E0E0/555555?text=Visa" alt="Visa" className="h-4 w-auto" />
                            <img src="https://placehold.co/30x20/E0E0E0/555555?text=MC" alt="Mastercard" className="h-4 w-auto" />
                            <img src="https://placehold.co/30x20/E0E0E0/555555?text=Amex" alt="Amex" className="h-4 w-auto" />
                        </div>
                    </div>
                </div>

                {/* Name on Card */}
                <div className="md:col-span-2">
                    <label htmlFor="nameOnCard" className="block font-poppins text-base text-dark mb-2">
                        Name on Card*
                    </label>
                    <input
                        type="text"
                        id="nameOnCard"
                        name="nameOnCard"
                        value={newCard.nameOnCard}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Full Name"
                    />
                </div>

                {/* Expiry Date */}
                <div>
                    <label htmlFor="expiryDate" className="block font-poppins text-base text-dark mb-2">
                        Expiry Date* (MM/YY)
                    </label>
                    <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={newCard.expiryDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="MM/YY"
                        maxLength="5" // For MM/YY format
                    />
                </div>

                {/* CVV */}
                <div>
                    <label htmlFor="cvv" className="block font-poppins text-base text-dark mb-2">
                        CVV*
                    </label>
                    <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={newCard.cvv}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="XXX"
                        maxLength="4" // For 3 or 4 digit CVV
                    />
                </div>

                {/* Action Buttons */}
                <div className="md:col-span-2 flex justify-end gap-4 mt-6">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-8 py-3 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-8 py-3 bg-error text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </>
    );
}
