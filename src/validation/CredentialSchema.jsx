import * as yup from 'yup'

const CATEGORIES = ["Personal", "Work", "Finance", "Social", "Other"];

export const CredentialSchema = yup.object({
  
  title: yup
    .string()
    .required("Title is required")
    .max(100, "Title must be at most 100 characters"),

  username: yup
    .string()
    .required("Username is required"),

  password: yup
    .string()
    .required("Password is required"),

  website: yup
    .string()
    .max(255, "Website must be at most 255 characters")
    .url("Enter a valid URL (e.g. https://example.com)")
    .optional()
    .transform((value) => value === "" ? undefined : value),

  category: yup
    .string()
    .oneOf(CATEGORIES, "Invalid category")
    .optional()
    .transform((value) => value === "" ? undefined : value),

  tags: yup
    .array()
    .of(yup.string())
    .optional(),

  notes: yup
    .string()
    .max(1000, "Notes must be at most 1000 characters")
    .optional()
    .transform((value) => value === "" ? undefined : value),
});