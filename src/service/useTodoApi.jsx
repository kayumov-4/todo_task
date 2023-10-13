import api from "./axios";

const useTodoApi = {
  getAll: () => api.get("/todos"),
  addTodo: (data) => api.post(`/todos`, data),
  updateTodo: (data) => api.put(`/todos`, data),
};

export default useTodoApi;
