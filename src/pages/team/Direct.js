import React, { useState, useEffect } from "react";
import Api from "../../Requests/Api";
import { toast } from "react-toastify";

const Direct = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false); // Sidebar toggle

  useEffect(() => {
    fetchUserDetails();
    loadUsers();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await Api.get("/user");
      setUserDetails(response.data);
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
      const response = await Api.get("list", { params: { selected_level: 0 } });

      if (response.data.status) {
        setUsers(response.data.direct_team);
        setFilteredUsers(response.data.direct_team); // Default show all users
      }
    } catch (error) {
      console.error("❌ Error fetching users:", error);
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
      .replace(",", "");
  };

  // ✅ Auto filter users when level changes
  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    if (level) {
      setFilteredUsers(
        users.filter((user) => parseInt(user.level) === parseInt(level))
      );
    } else {
      setFilteredUsers(users);
    }
  };

  return (
    <div style={{ display: "flex", fontFamily: "sans-serif" }}>
      {/* 🔹 Main Content */}
      <div className="container p-3" style={{ maxWidth: "450px", flex: 1 }}>
        <div
          className="d-flex justify-content-between align-items-center mb-3"
          style={{ position: "relative" }}
        >
          <span className="fw-bold">Team History</span>

          {/* Menu Icon (Right Side) */}
          <div
            style={{
              cursor: "pointer",
              padding: "0.3rem 0.6rem",
              borderRadius: "0.4rem",
              background: "#f2f2f2",
              transition: "0.3s",
            }}
            onClick={() => setShowSidebar(!showSidebar)}
          >
           <img 
  src="/static/icons8-menu.svg" 
  alt="Menu" 
  style={{ width: "24px", height: "24px", display: "block" }} 
/>
          </div>

          {/* Sidebar Filter (Dropdown Style) */}
          {showSidebar && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: "0",
                background: "#fff",
                color: "#333",
                padding: "1rem",
                borderRadius: "0.5rem",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                width: "180px",
                zIndex: 100,
              }}
            >
              <h6 style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                Filter by Level
              </h6>
              <select
                value={selectedLevel}
                onChange={(e) => handleLevelChange(e.target.value)}
                style={{
                  padding: "0.4rem 0.8rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #ccc",
                  width: "100%",
                }}
              >
                <option value="">All Levels</option>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((lvl) => (
                  <option key={lvl} value={lvl}>
                    Level {lvl}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* User List */}
        <div style={{ borderRadius: "1rem", padding: ".2rem" }}>
          {loading ? (
            <p>Loading...</p>
          ) : filteredUsers.length > 0 ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}
            >
              {filteredUsers.map((user, index) => (
                <div
                  key={index}
                  style={{
                    padding: "0.8rem",
                    background: "#ffffff",
                    borderRadius: "0.75rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "0.85rem",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {user.email || "user"}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#666" }}>
                      Level {user.level || "N/A"}
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        marginBottom: "0.25rem",
                        color: "#666",
                      }}
                    >
                      {formatDate(user.jdate) || "N/A"}
                    </div>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "0.85rem",
                        color: "#222",
                      }}
                    >
                      $ {user.package || "0"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No users found for this level.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Direct;
