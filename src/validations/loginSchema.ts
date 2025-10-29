import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .transform((value) => value?.trim())
    .email("Email not valid")
    .required("Field required"),
    
  password: yup
    .string()
    .transform((value) => value?.trim())
    .min(6, "Must be at least 6 characters")
    .required("Field required"),
});
