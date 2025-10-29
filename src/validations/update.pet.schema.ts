import { genderData, speciesData } from "@/data/data";
import { Gender, Species } from "@/enums";
import * as yup from "yup";

export const UpdatePetSchema = yup.object({
  name: yup
    .string()
    .transform((value) => value.trim())
    .min(2, "Must be at least 2 characters")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, "Numbers and symbols are not allowed")
    .required("Field required"),
  species: yup
    .mixed<Species>()
    .required("Species is required"),
  gender: yup
    .mixed<Gender>()
    .oneOf(Object.values(Gender), "Invalid species")
    .required("Species is required"),
  breed: yup
    .string()
    .transform((value) => value.trim())
    .min(2, "Must be at least 2 characters")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, "Numbers and symbols are not allowed")
    .required("Field required"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .min(0, "Age cannot be negative")
    .max(30, "Age cannot be more than 30")
    .required("Field required"),
  color: yup
    .string()
    .transform((value) => value.trim())
    .min(2, "Must be at least 2 characters")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, "Numbers and symbols are not allowed")
    .required("Field required"),
  address: yup
    .string()
    .transform((value) => value.trim())
    .min(2, "Must be at least 2 characters")
    .required("Field required"),
  phone: yup
    .string()
    .required("Field required")
    .min(7, "Phone number must be at least 7 characters")
    .max(20, "Phone number cannot exceed 20 characters"),
});
