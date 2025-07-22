import { useState } from "react";
import Api from "../../Requests/Api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';

const PaymentPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if (!password || !passwordConfirmation || !verificationCode) {
      toast.error("All fields are required!");
      return;
    }
    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await Api.post('/PaymentPassword', {
        password,
        password_confirmation: passwordConfirmation,
        verification_code: verificationCode
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setPassword('');
        setPasswordConfirmation('');
        setVerificationCode('');
      } else {
        toast.error(response.data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Error:', err.response);
      toast.error(err.response?.data?.message || "Server error");
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
  const backClick = () => {
    navigate(-1);
  };
  return (
    <div className="withdraw-container">
      <div className="top-bar">
        <span className="back-icon" onClick={backClick}>&#8592;</span>
        <h3>Payment Password</h3>
        <span></span>
      </div>

      <form className="login-form" style={{ padding: "0 1.5rem" }} onSubmit={(e) => {
        e.preventDefault(); // prevent default form submission
        handleChangePassword();
      }}>
        {/* Verification Code */}
        <div className="form-group" style={{ position: "relative", marginBottom: "16px" }}>
          <input
            type="text"
            name="code"
            required
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter Verification Code"
            style={{
              width: "100%",
              padding: "12px 80px 12px 14px",
              fontSize: "14px",
              border: "1px solid #e5e7eb",
              borderRadius: "1rem",
              boxSizing: "border-box",
            }}
          />
          <button
            type="button"
            onClick={handleSendRequest}
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              padding: "6px 12px",
              backgroundColor: "#8ccd41ff",
              color: "#fff",
              fontSize: "12px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>

        {/* Password */}
        <div className="form-group">
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter payment password"
          />
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <input
            type="password"
            name="confirm_password"
            required
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Enter confirm payment password"
          />
        </div>

        <button type="submit" className="login-btn">
          Submit
        </button>
      </form>



    </div>
  );
};

export default PaymentPassword;
