import * as yup from "yup";
export const registerSchema = yup.object({
  email: yup.string().email("Email not valid").required("Field required"),
  password: yup
    .string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).+$/, {
      message:
        "La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial, y sin espacios",
    })
    .transform((value) => value.trim())
    .min(6, "Must be at least 6 characters")
    .required("Field required"),
  name: yup
    .string()
    .transform((value) => value.trim())
    .min(2, "Must be at least 2 characters")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, "No se permiten números ni símbolos")
    .required("Field required"),

  lastName: yup
    .string()
    .transform((value) => value.trim())
    .min(2, "Must be at least 2 characters")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, "No se permiten números ni símbolos")
    .required("Field required"),
});
