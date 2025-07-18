import React from 'react';
import { useNavigate, Link } from "react-router-dom";

const Transfer = () => {

    const navigate = useNavigate();

    const backClick = () => {
        navigate(-1);
    };
    return (
        <div className="withdraw-container">
            <div className="top-bar">
                <span className="back-icon" onClick={backClick}>&#8592;</span>
                <h3>In-app Transfer</h3>
                <span></span>
            </div>

            <div className="withdraw-box">
                {/* Balance Card */}
                <div className="balance-card">
                    <div className="balance-left">
                        <p className="balance-value">0 <span>$AZEN</span></p>
                        <p className="balance-text">Balance</p>
                    </div>
                    <img src="static/assets/wallet-icon.png" alt="wallet" style={{ width: "80px", height: "80px" }} />
                </div>

                {/* Withdrawal Amount */}
                <div className="form-group">
                    <label>Transfer Amount</label>
                    <div className="input-wrapper">
                        <input type="text" placeholder="Please enter withdrawal amount" />
                        <span className="currency-label">$AZEN</span>
                    </div>
                </div>

                {/* Wallet Address */}
                <div className="form-group">
                    <label>TO</label>
                    <div className="input-wrapper">
                        <input type="text" placeholder="Please enter wallet address" />

                    </div>
                </div>



                {/* Withdraw Button */}
                <button className="withdraw-button" >Confirm</button>
            </div>
        </div>
    );
};

export default Transfer;