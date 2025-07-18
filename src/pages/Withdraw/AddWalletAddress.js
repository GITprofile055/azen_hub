import React,{ useState, useEffect } from "react";
import { Link,useParams,useNavigate } from "react-router-dom";
import Api from "../../Requests/Api";
import { toast } from "react-toastify";
const AddWalletAddress = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [address, setAddress] = useState("");
  const { networkType } = useParams();
    const navigate = useNavigate();
  
const saveAddress = async () => {
  try {
     const response = await Api.post(
      `/save-address/${networkType}`,
      {
        address,
        verificationCode,
        networkType  
      },
   
    );

    if (response.data?.alreadySaved) {
        toast.info(response.data.message);  // e.g., "This address is already saved"
      } else {
        toast.success("Address saved successfully!");
        setAddress("");  // Clear form
        setVerificationCode("");
      }
  } catch (error) {
    console.error("Error saving address:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Failed to save address!"); // optional: error toast
  }
};

    const handleSendRequest = async () => {
        try {
          const response = await Api.post('/sendotp');  
          console.log(response);
          if (response?.data?.success) {
            console.log('OTP sent successfully:', response.data);
            toast.success("OTP sent successfully!");
          } else {
            console.warn('Failed to send OTP:', response.data.message);
            toast.error(response?.data?.message || "Failed to send OTP!");
          }
        } catch (error) {
            console.error('Error sending OTP:', error);
            toast.error(error?.response?.data?.message || "Failed to send OTP!");
          }
      };
    //   const [activeTab, setActiveTab] = useState();
    const backClick = () => {
      navigate(-1); // 👈 Go back to the previous page in history
  };
    return (
 <div className="withdraw-container">
      <div className="top-bar">
        <span className="back-icon" onClick={backClick}>&#8592;</span>
        <h3>Manage Wallet</h3>
        <span></span>
      </div>

      <div className="withdraw-box">

     

        {/* Wallet Address */}
        <div className="form-group">
          {/* <label>Enter Wallet Address</label> */}
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

export default AddWalletAddress;

