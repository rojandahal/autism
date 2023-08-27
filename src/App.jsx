import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import logo from "./assets/logo.png";
import axios from "axios";

function App() {
  const [id, setId] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  // Check if the "token" cookie is present
  const isTokenPresent = Cookies.get("token") !== undefined;
  // If the token is present, redirect to the dashboard
  useEffect(() => {
    if (isTokenPresent) {
      navigate("/dashboard");
      setId(userId().id);
    }
  }, [isTokenPresent]);

  useEffect(() => {
    if (id !== "") {
      getUserDetails();
      console.log(userDetails);
    }
  }, [id]);

  const handleLogoutClick = () => {
    Cookies.remove("token");
    navigate("/");
  };

  const userId = () => {
    const token = Cookies.get("token");
    const tokenParts = token.split(".");
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    const user = JSON.parse(rawPayload);
    return user;
  };

  const getUserDetails = async () => {
    const role = Cookies.get("role");

    if (role === "student") {
      await axios
        .get(`http://localhost:3000/api/v1/auth/me/${id}`)
        .then(response => {
          console.log(response.data);
          setUserDetails(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      await axios
        .get(`http://localhost:3000/api/v1/teacher/getMe/${id}`)
        .then(response => {
          console.log(response.data);
          setUserDetails(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return isTokenPresent ? (
    <>
      <header>
        <div className='container'>
          <div className='logo'>
            <img
              src={logo}
              className='img-responsive'
              alt=''
            ></img>
          </div>
          {userDetails !== null ? (
            <p>
              {userDetails.data.firstname}
              {userDetails.data.lastname}
            </p>
          ) : (
            <></>
          )}
          <div className='logout'>
            <button
              href='/logout'
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <Outlet /> {/* Renders the child routes */}
    </>
  ) : (
    <Outlet />
  );
}

export default App;
