import axios from "../setup/axios";

const registerNewUser = async (email, phone, username, password) => {
  return await axios.post("/api/v1/register", {
    email,
    phone,
    username,
    password,
  });
};

const loginUser = async (valueLogin, password) => {
  return await axios.post("/api/v1/login", {
    valueLogin,
    password,
  });
};

const fetchAllUser = (page, limit) => {
  return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
};

const deleteUser = (user) => {
  return axios.delete("/api/v1/user/delete", {
    data: { id: user.id },
  });
};

const updateUser = (user) => {
  return axios.put("/api/v1/user/edit", {
    ...user,
  });
};

const createNewUser = (user) => {
  return axios.post("/api/v1/user/create", { ...user });
};

const fetchGroupList = () => {
  return axios.get("/api/v1/group/read");
};
export {
  registerNewUser,
  loginUser,
  fetchAllUser,
  deleteUser,
  updateUser,
  fetchGroupList,
  createNewUser,
};
