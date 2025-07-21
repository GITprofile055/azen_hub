import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../Requests/Api";
import { toast } from "react-toastify";



const WithdrawToWallet = () => {

  const navigate = useNavigate();
  const [wallets, setWallets] = useState({ bep20: "", trc20: "" });
  const [walletType, setWalletType] = useState(""); // NEW
  const [walletAddress, setWalletAddress] = useState(""); // NEW
  const [amount, setAmount] = useState("");
  const [transactionPassword, setTransactionPassword] = useState("");
  const [availbal, setAvailableBal] = useState(0);
    const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    fetchAvailableBalance();
    withreq();

  }, []);
  const backClick = () => {
    navigate(-1);
  };
  const fetchAvailableBalance = async () => {
    try {
      const response = await Api.get("/availbal");
      if (response.data?.AvailBalance !== undefined) {
        setAvailableBal(response.data.AvailBalance);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const withreq = async () => {
    try {
      const response = await Api.get("/withreq");
      if (response.data.success) {
        setWallets({
          bep20: response.data.bep20,
          trc20: response.data.trc20,
        });
      }
    } catch (error) {
      console.error(error);
      // toast.error("Error fetching wallet addresses.");
    }
  };
  const handleSubmit = async () => {
    if (!walletAddress || !amount || !transactionPassword || !walletType) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await Api.post("/process-withdrawal", {
        wallet: walletAddress,
        type: walletType,
        amount: amount,
        transaction_password: transactionPassword,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset fields
        setAmount("");
        setTransactionPassword("");
        setWalletType("");
        setWalletAddress("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting withdrawal:", error);
      toast.error("Server error while submitting withdrawal");
    }
  };


  return (
    <div className="withdraw-container">
      <div className="top-bar">
        <span className="back-icon" onClick={backClick}>&#8592;</span>
        <h3>Withdraw to Wallet</h3>
        <span></span>
      </div>

      <div className="withdraw-box">
        {/* Balance Card */}
        <div className="balance-card">
          <div className="balance-left">
            <p className="balance-value">{availbal}<span>$</span></p>
            <p className="balance-text">Balance</p>
          </div>
          <img src="static/assets/wallet-icon.png" alt="wallet" style={{ width: "80px", height: "80px" }} />
        </div>

        {/* Withdrawal Amount */}
        <div className="form-group">
          <label>Withdrawal Amount</label>
          <div className="input-wrapper">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Please enter withdrawal amount"
            />
            <span className="currency-label"></span>
          </div>
        </div>

        <div className="form-group">
          <label>Wallet Type</label>
          <div className="input-wrapper">
            <select
              value={walletAddress}
              
              onChange={(e) => {
                setWalletAddress(e.target.value);
                setWalletType(e.target.value === wallets.bep20 ? "BEP20" : "TRC20");
              }}
              className="wallet-dropdown"
            > 
              <option>Select wallet type</option>

              {wallets.bep20 && <option value={wallets.bep20}>BEP20</option>}
              {wallets.trc20 && <option value={wallets.trc20}>TRC20</option>}
            </select>
          </div>
        </div>


        {/* Wallet Address Input */}
        <div className="form-group">
          <label>Wallet Address</label>
          <div className="input-wrapper">
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="Please enter wallet address"
            />
            <Link to="/add-wallet">
              <button className="wallet-button">Wallet</button>
            </Link>

          </div>
        </div>


        {/* Transaction Password */}
        <div className="form-group">
          <label>Transaction Password</label>
          <div className="input-wrapper">
            <input
              type="password"
              value={transactionPassword}
              onChange={(e) => setTransactionPassword(e.target.value)}
              placeholder="Please enter transaction password"
            />
            <span className="currency-label"></span>
          </div>
        </div>

        {/* Withdraw Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className={`withdraw-button ${amount ? 'active' : ''}`}
        >
          Withdraw
        </button>


      </div>
    </div>
  );
};

export default WithdrawToWallet;
