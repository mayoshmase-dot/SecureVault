import * as yup from 'yup'

export const CredentialSchema = (t) => {

  return yup.object({

    title: yup
      .string()
      .required(t("title_required"))
      .max(100, t("title_max")),

    username: yup
      .string()
      .required(t("username_required")),

    password: yup
      .string()
      .required(t("password_required")),

    website: yup
      .string()
      .max(255, t("website_max"))
      .url(t("website_invalid"))
      .optional()
      .transform((value) =>
        value === "" ? undefined : value
      ),

    category: yup
      .string()
      .optional()
      .transform((value) =>
        value === "" ? undefined : value
      ),

    tags: yup
      .string()
      .optional(),

    notes: yup
      .string()
      .max(1000, t("notes_max"))
      .optional()
      .transform((value) =>
        value === "" ? undefined : value
      ),
  })
}