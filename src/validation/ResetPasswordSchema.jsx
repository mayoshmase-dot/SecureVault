import * as yup from 'yup'

export const ResetPasswordSchema = (t) => {
  return yup.object({

    newPassword: yup.string()
      .required(t("password_required"))
      .min(6, t("password_min_reset"))
      .max(20, t("password_max"))
      .matches(
        /[A-Z]/,
        t("password_uppercase")
      )
      .matches(
        /[a-z]/,
        t("password_lowercase")
      )
      .matches(
        /[0-9]/,
        t("password_number")
      )
      .matches(
        /[@$!%*?&\-+\/.#%^=\(\)_\{\}\[\]:;"'<>,|~]/,
        t("password_special")
      ),

    confirmPassword: yup.string()
      .required(t("confirm_password_required"))
      .oneOf(
        [yup.ref("newPassword")],
        t("passwords_match")
      )
  })
}