import { isValidEmail } from "../constants/validations/email.validation.js";
import { departmentValidation } from "../constants/validations/department.validation.js";
import { errorMessage } from "../constants/errors/errorMessage.error.js";

export const validation = (request, response, next) => {
  if (!request.body.name) {
    return response.status(400).send(errorMessage.name);
  }

  if (!request.body.email) {
    return response.status(400).send(errorMessage.email);
  } else if (!isValidEmail(request.body.email)) {
    return response.status(400).send(errorMessage.emailValidation);
  }

  if (!request.body.age) {
    return response.status(400).send(errorMessage.age);
  } else if (request.body.age > 100 && request.body.age < 1) {
    return response.status(400).send(errorMessage.ageValidation);
  }

  if (!request.body.branch) {
    return response.status(400).send(errorMessage.branch);
  }

  if (!request.body.gender) {
    return response.status(400).send(errorMessage.gender);
  }

  if (!request.body.department || request.body.department.length < 1) {
    return response.status(400).send(errorMessage.department);
  } else if (
    !departmentValidation.has(request.body.department[0].toLowerCase()) ||
    (request.body.department[1] !== undefined
      ? !departmentValidation.has(request.body.department[1].toLowerCase())
      : null)
  ) {
    return response.status(400).send(errorMessage.departmentValidation);
  }

  next();
};
