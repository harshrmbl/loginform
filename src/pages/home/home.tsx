import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import "./App.scss";
import { useNavigate } from "react-router-dom";
//import MapComponent from "./map/main";
import Mappoint from "../map/mappoint";
import { MapProvider } from "../map/mapcontext";

const disableFEValidation: boolean = true;

interface InputValues {
  _id?: string;
  name: string;
  age: string;
  position: string;
  gender: string;
  terms: boolean;
}

const Home: React.FC = () => {
  const initialInputVal: InputValues = {
    name: "",
    age: "",
    position: "",
    gender: "",
    terms: false,
  };

  const [inputVal, setInputVal] = useState<InputValues>(initialInputVal);
  const [arrList, setArrList] = useState<InputValues[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [backendErrors, setBackendErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();


  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:5000/api/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch documents");
      }
      const data = await response.json();
      setArrList(data);
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    setBackendErrors({});
    if (!disableFEValidation) {
      const errors = validate(inputVal);
      setFormErrors(errors);

      if (Object.keys(errors).length === 0) {
        try {
          await addDocument();
          setFormErrors({});
          setInputVal(initialInputVal);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const backendErrors = error.response?.data.errors;
            if (backendErrors) {
              setBackendErrors(backendErrors);
              console.log(backendErrors);
              alert(JSON.stringify(backendErrors));
            }
          } else {
            console.log("Error adding document:", error);
          }
        }
      }
    } else {
      try {
        await addDocument();
        setInputVal(initialInputVal);
      } catch (error) {
        console.log("Error adding document:", error);
      }
    }
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value, type } = event.target as HTMLInputElement;
    const val = type === "checkbox" ? (event.target as HTMLInputElement).checked : value;
    setInputVal((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? val : value
    }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const buttonClick = async (): Promise<void> => {
    if (editIndex !== null) {
      await saveEdit(arrList[editIndex]._id);
    } else {
      handleSubmit();
    }
  };

  const validate = (values: InputValues): Record<string, string> => {
    const errors: Record<string, string> = {};
    const nameRegExp = /^[a-zA-Z\s]+$/;
    if (!values.name.trim()) {
      errors.name = "Name is required";
    } else if (!nameRegExp.test(values.name)) {
      errors.name = "Only alphabets are allowed";
    }
    if (!values.age) {
      errors.age = "Enter your age";
    }
    if (!values.position) {
      errors.position = "Position is to be checked";
    }
    if (!values.gender) {
      errors.gender = "Select the gender";
    }
    if (!values.terms) {
      errors.terms = "Terms to be checked";
    }
    return errors;
  };

  const addDocument = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputVal),
      });
      if (!response.ok) {
        const errorMessage = await response.json();
        setBackendErrors(errorMessage.message);
        console.log(errorMessage)
      } else {
        await fetchDocuments();
        setInputVal(initialInputVal);
        setBackendErrors({});
      }
    } catch (error) {
      console.log("Error adding document:-", error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>): void => {
    if (event.key === "Enter") {
      buttonClick();
    }
  };

  const handleBlur = (name: string): void => {
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const editItem = (index: number): void => {
    setInputVal(arrList[index]);
    setEditIndex(index);
  };

  const deleteInput = async (id: string): Promise<void> => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      fetchDocuments();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log("Error deleting deocument", axiosError)
        alert(axiosError.message);
      }
      else {
        console.error("Error deleting document:", error);
        alert("Error deleting document");
      }
    }
  };

  const saveEdit = async (id?: string): Promise<void> => {
    try {
      const response = await axios.put(`http://localhost:5000/api/todos/${id || inputVal._id}`, inputVal, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.status !== 200) {
        throw new Error("Failed to update document");
      }
      else {
        setEditIndex(null);
        fetchDocuments();
        setInputVal(initialInputVal);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("Error updating document:", axiosError);
        alert("Error updating document: " + axiosError.message);
      } else {
        console.error("Unknown error occurred while updating document:", error);
        alert("Unknown error occurred while updating document");
      }
    }
  };

  const handleLogout = (): void => {
    localStorage.removeItem('isLoggedIn');
    navigate("/");
  };


  return (
    <div className="container">
      <div className="left-container">
        <form id="form" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <div className="input-container">
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Enter Name"
              onChange={onInputChange}
              value={inputVal.name}
            />
            <br />
            {backendErrors.name && (
              <span className="error">{backendErrors.name}</span>
            )}
            {formErrors.name && (
              <span className="error">{formErrors.name}</span>
            )}
          </div>
          <div className="input-container">
            <input
              type="number"
              name="age"
              className="input"
              placeholder="Enter Age"
              onChange={onInputChange}
              value={inputVal.age}
            />
            <br />
            {backendErrors.age && (
              <span className="error">{backendErrors.age}</span>
            )}
            {formErrors.age && <span className="error">{formErrors.age}</span>}
          </div>
          <div className="input-container">
            <select
              aria-label="Select option"
              name="position"
              className="input"
              onChange={onInputChange}
              value={inputVal.position}
            >
              <option value="">Select Position</option>
              <option value="Manager">Manager</option>
              <option value="Developer">Developer</option>
            </select>
            <br />
            {backendErrors.position && (
              <span className="error">{backendErrors.position}</span>
            )}
            {formErrors.position && (
              <span className="error">{formErrors.position}</span>
            )}
          </div>
          <br />
          <div>
            <div className="radioButton">
              <label htmlFor="male">
                <input
                  id="male"
                  name="gender"
                  type="radio"
                  value="Male"
                  checked={inputVal.gender === "Male"}
                  onChange={onInputChange}
                  onBlur={() => handleBlur("gender")}
                />
                Male
              </label>
            </div>
            <div className="radioButton">
              <label htmlFor="female">
                <input
                  id="female"
                  name="gender"
                  type="radio"
                  value="Female"
                  checked={inputVal.gender === "Female"}
                  onChange={onInputChange}
                  onBlur={() => handleBlur("gender")}
                />
                Female
              </label>
              <br />
            </div>
            {backendErrors.gender && (
              <span className="error">{backendErrors.gender}</span>
            )}
          </div>
          <div className="checkbox">
            <label htmlFor="terms">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                value="checked"
                checked={inputVal.terms}
                onChange={onInputChange}
                onBlur={() => handleBlur("terms")}
              />
              Terms And conditions
            </label>
            <br />
            {backendErrors.terms && (
              <span className="error">{backendErrors.terms}</span>
            )}
          </div>
          <br />
          <button type="button" className="btn" onClick={buttonClick}>
            {editIndex != null ? "Update" : "Add Items"}
          </button>
        </form>
      </div>
      <div className="right-container">
        <pre>{JSON.stringify(inputVal, undefined, 2)}</pre>
        <table id="table">
          <thead className="thdetails">
            <tr>
              <td className="value">Name</td>
              <td className="age">Age</td>
              <td className="position">Position</td>
              <td className="gender">Gender</td>
              <td className="terms">Terms</td>
              <td className="button">Delete</td>
              <td className="button">Edit</td>
            </tr>
          </thead>
          <tbody className="tbdetils">
            {arrList.map((item, index) => (
              <tr key={index} id="tablerow">
                <td className="value">{item.name}</td>
                <td className="age">{item.age}</td>
                <td className="position">{item.position}</td>
                <td className="gender">{item.gender}</td>
                <td className="terms">{item.terms.toString()}</td>
                <td className="button">
                  <button
                    className="button"
                    onClick={() => item._id && deleteInput(item._id)}
                  >
                    X
                  </button>
                </td>
                <td className="button">
                  {editIndex === index ? (
                    <>
                      <button onClick={() => setEditIndex(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button onClick={() => editItem(index)}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button id="Logoutbtn" onClick={handleLogout}>Logout</button>

        <div className="map-container">
          <MapProvider>
            <Mappoint />
          </MapProvider>
        </div>
      </div>

    </div>
  );
}

export default Home;
