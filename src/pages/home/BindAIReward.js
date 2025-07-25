import React, { useState, useEffect } from "react";
import Api from "../../Requests/Api";
import { useNavigate, Link, Outlet } from "react-router-dom";

const BindAIReward = () => {
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
                        className={`flex-fill btn ${activeTab === "reward" ? "text-white" : "text-dark"}`}
                        style={{
                            background: activeTab === "reward" ? "linear-gradient(135deg, rgb(241, 255, 52), rgb(100, 206, 12))" : "transparent",
                            borderRadius: "30px",
                        }}
                        onClick={() => setActiveTab("reward")}
                    >
                        AI Reward
                    </button>
                    <button
                        className={`flex-fill btn ${activeTab === "chart" ? "text-white" : "text-dark"}`}
                        style={{
                            background: activeTab === "chart" ? "linear-gradient(135deg, rgb(241, 255, 52), rgb(100, 206, 12))" : "transparent",
                            borderRadius: "30px",
                        }}
                        onClick={() => setActiveTab("chart")}
         >
                        H₂ Chart
                    </button>
                </div>

                {/* Earnings */}            
                <div className="text-center mb-4">
                    <h3>
                        <b>2.00</b> <small className="text-muted">Hz/h</small>
                    </h3>
                    <div className="d-flex justify-content-around mt-3">
                        <div className="bg-light rounded p-3 w-45 text-center">
                            <p className="mb-0"><b>0.00</b></p>
                            <small className="text-muted">Today's zEna</small>
                        </div>
                        <div className="bg-light rounded p-3 w-45 text-center">
                            <p className="mb-0"><b>0.00</b></p>
                            <small className="text-muted">Yesterday's zEna</small>
                        </div>
                    </div>
                </div>
                {/* Bind Now Button */}
                <div className="text-center">
                    <button
                        className="btn btn-block text-black  w-100"
                        style={{
                            borderRadius: "20px",
                            padding: "0px 0px 0px 230px",
                            fontWeight: "500",
                        }}
                        onClick={()=> navigate('/incomehistory')}
                    >
                        View All
                    </button>
                </div>

                {/* Device Card */}
                {income.slice(0, 5).map((roi) => (
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

export default BindAIReward;
