

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Api from "../../Requests/Api"; // your axios instance

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
  });

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

  return (
    <div>
      <div
        className="settings-header"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 0",
          borderBottom: "1px solid #ddd",
        }}
      >
        <span
          className="settings-back"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#333",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          ←
        </span>

        <h2
          className="settings-title"
          style={{
            fontSize: "18px",
            fontWeight: "600",
            margin: 0,
            color: "#222",
          }}
        >
          Update Profile
        </h2>
      </div>

      <form className="login-form" style={{ padding: "0 1.5rem" }}onSubmit={(e) => {
        e.preventDefault(); // prevent default form submission
        handleUpdateProfile();
      }}
      >
     

        {/* Password */}
          <div className="form-group">
            <input
              type="text"
          name="name"
          value={userDetails.name}
          onChange={handleChange}
          required
            />
          </div>

        {/* Confirm Password */}
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
