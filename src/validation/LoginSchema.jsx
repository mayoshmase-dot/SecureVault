import * as yup from 'yup'

export const LoginSchema = (t) => {
  return yup.object({
    email: yup
      .string()
      .required(t("email_required"))
      .email(t("email_invalid")),

    password: yup
      .string()
      .required(t("password_required"))
  })
}