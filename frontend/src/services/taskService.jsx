import axios from "axios";

const API_URL = "http://localhost:8080/api/tasks";

export const createTask = async (taskData) => {
  return await axios.post(API_URL, taskData);
};

// Other CRUD operations (update, delete, get tasks)
