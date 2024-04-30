// import React, { useEffect, useState } from "react";
// import axios, { AxiosError } from "axios";
// import "./App.scss";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addTodo, deleteTodo, updateTodo, setTodos } from "./store/reducers/todoReducer";
// import { MapProvider } from "../map/mapcontext";
// import Mappoint from "../map/mappoint";

// const disableFEValidation: boolean = true;

// interface InputValues {
//   _id?: string;
//   name: string;
//   age: string;
//   position: string;
//   gender: string;
//   terms: boolean;
// }

// const Home: React.FC = () => {
//   const dispatch = useDispatch();
//   const todos: InputValues[] = useSelector((state: any) => state.todos);

//   // Rest of your component code...

//   useEffect(() => {
//     fetchDocuments();
//   }, []);

//   const fetchDocuments = async (): Promise<void> => {
//     try {
//       const response = await fetch("http://localhost:5000/api/todos");
//       if (!response.ok) {
//         throw new Error("Failed to fetch documents");
//       }
//       const data = await response.json();
//       dispatch(setTodos(data));
//     } catch (error) {
//       console.error("Error fetching document:", error);
//     }
//   };

//   const handleSubmit = async (): Promise<void> => {
//     // Rest of your handleSubmit function...
//   };

//   // Rest of your component code...

//   return (
//     <div className="container">
//       {/* Your component JSX */}
//     </div>
//   );
// }

// export default Home;
export {}