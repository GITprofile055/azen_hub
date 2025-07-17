

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from "../../components/AuthContext";

import Api from "../../Requests/Api";

const Setting = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");

        toast.success("Logout successful");

        navigate("/login");
    };


    const [userDetails, setUserDetails] = useState(null);
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const response = await Api.get('/user');
            setUserDetails(response.data); // This should be your user object
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    return (

        <div className="settings-page">
            <div className="top-bar">
                <span className="back-arrow">←</span>
                <h2>Setting</h2>
            </div>

            <div className="content">
                <div className="email">Email: {userDetails?.email}</div>

                 <div className="setting-item">
                    <span>Account Password</span>
                    <Link to="/change-password">
                    <span className="edit">Edit ›</span></Link>
                </div> 

                <div className="setting-item">
                    <span>Payment Password</span>
                    <Link to="/payment-password">
                    <span className="edit">Edit ›</span>
                    </Link>
                </div>

                <div className="setting-item link">Privacy Policy</div>
                <div className="setting-item link">User Agreement</div>

                <div className="setting-item">
                    <span>Version</span>
                    <span className="edit">v1.5.1</span>
                </div>

                <div className="buttons">
                    <button className="logout" onClick={handleLogout}>Log out</button>
                    <button className="deregister">Deregister Account</button>
                </div>
            </div>
        </div>
    );
};

export default Setting;
