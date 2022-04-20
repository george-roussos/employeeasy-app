import axios from "axios";
const baseUrl = "http://localhost:3001/api/expenses";

const getAllExpenses = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data.expenses);
};

const create = (post) => {
  const request = axios.post(baseUrl, post);
  return request.then((response) => response.data);
};

const editExpense = (newContent, id) => {
  const request = axios.put(`${baseUrl}/${id}`, newContent);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAllExpenses, editExpense, create, remove };
