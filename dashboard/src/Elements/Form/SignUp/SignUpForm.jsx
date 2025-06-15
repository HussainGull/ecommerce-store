import React, {useState} from "react";
import {BlueButton} from "@/Elements/Buttons/BlueButton.jsx";
import InputField from "@/Elements/InputField/InputField.jsx";

export default function SignUpForm() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        agreeToTerms: false,
        keepLoggedIn: false,
    });

    const formFields = [
        {
            heading: "Your Name",
        },
        {
            type: "text",
            name: "firstName",
            placeholder: "First Name",
            required: true,
        },
        {
            type: "text",
            name: "lastName",
            placeholder: "Last Name",
            required: true,
        },
        {
            heading: "Login Details",
        },
        {
            type: "email",
            name: "email",
            placeholder: "Email",
            required: true,
        },
        {
            type: "password",
            name: "password",
            placeholder: "Password",
            required: true,
            note: "Minimum 8 characters with at least one uppercase, one lowercase, one special character and a number.",
        },
        {
            type: "checkbox",
            name: "agreeToTerms",
            label:
                'By clicking "Log In" you agree to our website.',
            required: true,
        },
        {
            type: "checkbox",
            name: "keepLoggedIn",
            label: "Keep me logged in",
        },
    ];


    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registration data:', formData);
        alert('Registration attempted! Check console for data.');
        // In a real application, you'd send this data to your backend
    };

    return (
        <div className="w-full p-4 sm:p-12 md:p-6 flex flex-col justify-center">
            <h1 className="text-4xl font-poppins font-semibold mb-2">Register</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {formFields.map((field, index) => {
                    if (field.heading) {
                        return (
                            <p key={index} className="font-poppins text-dark font-medium text-lg mt-2">
                                {field.heading}
                            </p>
                        );
                    }

                    if (field.type === "checkbox") {
                        return (
                            <div key={field.name} className="flex items-center mt-2">
                                <input
                                    type="checkbox"
                                    id={field.name}
                                    name={field.name}
                                    checked={formData[field.name]}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                                />
                                <label
                                    htmlFor={field.name}
                                    className="font-poppins ml-2 text-sm text-dark"
                                >
                                    {field.label}
                                </label>
                            </div>
                        );
                    }

                    return (
                        <div key={field.name}>
                            <InputField
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                                required={field.required}
                            />
                            {field.note && (
                                <p className="font-poppins text-gray-500 text-xs mt-2">{field.note}</p>
                            )}
                        </div>
                    );
                })}

                {/* Submit Button */}
                <BlueButton
                    type={'submit'}
                    text={'Register'}
                />
            </form>
        </div>
    )
}