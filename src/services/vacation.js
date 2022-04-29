import { SERVER } from "../config";
import axios from "axios";
const baseUrl = `${SERVER}vacation`;

const getAllVacation = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data.vacations);
};

const create = (post) => {
  const request = axios.post(baseUrl, post);
  return request.then((response) => response.data);
};

const editVacation = (newContent, id) => {
  const request = axios.put(`${baseUrl}/${id}`, newContent);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAllVacation, editVacation, create, remove };
