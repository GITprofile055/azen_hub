import React from 'react';
import { MdContentCopy } from "react-icons/md";
import { MdQrCode } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


const BindAI = () => {
    const navigate =useNavigate();

    const handleClick = () => {
        navigate('/bindAIReward');
    }
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

                        <input
                            type="text"
                            className="form-control rounded-pill"
                            placeholder="aZen AI code"
                        />
                    </div>

                    <button className="btn w-100 gradient-btn mt-3" onClick={handleClick}>Bind Now</button>
                </div>
            </div>
        </div>
    );
};

export default BindAI;
