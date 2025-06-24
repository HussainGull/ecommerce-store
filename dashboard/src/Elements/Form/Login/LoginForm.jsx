import React, {useEffect} from "react";
import {BlueButton} from "@/Elements/Buttons/BlueButton.jsx";
import InputField from "@/Elements/InputField/InputField.jsx";
import {LinkButton} from "@/Elements/LinkButton/LinkButton.jsx";
import {formFields} from "@/Elements/Form/Login/FormFields.js";
import {useForm} from "react-hook-form";
import axiosClient from "@/Elements/AxiosClient/AxiosClient.js";
import {showToast} from "@/Elements/Toaster/Toaster.jsx";
import {login} from "@/Redux-Toolkit/Features/Users/Auth/authSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function LoginForm() {
    // const user = useSelector(state => state.auth.user)
    // const token = useSelector(state => state.auth.accessToken)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // useEffect(() => {
    //     console.log("Redux Auth:", { user, token });
    // }, [user, token]);



    const onSubmit = async (data) => {
        try {
            // console.log("Submitted data:", data); // ✅ Step 1: Log form input

            const res = await axiosClient.post("/users/login", data);

            // console.log("Login response:", res); // ✅ Step 2: Log full server response

            showToast({
                title: "✅ Hey Buddy!",
                description: "Good To See You!",
            });

            const token = res.data?.accessToken;
            const user = res.data?.user;

            // console.log("Token received:", token);
            // console.log("User received:", user);

            if (token && user) {
                dispatch(login({ user, accessToken: token }));
                // console.log("Dispatched login to Redux");

                setTimeout(() => {
                    // console.log("⏳ Navigating to /dashboard...");
                    navigate("/dashboard");
                }, 3000);
            } else {
                // console.warn("No token or user found in response.");
            }

            reset();

        } catch (error) {
            const status = error.response?.status;
            const msg = error.response?.data?.message || error.message;

            // console.error("Login error status:", status);
            // console.error("Login error message:", msg);

            if (status === 400) {
                showToast({
                    title: "❌ Invalid Email Format",
                    description: "Don't mess with the format.",
                });
            } else if (status === 404) {
                showToast({
                    title: "❌ Email Does Not Exist!",
                    description: "Try Signing-Up instead.",
                });
            } else if (status === 401) {
                showToast({
                    title: "❌ Invalid Password",
                    description: msg,
                });
            } else {
                showToast({
                    title: "❌ Login Failed",
                    description: msg,
                });
            }
        }
    };


    return (
        <div className="w-full p-4 sm:p-12 md:p-6 flex flex-col justify-center gap-3">
            <h1 className="font-poppins text-4xl font-semibold mb-4">Log In</h1>
            <p className="font-poppins text-base text-gray-600 mb-6">Forgot Your Password ?</p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                {formFields.map((field) => (
                    <div key={field.name}>
                        <InputField
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            required={field.required}
                            {...register(field.name, {
                                required: field.required,
                                pattern: field.pattern ? {
                                    value: field.pattern,
                                    message: "Invalid format",
                                } : undefined,
                            })}
                        />
                        {errors[field.name] && (
                            <p className="font-poppins text-red text-sm mt-1">
                                {errors[field.name].message || `${field.placeholder} is required`}
                            </p>
                        )}
                        {field.note && (
                            <p className="font-poppins text-light-muted text-xs mt-2">{field.note}</p>
                        )}
                    </div>
                ))}

                <div className="flex items-end gap-2">
                    <span className="font-poppins text-sm">Newbie? Register First!</span>
                    <LinkButton to="/sign-up" title="Sign-Up"/>
                </div>

                <BlueButton type="submit" text="Login"/>
            </form>
        </div>
    );
}