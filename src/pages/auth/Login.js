import React, { useState } from "react";
// import {  } from "react-router-dom";

import axios from "axios";

import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Api from "../../Requests/Api";
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();



    try {
      const response = await Api.post("/login", {
        email,
        password
      });
    
      if (response.data?.token) {
        const { token, message } = response.data;
        localStorage.setItem("authToken", token);
        toast.success(message || "Login successful");
        navigate("/dashboard");
      } else {
        toast.error(response.data?.message || "Invalid credentials");
        console.error("Login failed:", response.data);
      }
    
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
    
    
  };


  return (
   <div>
   
    <div className="logo" style={{ textAlign: 'center', padding: '2rem 1rem 1rem' }}>
        <h1>aZen Hub</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)' }}>Sign in to continue</p>
      </div>

      <form className="login-form" action="/login" method="POST" style={{ padding: '0 1.5rem' }}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>

        <button type="submit" className="login-btn">Login</button>
      </form>

      <div className="footer-text" style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
        Don’t have an account? <a href="/register">Register</a>
      </div>
      </div>
  );
};

export default Login;
