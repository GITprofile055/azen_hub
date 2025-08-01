import React, { useEffect, useState } from "react";
import Api from "../../Requests/Api";
import { useNavigate } from "react-router-dom";

const UserHistory = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserHistory();
  }, []);

  const fetchUserHistory = async () => {
    try {
      const res = await Api.get("/getUserHistory"); // API call

      if (res.data.success) {
        setRecords(res.data.records); // combinedRecords set
      }
    } catch (error) {
      console.error("Error fetching user history:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (type) => {
    if (type.toLowerCase().includes("withdraw")) return { background: "#f8d7da", color: "#721c24" }; // Failed
    if (type.toLowerCase().includes("investment")) return { background: "#fff3cd", color: "#856404" }; // Pending
    return { background: "#d4edda", color: "#155724" }; // Success
  };

  const backClick = () => {
    navigate(-1);
  };

  return (
    <div className="withdraw-container">
      <div className="top-bar">
        <span className="back-icon" onClick={backClick}>&#8592;</span>
        <h3>Transaction Records</h3>
        <span></span>
      </div>

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
          <strong>Transaction</strong>
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

        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          {loading ? (
            <p>Loading...</p>
          ) : records.length > 0 ? (
            records.map((item, index) => {
              const statusStyle = getStatusColor(item.type || "");
              const statusText = item.type.toLowerCase().includes("withdraw")
                ? "Failed"
                : item.type.toLowerCase().includes("investment")
                ? "Pending"
                : "Success";

              return (
                <div
                  key={index}
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
                    <div style={{ fontWeight: "bold" }}>${Number(item.amount).toLocaleString()}</div>
                    <div style={{ fontSize: "0.75rem", color: "#666" }}>
                      {new Date(item.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    {/* ✅ Record kis ka hai */}
                    <div style={{ fontSize: "0.7rem", color: "#999" }}>
                       {/* Ye type Investment / Income / Withdrawal / Buy Fund dikhega */}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      padding: "0.3rem 0.6rem",
                      borderRadius: "1rem",
                      fontWeight: 500,
                      ...statusStyle,
                    }}
                  >
                   {item.type}
                  </span>
                </div>
              );
            })
          ) : (
            <p>No records found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHistory;
