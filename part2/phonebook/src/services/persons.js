import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request
    .then(() => console.log(`Deleted post with ID ${id}`))
    .catch((error) =>
      console.error(`Error deleting post with ID ${id}:`, error)
    );
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default { create, remove, update };
