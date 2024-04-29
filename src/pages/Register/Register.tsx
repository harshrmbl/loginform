import React, { useState } from "react";
import { FaEye, FaEyeSlash}from "react-icons/fa"
import "./Register.css";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [backendError, setBackendError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = value.trimStart();
    if (name === "name") {
      setName(sanitizedValue);
    } else if (name === "email") {
      if (!/\s/.test(value)) {
        setEmail(sanitizedValue);
      }
    } else if (name === "password") {
      setPassword(sanitizedValue);
    }
    else if (name === "role") {
      setRole(value);
    }
  };

  const passwordvisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name === "") {
      setNameError("Name cannot be empty.");
      return;
    } else {
      setNameError("");
    }
    if (email === "") {
      setEmailError("Email cannot be empty");
      return;
    } else {
      setEmailError("");
    }
    if (password === "") {
      setPasswordError("Password cannot be empty.");
      return;
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(
        password
      )
    ) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    } else {
      setPasswordError("");
    }

    if (isValidPassword(password) && isValidEmail(email)) {
      try {
        const response = await fetch(`http://localhost:5000/api/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, role }),
        });
        if (response.ok) {
          navigate("/");
        } else {
          const errorMessage = await response.json();
          setBackendError(errorMessage.msg);
          console.log(errorMessage)
        }
      } catch (error) {
        console.log("Error Login Document:- ", error)
      }
    }
  };

  const isValidPassword = (password: string): boolean => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    const hasNoSpace = !/\s/.test(password);
    return (
      password.length >= 8 &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar &&
      hasNoSpace
    );
  };

  const isValidEmail = (email: string): boolean => {
    const emailPattern = /^[^\s]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;
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
            type="text"
            name="name"
            placeholder="Enter Name"
            value={name}
            onChange={handleChange}
          />
          {nameError && <div className="error">{nameError}</div>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={handleChange}
          />
          {emailError && <div className="error">{emailError}</div>}
        </div>
        <>
          <label>Password:</label>
          <div id="passinput">
             <input
             id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Set password"
            value={password}
            onChange={handleChange}
          />
            <button type="button" onClick={passwordvisibility}>
              {showPassword ? <FaEyeSlash/> : <FaEye/>}
            </button></div>
          {passwordError && <div className="error">{passwordError}</div>}
        </>
        <div>
          <label>Role:</label>
          <select
            aria-label="Select option"
            name="role"
            onChange={handleChange}
            value={role}
          >
            <option value="">Select Position</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
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
