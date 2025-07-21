import React, { useState, useEffect } from "react";
import Api from "../../Requests/Api";
import { MdContentCopy } from "react-icons/md";
import { MdPerson } from "react-icons/md";


const Refer = () => {
  const [directTeam, setDirectTeam] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  const [loading, setLoading] = useState(true);
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
      alert("Username copied to clipboard!");
    }
  };

    useEffect(() => {
      const fetchDirectTeam = async () => {
        try {
          const response = await Api.get("/getDirectTeam"); // <-- Make sure this endpoint is correct
          if (response.data.status) {
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

    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div className="uni-body pages-user-invite">
        <header>
          <h1>Referral</h1>
          {/* Round Settings Icon SVG can go here if needed */}
        </header>

        <section style={{ padding: "1.5rem" }}>
          {/* Invite Card */}
          <div
            style={{
              background: "linear-gradient(135deg, #f1ff34, #64ce0c)",
              borderRadius: "1rem",
              padding: "1.2rem",
              textAlign: "center",
              marginBottom: "1.2rem",
            }}
          >
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#000" }}>
              Invite Friends !
            </h2>
            <p style={{ fontSize: "0.85rem", margin: "0.5rem 0 1rem" }}>
              Enjoy Exclusive Rewards Together !
            </p>

            <img
              src="https://cdn-icons-png.flaticon.com/512/3595/3595455.png"
              alt="Gift Box"
              width="80"
              style={{ marginBottom: "1rem" }}
            />

            <div
              style={{
                background: "#fff",
                borderRadius: "1rem",
                padding: "1rem",
                textAlign: "left",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ marginBottom: "1rem" }}>
                <strong>5000 $XaZen</strong>
                <br />
                <small style={{ color: "#666" }}>
                  Invitee Sign-up, Both earn rewards
                </small>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <strong>1200 O₂</strong>
                <br />
                <small style={{ color: "#666" }}>
                  Invitee Links DePIN 600O₂ <br />
                  Invitee Links X 600O₂
                </small>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <strong>10 O₂</strong>
                <br />
                <small style={{ color: "#666" }}>
                  Earnings from Invitees’ Tasks
                </small>
              </div>

              <button
                style={{
                  width: "100%",
                  background: "#000",
                  color: "#fff",
                  padding: "0.75rem",
                  fontWeight: 600,
                  border: "none",
                  borderRadius: "9999px",
                  fontSize: "0.95rem",
                }}
              >
                Invite Friends
              </button>
            </div>
          </div>

          {/* Invited Count */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "linear-gradient(135deg, #b8fe3f)",
              padding: "1rem 1.2rem",
              borderRadius: "1rem",
              marginBottom: "1.2rem",
              boxShadow: "0 1px 5px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <MdPerson size={26} color="black" />
              <span style={{ fontWeight: 600 }}>Invited</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: "1.1rem", cursor: "pointer" }} onClick={copyUsername}>
              {userDetails?.username}{" "}
              <MdContentCopy size={15} color="black" style={{ verticalAlign: "middle" }} />
            </span>

          </div>

          {/* Referral Rewards */}
          <div
            style={{
              background: "#BAFF2C",
              padding: "1.2rem",
              borderRadius: "1rem",
              marginBottom: "1.2rem",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                fontSize: "1rem",
                fontWeight: 700,
                marginBottom: "1rem",
              }}
            >
              Referral Rewards
            </h3>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                background: "#fff",
                padding: "1rem",
                borderRadius: "1rem",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/9378/9378390.png"
                  width="24"
                  alt="O2 icon"
                />
                <span style={{ fontWeight: 700 }}>160.825</span>
              </div>
              <div style={{ fontSize: "0.9rem", color: "#888" }}>O₂</div>
              <div style={{ fontWeight: 700 }}>160.825</div>
            </div>
          </div >

          {/* Referral User Card */}
          <div
            style={{
              background: "#fff",
              borderRadius: "1rem",
              padding: "1rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.8rem",
              }}
            >
              <strong>Invest History</strong>
              <span
                style={{
                  fontSize: "0.8rem",
                  background: "#ccc",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "1rem",
                  cursor: "pointer",
                }}
              >
                View all
              </span>
            </div>
            {directTeam.length === 0 ? (
              <p>No direct team members yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {directTeam.map((member, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "0.8rem",
                      background: "#f9f9f9",
                      borderRadius: "0.75rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "bold" }}>{member.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "#666" }}>  {member.email}</div>
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          padding: "0.3rem 0.6rem",
                          borderRadius: "1rem",
                          background:
                            member.active_status === "Active"
                              ? "#d4edda"
                              : member.active_status === "Pending"
                                ? "#fff3cd"
                                : "#f8d7da",
                          color:
                            member.active_status === "Active"
                              ? "#155724"
                              : member.active_status === "Pending"
                                ? "#856404"
                                : "#721c24",
                          fontWeight: 500,
                        }}
                      >
                        {member.active_status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </section>
      </div>
    );
  };

  export default Refer;
