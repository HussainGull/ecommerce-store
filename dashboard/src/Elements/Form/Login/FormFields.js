export const formFields = [
    {
        type: "email",
        name: "email",
        placeholder: "Email",
        required: "Email is required",
        validation: {
            required: "Email is required",
            pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address"
            }
        }
    },
    {
        type: "password",
        name: "password",
        placeholder: "Password",
        required: "Password is required",
        validation: {
            required: "Password is required",
            minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
            }
        }
    }
];
