import React, { useState } from 'react';
import {Input} from "@/Elements/Input/Input.jsx";

export default function AddressBook() {
    // State for address book fields
    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        streetAddress: '',
        apartment: '',
        townCity: '',
        stateProvince: '', // Added for completeness
        zipCode: '',       // Added for completeness
        phoneNumber: '',
        emailAddress: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    // Handle Save Changes (dummy function)
    const handleSaveChanges = (e) => {
        e.preventDefault();
        console.log('Address saved:', address);
        // In a real app, you'd send this data to your API
        alert('Address changes saved!');
    };

    // Handle Cancel (dummy function)
    const handleCancel = () => {
        console.log('Address changes cancelled.');
        // In a real app, you might reset the form or navigate away
        alert('Address changes cancelled!');
    };

    return (
        <>
            <h2 className="font-poppins text-xl text-error mb-6">Address Book</h2>

            <form onSubmit={handleSaveChanges} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* First Name */}
                <div>
                    <label htmlFor="ab_firstName" className="block font-poppins text-base text-dark mb-2">
                        First Name*
                    </label>
                    <input
                        type="text"
                        id="ab_firstName"
                        name="firstName"
                        value={address.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder=""
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label htmlFor="ab_lastName" className="block font-poppins text-base text-dark  mb-2">
                        Last Name*
                    </label>
                    <Input
                        type="text"
                        id="ab_lastName"
                        name="lastName"
                        value={address.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder=""
                    />
                </div>

                {/* Company Name */}
                <div className="md:col-span-2"> {/* Spans full width on medium screens */}
                    <label htmlFor="ab_companyName" className="block font-poppins text-base text-dark  mb-2">
                        Company Name (Optional)
                    </label>
                    <Input
                        type="text"
                        id="ab_companyName"
                        name="companyName"
                        value={address.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder=""
                    />
                </div>

                {/* Street Address */}
                <div className="md:col-span-2">
                    <label htmlFor="ab_streetAddress" className="block font-poppins text-base text-dark  mb-2">
                        Street Address*
                    </label>
                    <Input
                        type="text"
                        id="ab_streetAddress"
                        name="streetAddress"
                        value={address.streetAddress}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder=""
                    />
                </div>

                {/* Apartment, floor, etc. (optional) */}
                <div className="md:col-span-2">
                    <label htmlFor="ab_apartment" className="block font-poppins text-base text-dark  mb-2">
                        Apartment, floor, etc. (optional)
                    </label>
                    <Input
                        type="text"
                        id="ab_apartment"
                        name="apartment"
                        value={address.apartment}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder=""
                    />
                </div>

                {/* Town/City */}
                <div>
                    <label htmlFor="ab_townCity" className="block font-poppins text-base text-dark  mb-2">
                        Town/City*
                    </label>
                    <Input
                        type="text"
                        id="ab_townCity"
                        name="townCity"
                        value={address.townCity}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder=""
                    />
                </div>

                {/* State/Province */}
                <div>
                    <label htmlFor="ab_stateProvince" className="block font-poppins text-base text-dark  mb-2">
                        State/Province*
                    </label>
                    <Input
                        type="text"
                        id="ab_stateProvince"
                        name="stateProvince"
                        value={address.stateProvince}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder=""
                    />
                </div>

                {/* Zip Code/Postal Code */}
                <div>
                    <label htmlFor="ab_zipCode" className="block font-poppins text-base text-dark  mb-2">
                        Zip Code/Postal Code*
                    </label>
                    <Input
                        type="text"
                        id="ab_zipCode"
                        name="zipCode"
                        value={address.zipCode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder=""
                    />
                </div>

                {/* Phone Number */}
                <div>
                    <label htmlFor="ab_phoneNumber" className="block font-poppins text-base text-dark  mb-2">
                        Phone Number*
                    </label>
                    <Input
                        type="tel"
                        id="ab_phoneNumber"
                        name="phoneNumber"
                        value={address.phoneNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder=""
                    />
                </div>

                {/* Email Address */}
                <div className="md:col-span-2">
                    <label htmlFor="ab_emailAddress" className="block font-poppins text-base text-dark  mb-2">
                        Email Address*
                    </label>
                    <Input
                        type="email"
                        id="ab_emailAddress"
                        name="emailAddress"
                        value={address.emailAddress}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder=""
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
