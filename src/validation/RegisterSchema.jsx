import * as yup from 'yup'
export const RegisterSchema = yup.object({
    fullName: yup.string()
        .required("Full name is required")
        .trim()
        .test(
            "is-triple-name",
            "Enter your full triple name",
            value => {
                if (!value) return false;
                const parts = value.trim().split(/\s+/);
                return parts.length === 3;
            })
            .matches(
            /^[A-Za-z\u0600-\u06FF\s]+$/,
            "Name can only contain letters"),

    email: yup.string().required("Email is required").email("Invalid email format").max(100, "Email is too long"),

    password: yup
        .string()
        .required("Password is required")
        .min(12, "Password must be at least 12 characters")
        .max(128, "Password is too long")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .matches(/[a-z]/, "Must contain at least one lowercase letter")
        .matches(/[0-9]/, "Must contain at least one number")
        .matches(/[@$!%*?&]/, "Must contain at least one special character")
        .matches(/^(?!.*(.)\1{3,})/,"Password cannot contain repeated characters"),

    confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("password")], "Passwords must match")

});
