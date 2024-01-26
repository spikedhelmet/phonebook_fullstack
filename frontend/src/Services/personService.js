import axios from "axios";

const baseUrl = "/api/persons";

function getAll() {
  return axios.get(baseUrl);
}

function createObj(newObject) {
  return axios.post(baseUrl, newObject);
}

function updateNumber(id, newObject) {
  console.log();
  return axios.put(`${baseUrl}/${id}`, newObject);
}

function deleteObj(id) {
  return axios.delete(`${baseUrl}/${id}`);
}

export default {
  getAll: getAll,
  createObj: createObj,
  updateNumber: updateNumber,
  deleteObj: deleteObj,
};
