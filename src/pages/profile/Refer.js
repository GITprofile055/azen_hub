import React, { useState, useEffect } from "react";
import Api from "../../Requests/Api";
import { useNavigate, Link } from "react-router-dom";

import { MdContentCopy } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { toast } from 'react-toastify';

const Refer = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [allDirectTeam, setAllDirectTeam] = useState([]);
  const [directTeam, setDirectTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [income, setIncome] = useState([]);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
    const [users, setUsers] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState(null);
      const [level, setLevel] = useState([]);

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

  const copyUsername = () => {
    if (userDetails?.username) {
      navigator.clipboard.writeText(userDetails.username);
      toast.success("Username copied to clipboard!");
    }
  };

const loadUsers = async () => {
  setLoading(true);
  try {
    const response = await Api.get("list", {
      params: {
        selected_level: level || 0,
      },
    });

    if (response.data.status) {
      const allTeam = response.data.direct_team || [];
      const firstFive = allTeam.slice(0, 10); // ✅ Slice only 5 items
      setUsers(firstFive);
    } else {
      console.warn("No data received");
    }

  } catch (error) {
    console.error("❌ Error fetching users:", error);
  }
  setLoading(false);
};




  useEffect(() => {
         loadUsers();
     }, []);

  const handleViewToggle = () => {
    if (showAll) {
      setDirectTeam(allDirectTeam.slice(0, 5));
    } else {
      setDirectTeam(allDirectTeam);
    }
    setShowAll(!showAll);
  };


  useEffect(() => {
    fetchteam();
  }, []);


  const fetchteam = async () => {
    try {
      const response = await Api.get('/team');
      if (response.data) {
        setIncome(response.data);
      }
      // console.log(response.data)
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching income");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container p-3" style={{ maxWidth: "450px", fontFamily: "sans-serif" }}>
      <h5 className="fw-bold mb-4">Referral</h5>
      <div className="bg-white rounded-4 p-2 shadow-sm mb-4">

        <div className="d-flex justify-content-between text-center m-2">
          <div>
            <h5 className="mb-0 fw-bold">{count}</h5>
            <small className="text-muted">👥 Invited</small>
          </div>
          <div className="border-start"></div>
          <div>
            <h5 className="mb-0 fw-bold">0</h5>
            <small className="text-muted">🪙 $ZEN Rewards</small>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-4 p-2 shadow-sm mb-4" style={{ background: "linear-gradient( rgba(236, 253, 180, 1), rgba(255, 255, 255, 1))" }}>


        <div className="mb-3 text-center">
          <h6 className="fw-bold">Invite Friends</h6>
          <p className="smalls text-muted mb-0" style={{ background: "rgba(232, 255, 156, 1)" }}>
            Invite friends and earn exciting bonuses for their participation.
          </p>
        </div>

        <h6 className="fw-bold mt-4">Active Account <span title="Referral based actions">🛈</span></h6>

        <div className="d-flex align-items-center p-2 mt-3 rounded-4" style={{ background: "linear-gradient(90deg, rgb(255, 255, 255), rgb(209 255 188))", }}>
          <img
            src="/static/img/link.png"
            alt="Sign up"
            width="48"
            className="me-3"
          />
          <div className="flex-grow-1">
            <div className="fw-bold">Sign-up with your link</div>
            <small className="text-muted">Sign-up their aZen account.</small>
          </div>
          <div className="ms-2 fw-bold text-success">200 🪙</div>
        </div>

        <div className="d-flex align-items-center p-2 mt-3 rounded-4" style={{ background: "linear-gradient(90deg, rgb(255, 255, 255), rgb(209 255 188))", }}>
          <img
            src="/static/img/invites.png"
            alt="Link X"
            width="48"
            className="me-3"
          />
          <div className="flex-grow-1">
            <div className="fw-bold">Links X account</div>
            <small className="text-muted">Friends linked their X account.</small>
          </div>
          <div className="ms-2 fw-bold text-success">200 🪙</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: "0.5rem", // spacing between button and icon
          }}
        >
          <button
            className="btn btn-dark mt-4 d-flex justify-content-center align-items-center"
            style={{ flex: 1 }}
          >
            Share Link
          </button>
          <span
            className="ms-2 rounded-circle bg-black text-dark px-2 py-1 mt-4"
            style={{
              height: "38px",
              width: "38px",
              display: "flex",

              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MdContentCopy size={13} color="white" style={{ verticalAlign: "middle" }} />
          </span>
        </div>

      </div>

     <div className="d-flex justify-content-between">
        <span className="fw-bold">Invite History</span>
        <span
          style={{
            fontSize: "0.8rem",
            background: "#ccc",
            padding: "0.2rem 0.5rem",
            borderRadius: "1rem",
            cursor: "pointer",
          }}
        >
        <Link to="/direct" style={{color:'black'}} >
        View all
        </Link>
        </span>
      </div>





 <div
  style={{
    borderRadius: "1rem",
    padding: ".2rem",
  }}
>
  {loading ? (
    <p>Loading...</p>
  ) : (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
       {users.map((user, index) => (        <div
          key={index}
          style={{
            padding: "0.8rem",
            background: "#ffffff",
            borderRadius: "0.75rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left side: Email and Username */}
          <div>
            <div style={{ fontWeight: "bold", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                            {user.email|| "user"}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#666" }}>
             Level                             {user.level|| "user"}

              {/* {entry.username || "N/A"} */}
            </div>
          </div>

          {/* Right side: Amount and Status */}
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: "", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                            {user.jdate|| "user"}
            </div>
            <span
            
            >
                          <div style={{ fontWeight: "bold", fontSize: "0.85rem", marginBottom: "0.25rem" }}>

             $                            {user.package|| "0"}

             </div>
            </span>
          </div>
        </div>
      ))}
    </div>
  )}
</div>


      </div>
  );
};

export default Refer;
