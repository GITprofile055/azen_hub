import React, { useState, useEffect } from "react";
import Api from "../../Requests/Api";
import { MdContentCopy } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { toast } from 'react-toastify';

const Direct = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [allDirectTeam, setAllDirectTeam] = useState([]);
  const [directTeam, setDirectTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [income, setIncome] = useState([]);
  const [error, setError] = useState("");
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

  useEffect(() => {
    const fetchDirectTeam = async () => {
      try {
        const response = await Api.get("/getDirectTeam"); // <-- Make sure this endpoint is correct
        if (response.data.status) {
          setAllDirectTeam(response.data.data);
          setDirectTeam(response.data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching direct team:", error);
        setLoading(false);
      }
    };

    fetchDirectTeam();
  }, []);




  return (
    <div className="container p-3" style={{ maxWidth: "450px", fontFamily: "sans-serif" }}>
      {/* <h5 className="fw-bold mb-4">Referral</h5> */}
   
     <div className="d-flex justify-content-between">
        <span className="fw-bold">Invite History</span>
        {/* <span
          style={{
            fontSize: "0.8rem",
            background: "#ccc",
            padding: "0.2rem 0.5rem",
            borderRadius: "1rem",
            cursor: "pointer",
          }}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show less" : "View all"}
        </span> */}
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
            {(showAll ? allDirectTeam : directTeam).map((entry, i) => (
              <div
                key={i}
                style={{
                  padding: "0.8rem",
                  background: "#ffffff",
                  borderRadius: "0.75rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div >
                {entry?.email ? entry.email.slice(0, 6) + "*************" : ''}
                    
                     </div>
                  <div style={{ fontSize: "0.75rem", color: "#666" }}>
                    {entry.username || "N/A"}
                  </div>
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      padding: "0.3rem 0.6rem",
                      borderRadius: "1rem",
                      background:
                        entry.active_status === "Active"
                          ? "#d4edda"
                          : entry.active_status === "Pending"
                          ? "#fff3cd"
                          : "#f8d7da",
                      color:
                        entry.active_status === "Active"
                          ? "#155724"
                          : entry.active_status === "Pending"
                          ? "#856404"
                          : "#721c24",
                      fontWeight: 500,
                    }}
                  >
                    {entry.active_status || "Unknown"}
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

export default Direct;
