export const formFields = [
    {heading: "Your Name"},
    {
        type: "text",
        name: "firstName",
        placeholder: "First Name",
        required: "First name is required",
    },
    {
        type: "text",
        name: "lastName",
        placeholder: "Last Name",
        required: "Last name is required",
    },
    {heading: "Login Details"},
    {
        type: "email",
        name: "email",
        placeholder: "Email",
        required: "Email is required",
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address",
        },
    },
    {
        type: "password",
        name: "password",
        placeholder: "Password",
        required:
            "Password must be at least 8 characters, include upper/lowercase, number, and special character",
        pattern: {
            value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message:
                "Must be 8+ characters, with uppercase, lowercase, number & special char",
        },
        note:
            "Minimum 8 characters with at least one uppercase, one lowercase, one special character and a number.",
    },
];