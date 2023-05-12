import { emailRegex } from "./validation.js";

// Email validation
export const isValidEmail = (email) => {
  return String(email).toLowerCase().match(emailRegex);
};
