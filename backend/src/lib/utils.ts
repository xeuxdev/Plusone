import { z } from "zod";

export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/;
const PasswordSchema = z
  .string()
  .regex(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    "Password must contain at least 8 characters, one uppercase, one lowercase, and one number"
  );

export const validatePassword = (password: string): boolean => {
  try {
    PasswordSchema.parse(password);
    return true;
  } catch (error) {
    return false;
  }
};

export const validateEmail = (email: string): boolean => {
  try {
    z.string().email().parse(email.trim());
    return true;
  } catch (error) {
    return false;
  }
};
