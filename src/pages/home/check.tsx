// import React from 'react';
// import { connect } from 'react-redux';
// import { addDocument, setInputValues } from './actions'; // You'll define these actions
// import axios, { AxiosError } from "axios";
// import "./App.scss";
// import { useNavigate } from "react-router-dom";
// import Mappoint from "./map/mappoint";
// import { MapProvider } from "./map/mapcontext";

// interface InputValues {
//   _id?: string;
//   name: string;
//   age: string;
//   position: string;
//   gender: string;
//   terms: boolean;
// }

// interface HomeProps {
//   inputVal: InputValues;
//   arrList: InputValues[];
//   setInputValues: (values: InputValues) => void;
//   addDocument: (document: InputValues) => void;
// }

// const Home: React.FC<HomeProps> = ({ inputVal, arrList, setInputValues, addDocument }) => {
//   const initialInputVal: InputValues = {
//     name: "",
//     age: "",
//     position: "",
//     gender: "",
//     terms: false,
//   };

//   const [backendErrors, setBackendErrors] = React.useState<Record<string, string>>({});
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     addDocument(inputVal);
//   };

//   const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
//     const { name, value, type } = event.target as HTMLInputElement;
//     const val = type === "checkbox" ? (event.target as HTMLInputElement).checked : value;
//     setInputValues({ ...inputVal, [name]: val });
//   };

//   const handleLogout = (): void => {
//     localStorage.removeItem('isLoggedIn');
//     navigate("/");
//   };

//   return (
//     <div className="container">
//       <div className="left-container">
//         <form id="form" onSubmit={handleSubmit}>
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
//                 />
//                 Female
//               </label>
//               <br />
//             </div>
//           </div>
//           <div className="checkbox">
//             <label htmlFor="terms">
//               <input
//                 id="terms"
//                 name="terms"
//                 type="checkbox"
//                 checked={inputVal.terms}
//                 onChange={onInputChange}
//               />
//               Terms And conditions
//             </label>
//             <br />
//           </div>
//           <br />
//           <button type="submit" className="btn">
//             Add Items
//           </button>
//         </form>
//       </div>
//       <div className="right-container">
//         <button id="Logoutbtn" onClick={handleLogout}>Logout</button>

//         <div className="map-container">
//           <MapProvider>
//             <Mappoint />
//           </MapProvider>
//         </div>
//       </div>
//     </div>
//   );
// }

// const mapStateToProps = (state: { inputVal: InputValues; arrList: InputValues[] }) => ({
//   inputVal: state.inputVal,
//   arrList: state.arrList,
// });

// const mapDispatchToProps = (dispatch: any) => ({
//   setInputValues: (values: InputValues) => dispatch(setInputValues(values)),
//   addDocument: (document: InputValues) => dispatch(addDocument(document)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
export{}