import axios from "axios";
const baseUrl = "http://localhost:3001/api/employees";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAllEmployees = () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data.employees);
};

const create = (post) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.post(baseUrl, post, config);
  return request.then((response) => response.data);
};

const editEmployee = (newContent, id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.put(`${baseUrl}/${id}`, newContent, config);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

export default { getAllEmployees, editEmployee, create, remove, setToken };
