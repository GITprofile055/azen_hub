import React, { useState } from "react";
import Api from "../../Requests/Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NodeDetails = () => {
  const [steps, setSteps] = useState({
    1: "rent",
    2: "rent",
    3: "rent",
    4: "rent",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [claimedAmount, setClaimedAmount] = useState(0);
  const navigate = useNavigate();

  // Your plan data with package amount
  const plans = {
    1: { amount: 30, img: "/static/image.png", days: 25, reward: 2.4 },
    2: { amount: 299, img: "/static/image (1).png", days: 45, reward: 2.4 },
    3: { amount: 600, img: "/static/image (2).png", days: 60, reward: 2.4 },
    4: { amount: 1200, img: "/static/image (2).png", days: 75, reward: 2.4 },
  };

  const handleRent = async (planId) => {
    try {
      const response = await Api.post("/investInPlan", { id: planId });
      const { status, message } = response.data;

      if (status) {
        // ✅ Success → Show popup
        setClaimedAmount(plans[planId].amount);
        setShowPopup(true);

        // After 10 seconds change button to "Bind"
        setTimeout(() => {
          setSteps((prev) => ({ ...prev, [planId]: "bring" }));
        }, 10000);
      } else {
        // ❌ Validation error → Show toast, NOT popup
        toast.error(message || "Something went wrong!");
      }
    } catch (error) {
      const backendMessage = error.response?.data?.message || "Server Error!";
      toast.error(backendMessage);
      console.error("Investment error:", backendMessage);
    }
  };

  const handleBring = (planId) => {
    navigate("/bindAi");
    setSteps((prev) => ({ ...prev, [planId]: "rent" }));
  };

  return (
    <div style={styles.body}>
      <div style={styles.taskContainer}>
        {Object.keys(plans).map((id) => {
          const planId = parseInt(id);
          const plan = plans[planId];

          return (
            <div key={planId} style={styles.taskCard}>
              <div style={styles.taskHeader}>
                <img src={plan.img} alt="aZen" style={styles.taskHeaderImg} />
                <div style={styles.taskTitle}>aZen</div>
                <div style={{ textAlign: "right", width: "100%", fontSize: 13 }}>
                  Contract Details {plan.days} Days
                </div>
              </div>

              <div style={styles.taskDesc}>Join aZen Announcements Channel</div>

              <div style={styles.taskFooter}>
                <div style={styles.reward}>
                  <img
                    src="/static/usdt.png"
                    alt="USDT"
                    style={{ width: 16, height: 16, marginRight: 6 }}
                  />
                  ${plan.amount}
                  <div
                    style={{
                      textAlign: "right",
                      width: "100%",
                      fontSize: 11,
                      marginLeft: 53,
                    }}
                  >
                    Rewards Per Day ${plan.reward}
                  </div>
                </div>

                <div style={styles.btnGroup}>
                  {steps[planId] === "rent" && (
                    <button
                      style={{ ...styles.btn, ...styles.btnLike }}
                      onClick={() => handleRent(planId)}
                    >
                      Rent
                    </button>
                  )}
                  {steps[planId] === "bring" && (
                    <button
                      style={{ ...styles.btn, ...styles.btnLike }}
                      onClick={() => handleBring(planId)}
                    >
                      Bind
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Popup */}
   {showPopup && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h2 style={styles.title}>Congrats!</h2>
            <div style={styles.iconGlow}>
              <img
                src="static/img/usdt.png"
                alt="Z Coin"
                style={styles.rewardImage}
              />
            </div>
      <div style={styles.amount}>${claimedAmount}</div>
            <button style={styles.okButton} onClick={() => setShowPopup(false)}>
              OK
            </button>
          </div>
        </div>
      )}



      </div>
    </div>
  );
};

const styles = {
  body: {
    margin: 0,
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#f1f3f4",
    padding: 16,
    minHeight: "100vh",
  },
  taskContainer: { maxWidth: 600, margin: "auto" },
  taskCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  },
  taskHeader: { display: "flex", alignItems: "center", gap: 12 },
  taskHeaderImg: { width: 36, height: 36 },
  taskTitle: { fontWeight: 600, fontSize: 18 },
  taskDesc: { marginTop: 6, fontSize: 14, color: "#444" },
  taskFooter: {
    marginTop: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },
  reward: {
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    color: "#000",
    fontSize: 16,
  },
  btnGroup: { display: "flex", gap: 10, flexWrap: "wrap" },
  btn: {
    padding: "8px 20px",
    border: "none",
    borderRadius: 25,
    fontWeight: "bold",
    fontSize: 14,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  btnLike: { backgroundColor: "#eaff00", color: "black" },

  // Popup Styles
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    // background: "linear-gradient(180deg, #0b0b0b, #2c2c2c)",
    padding: "2rem 1.2rem",
    borderRadius: "1.2rem",
    textAlign: "center",
    color: "#fff",
    minWidth: 250,
    position: "relative",
  },
  title: { fontSize: "1.5rem", marginBottom: "1rem" },
  iconGlow: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem",
    animation: "glowPulse 1.5s infinite",
  },
  rewardImage: { width: 100 },
  amount: { fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" },
  okButton: {
    background: "#c6ff30",
    color: "#000",
    padding: "0.5rem 4.5rem",
    border: "none",
    borderRadius: "9999px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default NodeDetails;
