import axios from "axios";

const registerNewUser = async (email, phoneNumber, username, password) => {
  return await axios.post("http://localhost:8080/api/v1/register", {
    email,
    phoneNumber,
    username,
    password,
  });
};

const loginUser = async (valueLogin, password) => {
  return await axios.post("http://localhost:8080/api/v1/login", {
    valueLogin,
    password,
  });
};

const fetchAllUser = (page, limit) => {
  return axios.get(
    `http://localhost:8080/api/v1/user/read?page=${page}&limit=${limit}`
  );
};

export { registerNewUser, loginUser, fetchAllUser };
