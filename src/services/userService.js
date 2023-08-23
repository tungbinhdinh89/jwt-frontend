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

const deleteUser = (user) => {
  return axios.delete("http://localhost:8080/api/v1/user/delete", {
    data: { id: user.id },
  });
};

const updateUser = (user) => {
  return axios.put("http://localhost:8080/api/v1/user/edit", {
    data: { id: user.id },
  });
};

const createNewUser = (user)=>{
  return axios.post('http://localhost:8080/api/v1/user/create',{...user})
}

const fetchGroupList = ()=>{
  return axios.get('http://localhost:8080/api/v1/group/read')
}
export { registerNewUser, loginUser, fetchAllUser, deleteUser, updateUser, fetchGroupList ,createNewUser};
