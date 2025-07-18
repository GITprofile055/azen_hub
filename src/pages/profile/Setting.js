

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
    // <div className="email">Email: {userDetails?.email}</div>


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

        <div className="page-settings">
            <div className="settings-header">
                <span className="settings-back">←</span>
                <h2 className="settings-title ">Setting</h2>
            </div>

            <div className="settings-body">
                <div className="settings-email">Email: {userDetails?.email}</div>

                <div className="settings-item">
                    <span>Account Password</span>
                    <Link to="/change-password" style={{ textDecorationLine: 'none' }}>
                        <span className="settings-edit">Edit ›</span>
                    </Link>
                </div>

                <div className="settings-item">
                    <span>Payment Password</span>
                    <Link to="/payment-password" style={{ textDecorationLine: 'none' }}>
                        <span className="settings-edit">Edit ›</span>
                    </Link>
                </div>

                <div className="settings-link">Privacy Policy</div>
                <div className="settings-link">User Agreement</div>

                <div className="settings-item">
                    <span>Version</span>
                    <span className="settings-edit">v1.5.1</span>
                </div>

                <div className="settings-buttons">
                    <button className="btn-logout" onClick={handleLogout}>Log out</button>
                    <button className="btn-deregister">Deregister Account</button>
                </div>
            </div>
        </div>

    );
};

export default Setting;
