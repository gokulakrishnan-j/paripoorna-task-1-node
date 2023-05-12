import { isValidEmail } from "../constants/validations/email.js";
import { departmentValidation } from "../constants/validations/department.js";
import {
  userErrorMessage,
  deleteMiddlewareErrorMessage,
  emailUniueErrorMessage,
} from "../constants/errors/errorMessage.js";
import { errorStatusCode } from "../constants/errors/errorStatusCode.js";
import { response, check } from "../constants/reusable/response.js";
import { emailCheck } from "../constants/reusable/response.js";

// Middleware for validation
export const validation = (req, res, next) => {
  const { name, email, age, branch, gender, department } = req.body;
  try {
    if (!name) {
      return response(res, errorStatusCode.clientError, userErrorMessage.name);
    }

    if (!email || !isValidEmail(req.body.email)) {
      if (!email) {
        return response(
          res,
          errorStatusCode.clientError,
          userErrorMessage.email
        );
      }
      return response(
        res,
        errorStatusCode.clientError,
        userErrorMessage.emailValidation
      );
    }

    if (!age || age > 100 || age < 1) {
      if (!age) {
        return response(res, errorStatusCode.clientError, userErrorMessage.age);
      }
      return response(
        res,
        errorStatusCode.clientError,
        userErrorMessage.ageValidation
      );
    }

    if (!branch) {
      return response(
        res,
        errorStatusCode.clientError,
        userErrorMessage.branch
      );
    }

    if (!gender) {
      return response(
        res,
        errorStatusCode.clientError,
        userErrorMessage.gender
      );
    }

    if (
      !department ||
      department.length < 1 ||
      !departmentValidation.has(department[0].toLowerCase()) ||
      (department[1] !== undefined
        ? !departmentValidation.has(department[1].toLowerCase())
        : null)
    ) {
      if (!department || department.length < 1) {
        return response(
          res,
          errorStatusCode.clientError,
          userErrorMessage.department
        );
      }

      return response(
        res,
        errorStatusCode.clientError,
        userErrorMessage.departmentValidation
      );
    }
    next();
  } catch (err) {
    response(res, errorStatusCode.serverError, err.message);
  }
};

export const emailUniqueValidation = async (req, res, next) => {
  try {
    const { email } = req.body;

    const checkingEmail = await emailCheck(email);

    if (checkingEmail) {
      return response(
        res,
        errorStatusCode.clientError,
        `${emailUniueErrorMessage.error}`
      );
    }
    next();
  } catch (err) {
    response(res, errorStatusCode.serverError, err.message);
  }
};
export const deleteValidationMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    const checkingId = await check(id);
    if (!checkingId) {
      return response(
        res,
        errorStatusCode.clientError,
        `${deleteMiddlewareErrorMessage.error}  ${id}`
      );
    }
    next();
  } catch (err) {
    response(res, errorStatusCode.serverError, err.message);
  }
};
