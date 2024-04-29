import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  /* const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>(""); */
  const [nameError, setNameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [backendError, setBackendError] = useState<string>("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email:'',
    password:''
  });

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target;
    const sanitizedValue = value.replace(/\s/g, '');
    setFormData({...formData, [name]:sanitizedValue})
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {name, email, password} = formData;

    if (name === "") {
      setNameError("Name cannot be empty.");
    } else {
      setNameError("");
    }

    if (password === "") {
      setPasswordError("Password cannot be empty.");
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(
        password
      )
    ) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    } else {
      setPasswordError("");
    }


    if (!isValidEmail(email)) {
      setEmailError("Email cannot be empty");
    } else {
      setEmailError("");
    }

    if (isValidPassword(password) && isValidEmail(email)) {
      const response = await fetch(`http://localhost:5000/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        navigate("/");
      } else {
        const data = await response.json();
        setBackendError(data.message);
        console.log(backendError);
      }
    }
  };

  const isValidPassword = (password: string): boolean => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    const hasNoSpace = !/\s/.test(password);
    return password.length >= 8 && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasNoSpace;
  };

  const isValidEmail = (email: string): boolean => {
    //const emailPattern = /^[a-zA-Z0-9.]+@[a-z]+\.[a-z]+$/;
     const emailPattern = /^[^s]+@[a-zA-Z0-9.-]+\.[a-zA-Z]$/;
    //const emailPattern = /!^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    return emailPattern.test(email);
  };

  const handleLoginClick = (): void => {
    navigate("/");
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
          />
          {nameError && <div className="error">{nameError}</div>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
          {emailError && <div className="error">{emailError}</div>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={formData.password}
            placeholder="Set password"
            onChange={handleChange}
          />
          {passwordError && <div className="error">{passwordError}</div>}
        </div>
        {backendError && <div className="error">{backendError}</div>}
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <button onClick={handleLoginClick}>Login</button>
      </p>
    </div>
  );
};

export default RegisterPage;
