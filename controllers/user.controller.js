import UserData from "../models/user.model.js";

export const creatingUser = async (request, response) => {
  try {
    const users = new UserData(request.body);
    const userDetails = await users.save();
    console.log(userDetails);
    response.status(201).send({ message: "Created sucessfully" });
  } catch (err) {
    response.status(500).send({ error: err });
  }
};

export const editUserDetails = async (request, response) => {
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

export const deleteUser = async (request, response) => {
  try {
    const { id } = request.params;
    const deleteUser = await UserData.deleteOne({ _id: id });
    response.status(200).send({ message: "Deleted sucessfully" });
  } catch (err) {
    response.status(500).send({ error: err });
  }
};

export const getUserDetails = async (request, response) => {
  try {
    const userDetails = await UserData.find();

    response.send(userDetails);
  } catch (err) {
    response.status(500).send({ error: err });
  }
};
