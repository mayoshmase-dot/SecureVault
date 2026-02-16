import * as yup from 'yup'

export const LoginSchema = yup.object({
  email: yup.string().required("Email is required")
  .email("Invalid email format").max(100, "Email is too long"),

  password: yup.string().required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password is long")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[@$!%*?&]/, "Must contain at least one special character")
    .matches(/^(?!.*(.)\1{3,})/, "Password cannot contain repeated characters"),
});
