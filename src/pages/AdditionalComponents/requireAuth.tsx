import React, { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../home";

const RequireAuth: React.FC<{ component: ComponentType }> = ({ component: WrappedComponent }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("role");

    if (!isLoggedIn) {
      navigate("/");
    } else if (WrappedComponent === Home && userRole !== "Admin") {
      navigate("/user");
    }
  }, [navigate, WrappedComponent]);

  return <WrappedComponent />;
};

export default RequireAuth;
