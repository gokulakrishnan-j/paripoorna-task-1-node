import UserData from "../model/user.model.js";

export function creatingUser() {
  return async function (request, response) {
    try {
      const users = new UserData(request.body);
      const userDetails = await users.save();
      response.status(201).send({ message: "Created sucessfully" });
    } catch (err) {
      response.status(500).send({ error: err });
    }
  };
}
export function editUserDetails() {
  return async function (request, response) {
    try {
      const { id } = request.params;

      const editData = await UserData.findByIdAndUpdate(
        { _id: id },
        { $set: request.body }
      );
      response.status(201).send({ message: "Modified sucessfully" });
    } catch (err) {
      response.status(500).send({ error: err });
    }
  };
}
export function deleteUser() {
  return async function (request, response) {
    try {
      const { id } = request.params;
      const deleteUser = await UserData.deleteOne({ _id: id });
      response.status(200).send({ message: "Deleted sucessfully" });
    } catch (err) {
      response.status(500).send({ error: err });
    }
  };
}
export function getUserDetails() {
  return async function (request, response) {
    try {
      const userDetails = await UserData.find();

      response.send(userDetails);
    } catch (err) {
      response.status(500).send({ error: err });
    }
  };
}
