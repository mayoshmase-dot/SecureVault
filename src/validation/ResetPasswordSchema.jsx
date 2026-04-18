import * as yup from 'yup'

export const ResetPasswordSchema = yup.object({
  newPassword: yup.string()
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
    .oneOf([yup.ref("newPassword")], "Passwords must match")
});