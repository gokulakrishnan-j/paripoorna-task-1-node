import userData from "../../models/user.model.js";

export const response = (res, status, message) => {
  res.status(status).send({ message: message });
};

export async function check(id) {
  const user = await userData.findOne({ _id: id });
  return user;
}

export const emailCheck = async (email) => {
  const userEmail = await userData.findOne({ email: email });
  return userEmail;
};
