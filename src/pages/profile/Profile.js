

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Api from "../../Requests/Api"; // your axios instance
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();

  // Fetch user data once
  useEffect(() => {
    fetchUserDetails();
  }, []);
 
  const fetchUserDetails = async () => {
    try {
      const response = await Api.get("/user");
      setUserDetails(response.data); // assumes { name, email } object
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to fetch user data");
    }
  };

  // Input change handler
  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Submit handler
  const handleUpdateProfile = async () => {
    if (!userDetails.name || !userDetails.email) {
      toast.error("Name and email are required!");
      return;
    }

    try {
      const response = await Api.put("/updateProfile", {
        name: userDetails.name,
        email: userDetails.email,
      });

      if (response.data.status === "success") {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Update error:", err.response);
      toast.error(err.response?.data?.message || "Server error");
    }
  };
const backClick = () => {
    navigate(-1);
  };
  return (
<div className="withdraw-container">
  <div className="top-bar">
    <span className="back-icon" onClick={backClick}>&#8592;</span>
    <h3>Update Profile</h3>
    <span></span>
  </div>

  <form
    className="login-form"
    style={{ padding: "0 1.5rem" }}
    onSubmit={(e) => {
      e.preventDefault();
      handleUpdateProfile();
    }}
  >
    {/* Logo */}
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "1.5rem 0",
      }}
    >
      <img
        src="https://api.dicebear.com/8.x/bottts/svg?seed=Bot"
        alt="Ali Bot Logo"
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
        }}
      />
    </div>

    {/* Name Input */}
    <div className="form-group">
      <input
        type="text"
        name="name"
        value={userDetails.name}
        onChange={handleChange}
        required
      />
    </div>

    {/* Email Input */}
    <div className="form-group">
      <input
        type="email"
        name="email"
        value={userDetails.email}
        onChange={handleChange}
        required
      />
    </div>

    <button type="submit" className="login-btn">
      Update
    </button>
  </form>
</div>

 
  );
};

export default Profile;
