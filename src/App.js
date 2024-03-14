import React, { useEffect, useState } from "react";
import "./App.css";

const disableFEValidation = true;

function App() {
  const initialInputVal = {
    name: "",
    age: "",
    position: "",
    gender: "",
    terms: false,
  };
  const [inputVal, setInputVal] = useState(initialInputVal);
  const [arrList, setArrList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [backendErrors, setBackendErrors] = useState({});

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos`);
      if (!response.ok) {
        throw new Error("Failed to fetch documents");
      }
      const data = await response.json();
      console.log("check response ", data);
      setArrList(data);
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  const handlesubmit = async () => {
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
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            const backendErrors = error.response.data.errors;
            setBackendErrors(backendErrors);
            backendErrors.forEach((error) => {
              setFormErrors((prevErrors) => ({
                ...prevErrors,

                [error.path[0]]: error.message,
              }));
            });

            alert(JSON.stringify(error.response.data.errors));
          } else {
            console.log("Error adding document:-", error);
          }
        }
      }
    } else {
      try {
        await addDocument();
        setInputVal(initialInputVal);
      } catch (error) {
        console.log("Error adding document:-", error);
      }
    }
  };

  const onInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;
    setInputVal((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : val,
    }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const buttonClick = async () => {
    if (editIndex != null) {
      await saveEdit(arrList[editIndex]._id);
    } else {
      handlesubmit();
    }
  };

  const validate = (values) => {
    const errors = {};
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
        setInputVal(initialInputVal);
        console.log(errorMessage)
      } else {
        await fetchDocuments();
        setInputVal(initialInputVal);
        setBackendErrors({});
        setInputVal(initialInputVal);
      }
    } catch (error) {
      console.log("Error adding document:-", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      buttonClick();
    }
  };

  const handleBlur = (name) => {
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const editItem = (index) => {
    setInputVal(arrList[index]);
    setEditIndex(index);
    
  };

  const deleteInput = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
      });
      fetchDocuments();
    } catch (error) {
      console.error("Error deleting document :- ", error);
      alert("Error deleting document:- " + error.message);
    }
  };

  const saveEdit = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputVal),
      });
      setEditIndex(null);
      fetchDocuments();
      setInputVal(initialInputVal);
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Error updating document: " + error.message);
    }
  };


  return (
    <div className="container">
      <div className="left-container">
        <form id="form" onSubmit={handlesubmit} onKeyDown={handleKeyDown}>
          <div className="error-summary">
          
          </div>
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
                    onClick={() => deleteInput(item._id)}
                  >
                    X
                  </button>
                </td>
                <td className="button">
                  {editIndex === index ? (
                    <>
                      <button className="button" onClick={()=>setEditIndex(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button className="button" onClick={() => editItem(index)}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
