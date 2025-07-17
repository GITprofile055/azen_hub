import React from "react";

const Deposit = () => {
  return (
    <div className="dp-container">
      {/* Header */}
      <div className="dp-header">
        <span className="dp-back">&#8592;</span>
        <h2 className="dp-title">Deposit $AZEN into APP</h2>
        <span className="dp-back-placeholder"></span>
      </div>

      {/* Content Box */}
      <div className="dp-card">
        {/* Deposit Amount */}
        <div className="dp-input-group">
          <label>Deposit Amount</label>
          <div className="dp-input-wrapper">
            <input type="text" placeholder="Please enter deposit amount" />
            <span className="dp-currency">$AZEN</span>
          </div>
        </div>

        {/* Wallet Selector */}
        <div className="dp-input-group">
          <label>Select Wallet to Deposit</label>
          <div className="dp-select-wallet">
    <img src="static/assets/wallet-icon.png" alt="wallet" className="dp-icon" />
            <span>OKX Wallet</span>
          </div>
        </div>

        {/* Confirm Button */}
        <button className="dp-button" disabled>Confirm</button>

        {/* Steps Section */}
       <div className="dp-steps">
  <h3>Steps</h3>

  <div className="dp-step">
    <span className="dp-step-number">1</span>
    <div className="dp-step-info">
      <p>Send $AZEN &amp; ETH (Arbitrum) to ETH</p>
      <ul>
        <li>$AZEN is available for trading on MEXC and Bitmart</li>
        <li>Add a small amount of ETH (Arb) for gas fee</li>
        <li>e.g. 0.0001 ETH – around $0.01 per transaction</li>
      </ul>
    </div>
    <img src="static/assets/wallet-icon.png" alt="wallet" className="dp-icon" />
  </div>

  <div className="dp-step">
    <span className="dp-step-number">2</span>
    <div className="dp-step-info">
      <p>In aZen App</p>
      <ul>
        <li>Tap "Deposit"</li>
        <li>Enter amount</li>
        <li>Tap "Confirm", Auto‑connect to OKX</li>
      </ul>
    </div>
    <img src="static/assets/wallet-icon.png" alt="wallet" className="dp-icon" />
  </div>

  {/* <div className="dp-step">
    <span className="dp-step-number">3</span>
    <div className="dp-step-info">
      <p>In OKX Wallet</p>
      <ul>
        <li>Confirm the staking amount</li>
        <li>Complete the transfer</li>
      </ul>
    </div>
    <img src="static/assets/wallet-icon.png" alt="wallet" className="dp-icon" />
  </div> */}

  <div className="dp-step">
    <span className="dp-step-number">3</span>
    <div className="dp-step-info">
      <p>Go back to aZen Hub, Deposit complete!</p>
    </div>
    <img src="static/assets/wallet-icon.png" alt="wallet" className="dp-icon" />
  </div>
</div>


      </div>
    </div>
  );
};

export default Deposit;
