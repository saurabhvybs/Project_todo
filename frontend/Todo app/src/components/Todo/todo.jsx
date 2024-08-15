import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTodo = () => {
    if (title && description) {
      const newTodo = { title, description };
      setTodos([...todos, newTodo]);
      toast.success("Todo added successfully");
      setTitle("");
      setDescription("");
    }
  };

  const deleteTodo = (indexToDelete) => {
    setTodos(todos.filter((_, index) => index !== indexToDelete));
    toast.success("Todo deleted Successfully");
  };

  const updateTodo = (indexToUpdate) => {
    const todoToUpdate = todos[indexToUpdate];
    setTitle(todoToUpdate.title);
    setDescription(todoToUpdate.description);
    deleteTodo(indexToUpdate);
    toast.success("Please Update Your Todo !");
  };

  return (
    <div className="max-w-md mx-auto p-4">

      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        
      <ToastContainer/>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add a Todo</h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="w-full bg-orange-700 text-white font-semibold p-2 rounded-md hover:bg-orange-800"
        >
          Add Todo
        </button>
      </div>

      <div>
        {todos.map((todo, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{todo.title}</h3>
              <p className="text-gray-600">{todo.description}</p>
            </div>
            <div className="flex space-x-2">
              <FaEdit
                onClick={() => updateTodo(index)}
                className="text-gray-600 size-5 hover:text-orange-600 cursor-pointer"
              />
              <RiDeleteBinLine
                onClick={() => deleteTodo(index)}
                className="text-gray-600 size-5 hover:text-orange-700 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
