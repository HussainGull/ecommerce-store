import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {BlueButton} from "@/Elements/Buttons/BlueButton.jsx";
import InputField from "@/Elements/InputField/InputField.jsx";
import {formFields} from "@/Elements/Form/SignUp/FormFields.js";
import axiosClient from "@/Elements/AxiosClient/AxiosClient.js";
import {showToast} from "@/Elements/Toaster/Toaster.jsx";
import {LinkButton} from "@/Elements/LinkButton/LinkButton.jsx";
import {useDispatch, useSelector} from "react-redux";
import {login} from "@/Redux-Toolkit/Features/Users/Auth/authSlice.js";
import {useNavigate} from "react-router-dom";


export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const user = useSelector(state => state.auth.user)
    // const token = useSelector(state => state.auth.accessToken)
    // const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

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
        },
    });

    // useEffect(() => {
    //     console.log("User: ", user)
    //     console.log("AccessToken: ", token)
    //     console.log("Is Authenticated: ", isAuthenticated)
    // }, [user, isAuthenticated, token]);


    const onSubmit = async (data) => {
        try {
            const payload = {
                fullName: `${data.firstName} ${data.lastName}`,
                email: data.email,
                password: data.password,
            };

            const res = await axiosClient.post("/users/register-user", payload);
            // console.log(res)

            showToast({
                title: "✅ Registration successful!",
                description: "Welcome aboard!",
            });

            const token = res?.data?.data?.accessToken;
            const user = res?.data?.data?.user;

            if (token && user) {
                dispatch(login({user, accessToken: token}));

                setTimeout(() => {
                    navigate("/dashboard");
                }, 3000);
            }

            reset(); // Clear form

        } catch (error) {
            const status = error.response?.status;
            const msg = error.response?.data?.message || error.message;

            if (status === 400) {
                showToast({
                    title: "❌ Invalid Email Format",
                    description: "Don't mess with the format.",
                });
            } else if (status === 409) {
                showToast({
                    title: "❌ Email already registered",
                    description: "Try logging in instead.",
                });
            } else {
                showToast({
                    title: "❌ Registration failed",
                    description: msg,
                });
            }

            // console.error("Register error:", error);
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
                <div className={"flex items-end gap-2"}>
                    <span className={"font-poppins text-sm"}>Already have an Account !</span>
                    <LinkButton
                        to={"/login"}
                        title={"Log In"}/>
                </div>
                <BlueButton type="submit" text="Register"/>
            </form>
        </div>
    );
}
