import React from 'react';
import SignUpForm from "@/Elements/Form/SignUp/SignUpForm.jsx";

export default function SignUpPage() {


    return (
        <div className="w-full h-screen bg-gray-100 flex flex-col lg:flex-row">
            {/* Left Section: Image - now takes 60% width on large screens */}
            <div className="relative w-full lg:w-3/5 h-64 lg:h-full flex items-center justify-center overflow-hidden">
                <img
                    src="/src/assets/footballshoes.png" // Placeholder image for demonstration
                    alt="Product or Promotional Image"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right Section: Form - now takes 40% width on large screens */}
            {/* The w-[40%] you had was a fixed pixel-based width, not percentage for lg: */}
            <div className="w-full lg:w-2/5 h-full flex items-center justify-center p-6">
                <SignUpForm onSubmit={() => console.log("User submitted")}/> {/* Your SignUpForm component will render here */}
            </div>
        </div>
    );
}
