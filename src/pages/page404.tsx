import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleRegisterClick=():void =>{
    navigate("/home")
  }
  return (
    <div>
      <h1>404 Error</h1>
     
      <p>Page Not Found <button id="regbtn" onClick={handleRegisterClick}>Home Page</button></p>
    </div>
  );
};

export default PageNotFound;
