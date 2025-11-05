import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const  response = await api.post("/auth/login", loginData)
      console.log(response.data);
      dispatch(login(response))
      navigate("/feed")
    } catch (error) {
      console.log("Login failed...");
    }
  };

  return (
    <>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          value={loginData.email}
          className="input"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          value={loginData.password}
          className="input"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button className="btn btn-neutral mt-4" onClick={handleSubmit}>
          Login
        </button>
      </fieldset>
    </>
  );
};

export default Login;
