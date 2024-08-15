import axios from 'axios';

const API_URL = 'http://localhost:1000/api/v2/login';  // Adjust the port if necessary

export const addTodo = async (todo) => {
    return await axios.post(`${API_URL}/addtodo`, todo);
};

export const updateTodo = async (id, updatedTodo) => {
    return await axios.put(`${API_URL}/update/${id}`, updatedTodo);
};

export const deleteTodo = async (id, email) => {
    return await axios.delete(`${API_URL}/delete/${id}`, { data: { email } });
};

export const getTodos = async (userId) => {
    return await axios.get(`${API_URL}/get/${userId}`);
};
