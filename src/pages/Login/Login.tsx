import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.trimStart());
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.trimStart());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email in required");
    }
    if (!password) {
      setPasswordError("Password is required");
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log("Login response:", response);
      if (response.ok) {
        const data = await response.json();
        const { token, message, role } = data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        alert(message);

        if (role === "User") {
         localStorage.setItem("isLoggedIn", "true");
          navigate("/user");
        } else if (role === "Admin") {
          localStorage.setItem("isLoggedIn", "true");
          navigate("/home");
        }
      } else {
        console.error("Login failed");
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:-", error);
      alert("Error logging in");
    }
  };

  const handleRegisterClick = (): void => {
    navigate("/register");
  };

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
        <p>
          Don't have an account?{" "}
          <button id="regbtn" onClick={handleRegisterClick}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
