import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../Requests/Api"; 
import { toast } from "react-toastify";

const Deposit = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(true);

  const backClick = () => {
    navigate(-1);
  };

  const fetchDepositDetails = async () => {
    try {
      const res = await Api.get("/buyFund");
      if (res.data.status) {
        const depositAddress = res.data.data.address_in;
        setAddress(depositAddress);
        setQrCode(
          `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
            depositAddress
          )}`
        );
      } else {
        toast.error(res.data.message || "Failed to load deposit address");
      }
    } catch (error) {
      console.error("Error fetching deposit address:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(address).then(() => {
      toast.success("Wallet address copied!");
    });
  };

  useEffect(() => {
    fetchDepositDetails();
  }, []);

  return (
    <div>
      <header>
        <span onClick={backClick} style={{ cursor: "pointer" }}>
          ←
        </span>
        <h1>Deposit</h1>
        <span style={{ width: "24px" }}></span>
      </header>

      <div className="section-wrap">
        <div className="card" style={{ textAlign: "center" }}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="qrcode" style={{ margin: "1rem 0" }}>
                <img
                  src={qrCode}
                  alt="QR Code"
                  style={{ maxWidth: "150px" }}
                />
              </div>

              <div className="tag">Minimum deposit: 2 USDT (BEP20)</div>

              <div
                style={{
                  background: "#fcfcfcff",
                  padding: "0.75rem",
                  borderRadius: "0.75rem",
                  marginTop: "1rem",
                  wordBreak: "break-word",
                  fontFamily: "monospace",
                  fontSize: "0.9rem",
                  color:"#000",
                }}
              >
                {address || "Address not found"}
              </div>

              <button
                className="add-btn"
                style={{ marginTop: "1rem" }}
                onClick={copyWalletAddress}
              >
                Copy Address
              </button>
            </>
          )}
        </div>

        <div className="section-wrap" style={{ marginTop: "2rem" }}>
          <h2 style={{ fontWeight: "700", fontSize: "1rem" }}>Instructions</h2>
          <ul style={{ fontSize: "0.85rem", color: "#333", marginTop: "0.75rem", paddingLeft: "1rem" }}>
            <li>Send USDT (BEP20) to the above wallet address.</li>
            <li>Only send from wallets you control (avoid exchanges).</li>
            <li>Transaction will be confirmed after 1 block confirmation.</li>
            <li>Gas fee is very low (~0.0001 ETH).</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
