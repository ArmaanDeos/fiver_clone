import React, { useState, useEffect } from "react";
import "./Login.scss";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const { isLoading, isError } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const creadentials = { username, email, password };
      await login(dispatch, creadentials);
      toast.success("user logged in successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Check if currentUser exists and navigate to homepage
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <div className="login">
      {isLoading ? (
        "Logging..."
      ) : (
        <form onSubmit={submitHandler}>
          {/* Use onSubmit event handler on the form */}
          <h1>Sign in</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="johndoe@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">Password</label>
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={isLoading}>
            Login
          </button>

          {isError && (
            <p style={{ color: "red" }}>Login failed. Please try again.</p>
          )}
        </form>
      )}
    </div>
  );
};

export default Login;
