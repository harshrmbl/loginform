// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { AppDispatch } from '../store/store';
// import { addTodo, deleteTodo, updateTodo, selectTodos } from '../reducers/index';
// import axios, { AxiosError } from 'axios';
// import './App.scss';
// import { useNavigate } from 'react-router-dom';
// import Mappoint from '../map/mappoint';
// import { MapProvider } from '../map/mapcontext';
// import { Dispatch } from 'redux';

// const disableFEValidation: boolean = true;

// interface InputValues {
//   name: string;
//   age: string;
//   position: string;
//   gender: string;
//   terms: boolean;
// }

// const Home: React.FC = () => {
//   const initialInputVal: InputValues = {
//     name: '',
//     age: '',
//     position: '',
//     gender: '',
//     terms: false,
//   };

//   const [inputVal, setInputVal] = useState<InputValues>(initialInputVal);
//   const todos = useSelector(selectTodos);
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchDocuments();
//   }, []);

//   const fetchDocuments = async (): Promise<void> => {
//     try {
//       const response = await fetch('http://localhost:5000/api/todos');
//       if (!response.ok) {
//         throw new Error('Failed to fetch documents');
//       }
//       const data = await response.json();
//       dispatch(setTodos(data));
//     } catch (error) {
//       console.error('Error fetching document:', error);
//     }
//   };


// const handleSubmit = async (dispatch: Dispatch<any>): Promise<void> => {
//   try {
//     // Reset errors
//     dispatch(setBackendErrors({}));
//     dispatch(setFormErrors({}));

//     // Validation logic
//     if (!disableFEValidation) {
//       const errors = validate(inputVal); // Ensure validate function is defined correctly
//       dispatch(setFormErrors(errors));

//       if (Object.keys(errors).length === 0) {
//         await dispatch(addTodo(inputVal)); // Dispatch addTodo action with inputVal
//         setInputVal(initialInputVal);
//       }
//     } else {
//       await dispatch(addTodo(inputVal)); // Dispatch addTodo action with inputVal
//       setInputVal(initialInputVal);
//     }
//   } catch (error) {
//     console.error('Error adding document:', error);
//     // Handle error if needed
//   }
// };

  


//   const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>): void => {
//     if (event.key === 'Enter') {
//       handleSubmit(dispatch);
//     }
//   };

//   const handleLogout = (): void => {
//     localStorage.removeItem('isLoggedIn');
//     navigate('/');
//   };

//   const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
//     const { name, value, type } = event.target;
//     const val = type === 'checkbox' ? (event.target as HTMLInputElement).checked : value;
//     setInputVal(prevState => ({
//       ...prevState,
//       [name]: type === 'checkbox' ? val : value,
//     }));
//   };



//   return (
//     <div className="container">
//       <div className="left-container">
//         <form id="form" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
//           <div className="input-container">
//             <input
//               type="text"
//               name="name"
//               className="input"
//               placeholder="Enter Name"
//               onChange={onInputChange}
//               value={inputVal.name}
//             />
//             <br />
//             {backendErrors.name && (
//               <span className="error">{backendErrors.name}</span>
//             )}
//             {formErrors.name && (
//               <span className="error">{formErrors.name}</span>
//             )}
//           </div>
//           <div className="input-container">
//             <input
//               type="number"
//               name="age"
//               className="input"
//               placeholder="Enter Age"
//               onChange={onInputChange}
//               value={inputVal.age}
//             />
//             <br />
//             {backendErrors.age && (
//               <span className="error">{backendErrors.age}</span>
//             )}
//             {formErrors.age && <span className="error">{formErrors.age}</span>}
//           </div>
//           <div className="input-container">
//             <select
//               aria-label="Select option"
//               name="position"
//               className="input"
//               onChange={onInputChange}
//               value={inputVal.position}
//             >
//               <option value="">Select Position</option>
//               <option value="Manager">Manager</option>
//               <option value="Developer">Developer</option>
//             </select>
//             <br />
//             {backendErrors.position && (
//               <span className="error">{backendErrors.position}</span>
//             )}
//             {formErrors.position && (
//               <span className="error">{formErrors.position}</span>
//             )}
//           </div>
//           <br />
//           <div>
//             <div className="radioButton">
//               <label htmlFor="male">
//                 <input
//                   id="male"
//                   name="gender"
//                   type="radio"
//                   value="Male"
//                   checked={inputVal.gender === "Male"}
//                   onChange={onInputChange}
//                   onBlur={() => handleBlur("gender")}
//                 />
//                 Male
//               </label>
//             </div>
//             <div className="radioButton">
//               <label htmlFor="female">
//                 <input
//                   id="female"
//                   name="gender"
//                   type="radio"
//                   value="Female"
//                   checked={inputVal.gender === "Female"}
//                   onChange={onInputChange}
//                   onBlur={() => handleBlur("gender")}
//                 />
//                 Female
//               </label>
//               <br />
//             </div>
//             {backendErrors.gender && (
//               <span className="error">{backendErrors.gender}</span>
//             )}
//           </div>
//           <div className="checkbox">
//             <label htmlFor="terms">
//               <input
//                 id="terms"
//                 name="terms"
//                 type="checkbox"
//                 value="checked"
//                 checked={inputVal.terms}
//                 onChange={onInputChange}
//                 onBlur={() => handleBlur("terms")}
//               />
//               Terms And conditions
//             </label>
//             <br />
//             {backendErrors.terms && (
//               <span className="error">{backendErrors.terms}</span>
//             )}
//           </div>
//           <br />
//           <button type="button" className="btn" onClick={buttonClick}>
//             {editIndex != null ? "Update" : "Add Items"}
//           </button>
//         </form>
//       </div>
//       <div className="right-container">
//         <pre>{JSON.stringify(inputVal, undefined, 2)}</pre>
//         <table id="table">
//           <thead className="thdetails">
//             <tr>
//               <td className="value">Name</td>
//               <td className="age">Age</td>
//               <td className="position">Position</td>
//               <td className="gender">Gender</td>
//               <td className="terms">Terms</td>
//               <td className="button">Delete</td>
//               <td className="button">Edit</td>
//             </tr>
//           </thead>
//           <tbody className="tbdetils">
//             {arrList.map((item, index) => (
//               <tr key={index} id="tablerow">
//                 <td className="value">{item.name}</td>
//                 <td className="age">{item.age}</td>
//                 <td className="position">{item.position}</td>
//                 <td className="gender">{item.gender}</td>
//                 <td className="terms">{item.terms.toString()}</td>
//                 <td className="button">
//                   <button
//                     className="button"
//                     onClick={() => item._id && deleteInput(item._id)}
//                   >
//                     X
//                   </button>
//                 </td>
//                 <td className="button">
//                   {editIndex === index ? (
//                     <>
//                       <button onClick={() => setEditIndex(null)}>
//                         Cancel
//                       </button>
//                     </>
//                   ) : (
//                     <button onClick={() => editItem(index)}>
//                       Edit
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button id="Logoutbtn" onClick={handleLogout}>Logout</button>

//         <div className="map-container">
//           <MapProvider>
//             <Mappoint />
//           </MapProvider>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
export{}