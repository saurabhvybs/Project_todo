import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    todos: []
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload;
        },
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        updateTodo: (state, action) => {
            const { id, updatedTodo } = action.payload;
            const index = state.todos.findIndex(todo => todo._id === id);
            if (index !== -1) {
                state.todos[index] = updatedTodo;
            }
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo._id !== action.payload);
        },
    }
});

export const { setTodos, addTodo, updateTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
