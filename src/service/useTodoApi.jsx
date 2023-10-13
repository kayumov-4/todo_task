import api from "./axios";

const useTodoApi = {
  getAll: () => api.get("/todos"),
  addTodo: (data) => api.post(`/todos`, data),
  updateTodo: (id, data) => api.patch(`/todos/${id}`, data),
  deleteTodo: (id) => api.delete(`/todos/${id}`),
};

export default useTodoApi;
