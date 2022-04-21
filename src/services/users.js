import axios from "axios";
const baseUrl = "http://localhost:3001/api/users";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const createUser = (credentials) => {
  const request = axios.post(baseUrl, credentials);
  return request.then((response) => response.data);
};

const removeUser = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

export default { createUser, removeUser, setToken };
