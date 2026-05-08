import * as yup from 'yup'

export const RegisterSchema = yup.object({
  name: yup.string()
    .required("Name is required")
    .trim()
    .matches(
      /^[A-Za-z\u0600-\u06FF\s]+$/,
      "Name can only contain letters"
    ),

  email: yup.string()
    .required("Email is required")
    .trim()
    .lowercase()
    .email("Invalid email format")
    .max(100, "Email is too long"),

  password: yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
.matches(
  /[@$!%*?&\-+\/.#%^=\(\)_\{\}\[\]:;"'<>,|~]/,
  "Must contain at least one special character"
),
  confirmPassword: yup.string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match")
});