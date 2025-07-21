import React, { useState } from "react";
import Api from "../../Requests/Api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import 'react-phone-input-2/lib/style.css';
import '../../index.css'
const Register = () => {


  const [formData, setFormData] = useState({
    sponsor: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    // countryCode: "",
    // country: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    if (formData.password !== formData.password_confirmation) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await Api.post("/register", {
        sponsor: formData.sponsor,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        // countryCode: formData.countryCode,
      });
      if (res.status === 201) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    }
  };


  return (
    <div>

      <div className="logo" style={{ textAlign: 'center', padding: '2rem 1rem 1rem' }}>
        <h1>aZen Hub</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)' }}>Sign up to continue</p>
      </div>

      <div
        className="login-form"
       
        style={{ padding: '0 1.5rem' }}
      >
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name"value={formData.name}
                              onChange={handleChange} placeholder="enter your name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Username</label>
          <input type="text" id="username" name="sponsor"value={formData.sponsor}
                              onChange={handleChange} placeholder="enter your sponsor" required />
        </div>
        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Phone</label>
          <input type="number" id="phone" name="phone"value={formData.phone}
                              onChange={handleChange} placeholder="enter your phone" required />
        </div>
        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email"value={formData.email}
                              onChange={handleChange} placeholder="enter your email" required />
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password"value={formData.password}
                              onChange={handleChange} placeholder="enter your password" required />
        </div>

        {/* Confirm Password Field */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="password_confirmation"
            value={formData.password_confirmation}
                              onChange={handleChange}
            placeholder="enter your confirm password"
            required
          />
        </div>

        <button  className="login-btn" onClick={handleRegister} >Register</button>
      </div>


      <div className="footer-text" style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
        Don’t have an account? <a href="/">Login</a>
      </div>
    </div>
  );
};

export default Register;
