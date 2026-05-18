import * as yup from 'yup'

export const RegisterSchema = (t) => {

  return yup.object({

    name: yup.string()
      .required(t("name_required"))
      .trim()
      .matches(
        /^[A-Za-z\u0600-\u06FF\s]+$/,
        t("name_letters_only")
      ),

    email: yup.string()
      .required(t("email_required"))
      .trim()
      .lowercase()
      .email(t("email_invalid"))
      .max(100, t("email_max")),

    password: yup.string()
      .required(t("password_required"))
      .min(8, t("password_min"))
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
        [yup.ref("password")],
        t("passwords_match")
      )
  })
}