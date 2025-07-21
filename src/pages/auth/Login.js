import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Api from "../../Requests/Api"; // Make sure Api has base URL set

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await Api.post("/login", { email, password });

      if (response.data?.token) {
        const { token, message } = response.data;
        localStorage.setItem("authToken", token);
        toast.success(message || "Login successful");
        navigate("/dashboard");
      } else {
        toast.error(response.data?.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      console.error("Login error:", error.response?.data);
    }
  };

  return (
    <div>
      <div className="logo" style={{ textAlign: 'center', padding: '2rem 1rem 1rem' }}>
        <h1>aZen Hub</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)' }}>Sign in to continue</p>
      </div>

      <form className="login-form" onSubmit={handleLogin} style={{ padding: '0 1.5rem' }}>
        <div className="form-group">
          <label htmlFor="email">Username</label>
          <input
            type="text"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email or username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
      <Link to="/forgot-password" style={{ textDecorationLine:'none'}}>
      
        <p style={{
          textAlign: 'right',
          fontSize: '14px',
        color: '#333',
       
          fontFamily: 'Arial, sans-serif',
          marginLeft: '20px'
        }}>
          Reset Password  
        </p></Link>
        <button type="submit" className="login-btn">Login</button>
      </form>

      <div className="footer-text" style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
        Don’t have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Login;
