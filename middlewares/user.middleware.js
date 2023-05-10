import { isValidEmail } from "../constants/validations/email.validation.js";
import { departmentValidation } from "../constants/validations/department.validation.js";
import { userErrorMessage } from "../constants/errors/errorMessage.error.js";

export const validation = (request, response, next) => {
  try {
    if (!request.body.name) {
      return response.status(400).send(userErrorMessage.name);
    }

    if (!request.body.email) {
      return response.status(400).send(userErrorMessage.email);
    } else if (!isValidEmail(request.body.email)) {
      return response.status(400).send(userErrorMessage.emailValidation);
    }

    if (!request.body.age) {
      return response.status(400).send(userErrorMessage.age);
    } else if (request.body.age > 100 && request.body.age < 1) {
      return response.status(400).send(userErrorMessage.ageValidation);
    }

    if (!request.body.branch) {
      return response.status(400).send(userErrorMessage.branch);
    }

    if (!request.body.gender) {
      return response.status(400).send(userErrorMessage.gender);
    }

    if (!request.body.department || request.body.department.length < 1) {
      return response.status(400).send(userErrorMessage.department);
    } else if (
      !departmentValidation.has(request.body.department[0].toLowerCase()) ||
      (request.body.department[1] !== undefined
        ? !departmentValidation.has(request.body.department[1].toLowerCase())
        : null)
    ) {
      return response.status(400).send(userErrorMessage.departmentValidation);
    }
  } catch (err) {
    response.status(500).send(err);
  }
  next();
};
