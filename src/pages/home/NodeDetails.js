import React, { useState } from "react";
import axios from "axios";
import Api from "../../Requests/Api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const NodeDetails = () => {
  const [message, setMessage] = useState("");
const [steps, setSteps] = useState({
  1: "rent",
  2: "rent",
  3: "rent",
  4: "rent",
});
  const [showBring, setShowBring] = useState(false);
  const [isRentDisabled, setIsRentDisabled] = useState(false);
  const navigate = useNavigate();


   const handleRent = async (planId) => {
  try {
    const response = await Api.post("/investInPlan", { id: planId });
    toast.success(response.data.message || "Investment successful");

    // Update only the clicked button's state after 10 sec
    setTimeout(() => {
      setSteps(prev => ({ ...prev, [planId]: "bring" }));
    }, 10000);
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong!");
    console.error("Investment error:", error.response?.data);
  }
};

const handleBring = (planId) => {
  navigate("/bindAi");
  // Optional: Reset that button back to "rent" after redirect
  setSteps(prev => ({ ...prev, [planId]: "rent" }));
};

const showSuccessToast = () => {
  toast.success(
    <div style={{ textAlign: 'center' }}>
      <img
        src="/static/image.png"
        alt="success"
        style={{ width: '50px', marginBottom: '10px' }}
      />
      <div>successful!</div>
    </div>,
    {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    }
  );
};



  return (
    <div style={styles.body}>
      <div style={styles.taskContainer}>

        {/* Task 1 */}
        <div style={styles.taskCard}>
          <div style={styles.taskHeader}>
            <img src="/static/image.png" alt="aZen" style={styles.taskHeaderImg} />
            <div style={styles.taskTitle}>aZen</div>


<div style={{ textAlign: 'right', width: '100%', fontSize: '13px', fontWeight: '' }}>
Contract Details 25 Days</div>
          </div>
          <div style={styles.taskDesc}>Join aZen Announcements Channel</div>
          <div style={styles.taskFooter}>
            <div style={styles.reward}>
              <img src="/static/usdt.png" alt="USDT" style={{ width: 16, height: 16, marginRight: 6 }} />
              $30             
<div style={{ textAlign: 'right', width: '100%', fontSize: '11px', marginLeft: '53px' }}>
  Rewards Per Day $2.4
</div>            </div>   

        <div style={styles.btnGroup}>
      {steps[1]=== "rent" && (
        <button
          style={{ ...styles.btn, ...styles.btnLike }}
          onClick={() => handleRent(1)}
        >
          Rent
        </button>
      )}

      {steps[1]=== "bring" && (
        <button
          style={{ ...styles.btn, ...styles.btnLike }}
          onClick={handleBring}
        >
          Bind
        </button>
      )}
    </div>
          </div>
        </div>

        {/* Task 2 */}
        <div style={styles.taskCard}>
          <div style={styles.taskHeader}>
            <img src="/static/image (1).png" alt="aZen" style={styles.taskHeaderImg} />
            <div style={styles.taskTitle}>aZen</div>
<div style={{ textAlign: 'right', width: '100%', fontSize: '13px', fontWeight: '' }}>
Contract Details 45 Days</div>          </div>
          <div style={styles.taskDesc}>Like aZen DePin AI Agent: ZENi</div>
          <div style={styles.taskFooter}>
            <div style={styles.reward}>
              <img src="/static/usdt.png" alt="USDT" style={{ width: 16, height: 16, marginRight: 6 }} />
              $299 <div style={{ textAlign: 'right', width: '100%', fontSize: '11px', marginLeft: '53px' }}>
  Rewards Per Day $2.4
</div>  
            </div>   
                <div style={styles.btnGroup}>
      {steps[2] === "rent" && (
        <button
          style={{ ...styles.btn, ...styles.btnLike }}
          onClick={() => handleRent(2)}
        >
          Rent
        </button>
      )}

      {steps[2]=== "bring" && (
        <button
          style={{ ...styles.btn, ...styles.btnLike }}
          onClick={handleBring}
        >
          Bind
        </button>
      )}
    </div>
          </div>
        </div>

        {/* Task 3 */}
        <div style={styles.taskCard}>
          <div style={styles.taskHeader}>
            <img src="/static/image (2).png" alt="aZen" style={styles.taskHeaderImg} />
            <div style={styles.taskTitle}>aZen</div>
<div style={{ textAlign: 'right', width: '100%', fontSize: '13px', fontWeight: '' }}>
Contract Details 60 Days</div>          </div>
          <div style={styles.taskDesc}>Like aZen DePin AI Agent: ZENi</div>
          <div style={styles.taskFooter}>
            <div style={styles.reward}>
              <img src="/static/usdt.png" alt="USDT" style={{ width: 16, height: 16, marginRight: 6 }} />
              $600<div style={{ textAlign: 'right', width: '100%', fontSize: '11px', marginLeft: '53px' }}>
  Rewards Per Day $2.4
</div>    
            </div>   
                 <div style={styles.btnGroup}>
      {steps[3] === "rent" && (
        <button
          style={{ ...styles.btn, ...styles.btnLike }}
          onClick={() => handleRent(3)}
        >
          Rent
        </button>
      )}

      {steps[3]=== "bring" && (
        <button
          style={{ ...styles.btn, ...styles.btnLike }}
          onClick={handleBring}
        >
          Bind
        </button>
      )}
    </div>
          </div>
        </div>

        {/* Task 4 */}
        <div style={styles.taskCard}>
          <div style={styles.taskHeader}>
            <img src="/static/image (2).png" alt="aZen" style={styles.taskHeaderImg} />
            <div style={styles.taskTitle}>aZen</div>
<div style={{ textAlign: 'right', width: '100%', fontSize: '13px', fontWeight: '' }}>
Contract Details 75 Days</div>          </div>
          <div style={styles.taskDesc}>Like aZen SocialFi ecosystem</div>
          <div style={styles.taskFooter}>
            <div style={styles.reward}>
              <img src="/static/usdt.png" alt="USDT" style={{ width: 16, height: 16, marginRight: 6 }} />
              $1200<div style={{ textAlign: 'right', width: '100%', fontSize: '11px', marginLeft: '53px' }}>
  Rewards Per Day $2.4
</div>  
            </div>            
                <div style={styles.btnGroup}>
      {steps[4] === "rent" && (
        <button
          style={{ ...styles.btn, ...styles.btnLike }}
          onClick={() => handleRent(4)}
        >
          Rent
        </button>
      )}

      {steps[4] === "bring" && (
        <button
          style={{ ...styles.btn, ...styles.btnLike }}
          onClick={handleBring}
        >
          Bind
        </button>
      )}
    </div>
          </div>
        </div> 

        {/* Message */}
        {message && (
          <div style={{ textAlign: "center", marginTop: 30, color: "green", fontSize: 16 }}>
            {message}
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
  taskContainer: {
    maxWidth: 600,
    margin: "auto",
  },
  taskCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  },
  taskHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  taskHeaderImg: {
    width: 36,
    height: 36,
  },
  taskTitle: {
    fontWeight: 600,
    fontSize: 18,
  },
  taskDesc: {
    marginTop: 6,
    fontSize: 14,
    color: "#444",
  },
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
  btnGroup: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  btn: {
    padding: "8px 20px",
    border: "none",
    borderRadius: 25,
    fontWeight: "bold",
    fontSize: 14,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  btnClaim: {
    backgroundColor: "black",
    color: "white",
  },
  btnLike: {
    backgroundColor: "#eaff00",
    color: "black",
  },
};

export default NodeDetails;
