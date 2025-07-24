import React, { useContext, useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { MdQrCode } from "react-icons/md";
import Api from "../../Requests/Api";

const BindAI = () => {

      const navigate = useNavigate();
      const [message, setMessage] = useState('');
  const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
     const [verificationCode, setVerificationCode] = useState('');

    const handleSendRequest = async () => {
    try {
      const response = await Api.post('/sendotp');
      console.log(response);
      if (response?.data?.success) {
        console.log('OTP sent successfully:', response.data);
        setSuccess("OTP sent successfully!");        
      } else {
        console.warn('Failed to send OTP:', response.data.message);
        setSuccess(response?.data?.message || "Failed to send OTP!");
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setSuccess(error?.response?.data?.message || "Failed to send OTP!");
    }
  };

    
   const handleBindmail = async () => {
    try {
      const response = await Api.post('/bindMail', {
        verification_code: verificationCode
      });
  
      if (response.data.success) {
        setSuccess(response.data.message);
        navigate('/bindAIReward');
      } else {
        setSuccess(response.data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Error:', err.response);
      setSuccess(err.response?.data?.message || "Server error");
    }
  };
    return (
  <div className="container p-3" style={{ maxWidth: "450px", fontFamily: "sans-serif" }}>
      {/* <h5 className="fw-bold mb-4">Referral</h5> */}
      <div className="bg-white rounded-4 p-2 shadow-sm mb-4">

                <div>
                    <div className="mb-3">
                        <div className="d-flex align-items-start mb-2">
                            <div className="me-2 fw-bold">1</div>
                            <div>Download aZen AI App</div>
                        </div>

                        <div className="text-center my-3">
                            <img
                                src="/static/img/bindai.png" // Replace with your image or local file
                                alt="AI Logo"
                                className="img-fluid"
                                style={{ maxWidth: '180px' }}
                            />
                        </div>

                        <div className="d-flex justify-content-around">
                            <button className="btn bg-info  btn-sm rounded-pill py-1">
                                QR Code <MdQrCode size={14} color="black" style={{ verticalAlign: "middle" }} />

                            </button>
                            <button className="btn bg-info btn-sm rounded-pill py-1">
                                Copy Link <MdContentCopy size={13} color="black" style={{ verticalAlign: "middle" }} />
                                
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 mb-3">
                        <div className="d-flex align-items-start mb-2">
                            <div className="me-2 fw-bold">2</div>
                            <div>Enter binding code from aZen AI</div>
                        </div>

                        {/* <input
                            type="text"
                            className="form-control rounded-pill"
                            placeholder="aZen AI code"
                        /> */}
                        <div style={{ position: 'relative', width: '100%' }}>
                          <input type="text" className="form-control rounded-pill" placeholder="aZen AI code" style={{ paddingRight: '70px' }} value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)}/>
                           <span style={{position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', padding: '6px 12px', borderRadius: '1rem',cursor: 'pointer'}} onClick={()=>handleSendRequest()}>
                            Send
                           </span>
                        </div>
                       </div>
                    <button className="btn w-100 gradient-btn mt-3" onClick={()=>handleBindmail()}>Bind Now</button>
                </div>
            </div>
        </div>
    );
};

export default BindAI;
