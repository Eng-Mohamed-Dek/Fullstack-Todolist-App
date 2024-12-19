import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/input/PasswordInput";
import { validateEmail, validatePassword } from "../../helpers/validations";
import axiosInstance from "../../utils/axiosinstance";
import Navbar from "../../components/Navbar/Navbar";

const SignUp = () => {
  // state to get data from the inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // navigate config
  const navigate = useNavigate();

  // submitting data
  const handleSignUp = async (e) => {
    e.preventDefault();

    //validate name input
    if (!name) {
      setError("Please enter your name");
      return;
    }

    //validate email
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    //validate password
    if (!password) {
      setError("Please enter a password");
      return;
    }

    //validate password
    if (!validatePassword(password)) {
      setError("Password Must at least 8 characters");
      return;
    }

    // then clear the error after validation
    setError("");

    //SignUp API Call
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      // handle login successfull
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (err) {
      // handle login error
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Unexpected error occured, please try again");
      }
    }

    // redirect to login page after successful sign up
    // history.push("/login")
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-20">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">SignUp</h4>
            <input
              name="fullName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              className="input-box"
            />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="input-box"
              name="email"
            />
            {/* password component */}
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <button className="btn" type="submit">
              SignUp
            </button>
          </form>

          {/* show an error if exists  */}
          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

          <p className="text-sm text-center mt-4">
            Already have an account{" "}
            <Link to="/login" className="font-medium text-primary underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
