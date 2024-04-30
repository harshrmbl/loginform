import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const navigate = useNavigate();


  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.trim());
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.trim());
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");


    if (!email) {
      setEmailError("Email in required")
    }
    if (!password) {
      setPasswordError("Password is required");
    }
    if (email && password) {
      console.log("Sending login request:", email, password);
      const response = await fetch(`http://localhost:5000/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      console.log("Login response:", response);

      console.log("It's working")
      if (response.ok) {
        console.log("Login successful");
        localStorage.setItem('isLoggedIn', 'true')
        navigate("/home");
      } else {
        console.error("Login failed");
        alert("Login failed");
      }

    }
  };

  const handleRegisterClick = (): void => {
    navigate("/register")
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="Logcontainer">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your Email"
            onChange={handleEmailChange}
          />
          {emailError && <div className="error">{emailError}</div>}
        </div>
        <div className="Logcontainer">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={handlePasswordChange}
          />
          {passwordError && <div className="error">{passwordError}</div>}
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="register-link">
        <p>Don't have an account? <button id="regbtn" onClick={handleRegisterClick}>Register</button></p>
      </div>
    </div>
  );
};

export default LoginPage;
