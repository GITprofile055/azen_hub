import React, { useState, useEffect } from "react";
import Api from "../../Requests/Api";
import { useNavigate, Link, Outlet } from "react-router-dom";

const Incomehistory = () => {
          const navigate = useNavigate();
      const [activeTab, setActiveTab] = useState("reward");
       const [error, setError] = useState('');
       const [income, setRoincome] =useState([]);
   useEffect(()=>{fetchroi();},[])


      const fetchroi = async () => {
  try {
    const response = await Api.get('/fetchroi');
    if (response?.data?.incomes && Array.isArray(response.data.incomes)) {
      console.log("✅ ROI Data:", response.data.incomes);
      setRoincome(response.data.incomes);
    } else {
      console.error("⚠️ Unexpected response structure:", response.data);
      setRoincome([]); // fallback
    }
  } catch (error) {
    console.error("❌ Fetching rewards failed:", error);
    setError("Failed to fetch AI rewards.");
  }
};

    return (
        <div>
            <div className="container p-3" style={{ maxWidth: "450px", fontFamily: "sans-serif" }}>
                {/* <h5 className="text-center mb-4">AI</h5> */}

                {/* Tabs */}
                <div className="d-flex bg-light rounded-pill overflow-hidden mb-3">
                    <button
                        className={`flex-fill btn "text-dark"}`}
                        style={{
                            background:"linear-gradient(135deg, rgb(241, 255, 52), rgb(100, 206, 12))",
                            borderRadius: "30px",
                        }} onClick={()=> navigate('/bindAIReward')}
                    >
                       Back
                    </button>
                </div>

                {/* Device Card */}
                               {income.map((roi) => (
  <div className="bg-white shadow-sm p-3 mb-4 rounded" key={roi.id}>
    <div className="d-flex align-items-center mb-3">
      <img
        src="https://cdn-icons-png.flaticon.com/512/706/706830.png"
        alt="device"
        width="35"
        className="me-3"
      />
      <span className="fw-bold">{roi.user_id_fk}</span>
      <span className="" style={{marginLeft: "36%"}}>{roi.remarks}</span>
    </div>

    <div className="d-flex justify-content-between text-muted small">
      <div>
        <div className="fw-semibold text-success">Amount</div>
        <div>Issue Date</div>
      </div>
      <div className="text-end fw-semibold">
        $ {roi.amt}
        <br />
        <small className="text-muted">{roi.ttime}</small>
      </div>
    </div>
  </div>
))}
            </div>
        </div>
    );
};

export default Incomehistory;
