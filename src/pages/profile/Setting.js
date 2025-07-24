

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from "../../components/AuthContext";
import { MdChevronRight } from 'react-icons/md';

import Api from "../../Requests/Api";

const Setting = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

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


    const handleLogouts = () => {
        setShowPopup(true);
    };

    const confirmLogout = () => {
        console.log("User logged out");
        setShowPopup(false);
    };

    const cancelLogout = () => {
        setShowPopup(false);
    };
    const backClick = () => {
        navigate(-1);
    };
    return (
        <div className="withdraw-container">
            <div className="top-bar">
                <span className="back-icon" onClick={backClick}>&#8592;</span>
                <h3>Setting</h3>
                <span></span>
            </div>
            <div className="settings-body">
                <div className="settings-email">Email: {userDetails?.email}</div>
                <div className="settings-item">
                    <span>Update Profile</span>
                    <Link to="/profile" style={{ textDecorationLine: 'none', color: 'black' }}>
                        <span className="settings-edit">Edit <MdChevronRight size={18} /></span>
                    </Link>
                </div>
                <div className="settings-item">
                    <span>Account Password</span>
                    <Link to="/change-password" style={{ textDecorationLine: 'none', color: 'black' }}>
                        <span className="settings-edit">Edit <MdChevronRight size={18} /></span>
                    </Link>
                </div>

                <div className="settings-item">
                    <span>Payment Password</span>
                    <Link to="/payment-password" style={{ textDecorationLine: 'none', color: 'black' }}>
                        <span className="settings-edit">Edit <MdChevronRight size={18} /></span>
                    </Link>
                </div>

                <div
                    className="settings-item"


                >
                    <span style={{ fontWeight: '600' }}>Privacy Policy</span>
                    <span className="settings-edit"> <MdChevronRight size={18} />
                    </span>
                </div>

                <div className="settings-item">
                    <span style={{ fontWeight: '600' }}>User Agreement</span>

                    <span className="settings-edit"> <MdChevronRight size={18} />
                    </span>
                </div>

                <div className="settings-item">
                    <span>Version</span>
                    <span className="settings-edit">v1.5.1</span>
                </div>

                <div className="settings-buttons">
                    <button className="login-btn" onClick={handleLogouts}>Log out</button>
                    {showPopup && (
                        <div
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100vw",
                                height: "100vh",
                                backgroundColor: "rgba(0,0,0,0.4)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                zIndex: 999,
                            }}
                        >
                            <div
                                style={{
                                    background: "#fff",
                                    padding: "20px 30px",
                                    borderRadius: "10px",
                                    textAlign: "center",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                                    minWidth: "250px",
                                }}
                            >
                                <p style={{ marginBottom: "20px", fontWeight: "500" }}>
                                    Are you sure you want to log out?
                                </p>
                                <div>
                                    <button
                                        onClick={handleLogout}
                                        style={{
                                            // backgroundColor: "#dc3545",
                                            color: "#000",
                                            border: "none",
                                            padding: "6px 38px",
                                            borderRadius: "2rem",
                                            cursor: "pointer",
                                            marginRight: "10px",
                                        }}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={cancelLogout}
                                        style={{
                                            backgroundColor: "#000000ff",
                                            color: "#fff",
                                            border: "none",
                                            padding: "6px 33px",
                                            borderRadius: "2rem",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <button className="reg-btn">Deregister Account</button>
                </div>
            </div>
        </div>

    );
};

export default Setting;
