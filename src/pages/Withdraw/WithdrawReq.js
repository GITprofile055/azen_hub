import React from "react";

const WithdrawToWallet = () => {
  return (
    <div className="withdraw-container">
      <div className="top-bar">
        <span className="back-icon">&#8592;</span>
        <h3>Withdraw to Wallet</h3>
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
          <label>Withdrawal Amount</label>
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
            <button className="wallet-button">Wallet</button>
          </div>
        </div>

        {/* Gas Fee */}
        <div className="gas-fee-row">
          <span>Gas Fee</span>
          <span className="gas-value">218.43 <span className="green">$AZEN</span></span>
        </div>

        {/* Withdraw Button */}
        <button  className="withdraw-button" >Withdraw</button>
      </div>
    </div>
  );
};

export default WithdrawToWallet;
