import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {BlueButton} from "@/Elements/Buttons/BlueButton.jsx";
import InputField from "@/Elements/InputField/InputField.jsx";
import {formFields} from "@/Elements/Form/SignUp/FormField.js";
import axios from "axios";

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState({});

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            agreeToTerms: false,
            keepLoggedIn: false,
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("/api/v1/users/register-user", data);

            // ✅ Handle successful registration
            console.log("Success:", response.data);
            alert("✅ Registration successful!");
            reset(); // clear form

        } catch (error) {
            // ❌ Handle error
            console.error("Registration error:", error.response?.data || error.message);
            alert(`❌ Error: ${error.response?.data?.message || "Registration failed."}`);
        }
    };

    return (
        <div className="w-full p-4 sm:p-12 md:p-6 flex flex-col justify-center">
            <h1 className="text-4xl font-poppins font-semibold mb-2">Register</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                {formFields.map((field, index) => {
                    if (field.heading) {
                        return (
                            <p
                                key={index}
                                className="font-poppins text-dark font-medium text-lg mt-2"
                            >
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
                                    {...register(field.name, {
                                        required: field.required
                                            ? `${field.label || "This field"} is required.`
                                            : false,
                                    })}
                                    className="h-4 w-4 text-blue bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                                />
                                <label
                                    htmlFor={field.name}
                                    className="font-poppins ml-2 text-sm text-dark"
                                >
                                    {field.label}
                                </label>
                                {errors[field.name] && (
                                    <span className="text-red text-xs ml-2">
                                        {errors[field.name].message}
                                    </span>
                                )}
                            </div>
                        );
                    }

                    if (field.type === "password") {
                        return (
                            <div key={field.name} className="relative">
                                <InputField
                                    type={showPassword[field.name] ? "text" : "password"}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    {...register(field.name, {
                                        required: field.required
                                            ? `${field.placeholder || field.name} is required.`
                                            : false,
                                        pattern: field.pattern || undefined,
                                    })}
                                    className="pr-10"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((prev) => ({
                                            ...prev,
                                            [field.name]: !prev[field.name],
                                        }))
                                    }
                                    className="absolute right-2 top-6 transform -translate-y-1/2 text-xs text-gray-600 hover:text-black"
                                >
                                    {showPassword[field.name] ? "Hide" : "Show"}
                                </button>

                                {errors[field.name] && (
                                    <p className="text-red text-xs mt-1">{errors[field.name].message}</p>
                                )}
                                {field.note && (
                                    <p className="font-poppins text-accent text-xs mt-2">{field.note}</p>
                                )}
                            </div>
                        );
                    } else {
                        return (
                            <div key={field.name}>
                                <InputField
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    {...register(field.name, {
                                        required: field.required
                                            ? `${field.placeholder || field.name} is required.`
                                            : false,
                                        pattern: field.pattern || undefined,
                                    })}
                                />
                                {errors[field.name] && (
                                    <p className="text-red text-xs mt-1">{errors[field.name].message}</p>
                                )}
                                {field.note && (
                                    <p className="font-poppins text-accent text-xs mt-2">{field.note}</p>
                                )}
                            </div>
                        );
                    }
                })}

                <BlueButton type="submit" text="Register"/>
            </form>
        </div>
    );
}
