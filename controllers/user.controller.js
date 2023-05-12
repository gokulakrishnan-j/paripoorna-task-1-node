import UserData from "../models/user.model.js";
import { userMessage } from "../constants/messages/user.js";
import { errorStatusCode } from "../constants/errors/errorStatusCode.js";
import { successCode } from "../constants/successstatuscodes/statusCode.js";
import { collectionClientError } from "../constants/errors/errorMessage.js";
import { response } from "../constants/reusable/response.js";

// Creating a data and storing it in data base
export const creatingUser = async (req, res) => {
  try {
    const users = new UserData(req.body);
    const userDetails = await users.save();

    if (!userDetails) {
      return response(
        res,
        errorStatusCode.clientError,
        collectionClientError.create
      );
    }

    response(res, successCode.success, userMessage.create);
  } catch (err) {
    response(res, errorStatusCode.serverError, err.message);
  }
};

// Editing a particular data it means modifing the data with id
export const editUserDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const editData = await UserData.findByIdAndUpdate(
      { _id: id },
      { $set: req.body }
    );
    if (!editData) {
      return response(
        res,
        errorStatusCode.clientError,
        `${collectionClientError.edit} ${id}`
      );
    }

    response(res, successCode.createdSuccessfully, userMessage.edit);
  } catch (err) {
    response(res, errorStatusCode.serverError, err.message);
  }
};

// Deleting particular data in database
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await UserData.deleteOne({ _id: id });

    if (!deleteUser.deletedCount) {
      return response(
        res,
        errorStatusCode.clientError,
        `${collectionClientError.deletes} ${id}`
      );
    }
    response(res, successCode.success, userMessage.delete);
  } catch (err) {
    response(res, errorStatusCode.serverError, err.message);
  }
};

// Geting data from data base
export const getUserDetails = async (req, res) => {
  try {
    const userDetails = await UserData.find();

    if (!userDetails) {
      return response(
        res,
        errorStatusCode.clientError,
        collectionClientError.get
      );
    }

    response(res, successCode.success, userDetails);
  } catch (err) {
    response(res, errorStatusCode.serverError, err.message);
  }
};
