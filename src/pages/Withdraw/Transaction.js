import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom'; // Import Link for navigation
import Api from '../../Requests/Api';

const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [availbal, setAvailableBal] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await Api.get("/getUserHistory");

            if (response.data && response.data.success) {
                setTransactions({
                    investment: response.data.investment || [],
                    income: response.data.income || [],
                    withdraw: response.data.withdraw || []
                });
            } else {
                setTransactions({
                    investment: [],
                    income: [],
                    withdraw: []
                });
            }

            console.log("Fetched:", response.data);
        } catch (err) {
            setError(err.response?.data?.error || "Error fetching history");
        }
    };
    useEffect(() => {
        withfatch();
    }, []);

    const withfatch = async () => {
        try {
            const response = await Api.get("/availbal");
            if (response.data?.AvailBalance !== undefined) {
                setAvailableBal(response.data.AvailBalance);
            }
        } catch (error) {
            console.error("Error:", error);
        }
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

          {/* Investment entries start here */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {[
              {
                amount: "₹5,000",
                date: "16 July, 2025",
                status: "Success",
              },
              {
                amount: "₹2,000",
                date: "12 July, 2025",
                status: "Pending",
              },
              {
                amount: "₹7,500",
                date: "04 July, 2025",
                status: "Failed",
              },
            ].map((entry, i) => (
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
                  <div style={{ fontWeight: "bold" }}>{entry.amount}</div>
                  <div style={{ fontSize: "0.75rem", color: "#666" }}>{entry.date}</div>
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      padding: "0.3rem 0.6rem",
                      borderRadius: "1rem",
                      background:
                        entry.status === "Success"
                          ? "#d4edda"
                          : entry.status === "Pending"
                            ? "#fff3cd"
                            : "#f8d7da",
                      color:
                        entry.status === "Success"
                          ? "#155724"
                          : entry.status === "Pending"
                            ? "#856404"
                            : "#721c24",
                      fontWeight: 500,
                    }}
                  >
                    {entry.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
    );
};

export default Transaction;










