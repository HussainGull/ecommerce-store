import React, {useState} from "react";
import {Input} from "@/Elements/Input/Input.jsx";

export default function Profile() {

    const [profile, setProfile] = useState({
        firstName: 'Md',
        lastName: 'Rimel',
        email: 'rimelllll@gmail.com',
        address: 'Kingston, 5236, United State',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const editProfileData = [
        {
            id: 1,
            title: 'First Name',
        },
        {
            id: 2,
            title: 'Last Name',
        },
        {
            id: 3,
            title: 'Email',
        },
        {
            id: 4,
            title: 'Address',
        },
    ]

    const PasswordChangeData = [
        {
            id: 1,
            title: 'Current Password',
        },
        {
            id: 2,
            title: 'New Password',
        },
        {
            id: 3,
            title: 'Confirm New Password',
        },

    ]

    // Handle input changes
    const handleChange = (e) => {
        const {name, value} = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    // Handle Save Changes (dummy function)
    const handleSaveChanges = (e) => {
        e.preventDefault();
        console.log('Profile saved:', profile);
        // In a real app, you'd send this data to your API
        alert('Profile changes saved!');
    };

    // Handle Cancel (dummy function)
    const handleCancel = () => {
        console.log('Changes cancelled.');
        // In a real app, you might reset the form or navigate away
        alert('Changes cancelled!');
    };

    return (
        <>
            <h2 className="font-poppins text-xl text-error mb-6">Edit Your Profile</h2>

            <form onSubmit={handleSaveChanges} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                {editProfileData.map((item, id) => (
                    <div
                        key={id}
                    >
                        <label htmlFor="firstName" className="block text-sm text-dark mb-2">
                            {item.title}
                        </label>
                        <Input
                            type="text"
                            id="firstName"
                            name="firstName"
                            onChange={handleChange}
                            className="w-full px-4 py-3  rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                ))}


                {/* Password Changes Section */}
                <div className="md:col-span-2 mt-6">
                    <h3 className="font-poppins text-xl font-normal text-dark">Password Changes</h3>
                </div>

                {PasswordChangeData.map((item, id) => (
                    <div
                        className="md:col-span-2"> {/* Spans full width on medium screens */}
                        <label htmlFor="currentPassword" className="sr-only">Current
                            Password</label> {/* Hidden label */}
                        <Input
                            key={id}
                            type="password"
                            name={item.title}
                            value={item.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-[4px] bg-gray-100 text-muted placeholder-text-muted-light focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder={item.title}
                        />
                    </div>
                ))}


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
    )
}