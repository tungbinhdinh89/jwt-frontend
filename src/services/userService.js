import axios from "axios";

const registerNewUser = async (email, phoneNumber, username, password) => {
  return await axios.post("http://localhost:8080/api/v1/register", {
    email,
    phoneNumber,
    username,
    password,
  });
};

export { registerNewUser };