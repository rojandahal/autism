import { useState } from "react";
import loginBg from "../assets/login-bg.jpeg";
import logoLogin from "../assets/logo-login.png";
import axios from "axios";
import Cookies from "js-cookie";

function TutorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmailHandler = e => {
    setEmail(e.target.value);
    console.log(email);
  };

  const changePasswordHandler = e => {
    setPassword(e.target.value);
    console.log(password);
  };

  const loginHandler = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }
    // Validate the email using the regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@nec\.edu\.np$/;
    emailRegex.test(email)
      ? console.log("Valid email")
      : alert("Invalid email format must be nec.edu.np");

    axios
      .post("http://localhost:3000/api/v1/teacher/login", {
        email: email,
        password: password,
      })
      .then(response => {
        // Store the token in a cookie
        Cookies.set("token", response.data.token, {
          expires: 7,
          sameSite: "none",
          secure: true,
        }); // Expires in 7 days
        Cookies.set("role", "teacher", {
          expires: 7,
          sameSite: "none",
          secure: true,
        });
        // Redirect to the dashboard
        window.location.href = "/";
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <>
      <div className='container'>
        <div className='login-wrapper'>
          <div className='login-left'>
            <img
              src={loginBg}
              className='img-responsive'
              alt=''
            ></img>
          </div>
          <div className='login-right'>
            <div className='logo'>
              <img
                src={logoLogin}
                className='img-responsive'
                alt=''
              ></img>
            </div>
            <div className='login-form'>
              <h3>Tutor Login</h3>
              <div className='form-wrapper'>
                <form action='#'>
                  <input
                    type='text'
                    placeholder='Email or Phone Number'
                    className='form-controller'
                    onChange={changeEmailHandler}
                  ></input>
                  <input
                    type='password'
                    className='form-controller'
                    placeholder='Password'
                    onChange={changePasswordHandler}
                  ></input>
                  {/* <a
                    href='#'
                    className='forget-pass'
                  >
                    Forget Password?
                  </a> */}
                  <button
                    type='submit'
                    className='primary-btn'
                    onClick={loginHandler}
                  >
                    Login
                  </button>
                  <div className='sign-up'>
                    <p>If you have not signed up yet</p>
                    <a
                      href='signup.html'
                      className='primary-btn'
                    >
                      Sign Up
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TutorLogin;
