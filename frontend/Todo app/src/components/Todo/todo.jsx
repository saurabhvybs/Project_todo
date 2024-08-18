import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import todoAxiosInstance from "../../api/todoaxiosInstance";
import { useDispatch, useSelector } from "react-redux";
import {
  setTodos,
  addTodo,
  updateTodo,
  removeTodo,
} from "../../features/todo/todoSlice"; 

export default function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null); // Track the todo being edited
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const email = localStorage.getItem("email"); // Ensure userEmail is set during login

  useEffect(() => {
      let isMounted =true;
    const fetchTodos = async () => {
      try {
        const response = await todoAxiosInstance.get(`/todos/${email}`);
        if(isMounted){
          if (response.data.list && response.data.list.length > 0) {
            dispatch(setTodos(response.data.list));
          } else {
            toast.info("No todos found"); // Optional: Notify the user if the list is empty
          }
        }
      }
       catch (error) {
        console.log(" response is :",response.data)
        toast.error("Failed to fetch todos");
      }
    };

    fetchTodos();

    return () => {
      isMounted = false;
    };
  }, [email, dispatch]);

  const handleAddTodo = async () => {
    if (title && description) {
      try {
        if (editingId) {
          // If editing, update the existing todo
          const response = await todoAxiosInstance.put(`/update/${editingId}`, {
            title,
            description,
            email,
          });
          dispatch(
            updateTodo({
              id: editingId,
              updatedTodo: response.data,
            })
          );
          toast.success("Todo updated successfully");
          setEditingId(null); // Reset editing state
        } else {
          // If not editing, add a new todo
          try {
            const response = await todoAxiosInstance.post("/addtodo", {
              title,
              description,
              email,
            });
            console.log("Add Response:", response.data);
            dispatch(addTodo(response.data));
            toast.success("Todo added successfully");
          } catch (error) {
            console.error("Error:", error);
            toast.error("blunder");
          }
        }
        setTitle("");
        setDescription("");
      } catch (error) {
        toast.error("Failed to add or update todo");
      }
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoAxiosInstance.delete(`/delete/${id}`, { data: { email } });
      dispatch(removeTodo(id));
      toast.success("Todo deleted successfully");
    } catch (error) {
      toast.error("Failed to delete todo");
    }
  };

  const startEditingTodo = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditingId(todo._id); // Set the id of the todo being edited
    toast.info("Edit your todo and click Add Todo to save changes");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <ToastContainer />
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Add a Todo
        </h2>
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
          onClick={handleAddTodo}
          className="w-full bg-orange-700 text-white font-semibold p-2 rounded-md hover:bg-orange-800"
        >
          Add Todo
        </button>
      </div>

      <div>
        {Array.isArray(todos) && todos.map((todo) => (
            <div
              key={todo._id}
              className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {todo.title}
                </h3>
                <p className="text-gray-600">{todo.description}</p>
              </div>
              <div className="flex space-x-2">
                <FaEdit
                  onClick={() => startEditingTodo(todo)}
                  className="text-gray-600 size-5 hover:text-orange-600 cursor-pointer"
                />
                <RiDeleteBinLine
                  onClick={() => handleDeleteTodo(todo._id)}
                  className="text-gray-600 size-5 hover:text-orange-700 cursor-pointer"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
