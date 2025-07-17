import { useState } from "react";
import Api from "../../Requests/Api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = async () => {
    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match!");
      return;
    }
  
    try {
      const response = await Api.post('/changePassword', {
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
  return (
   <div className="register-page">
      <div className="top-bar">
        <span className="back-arrow">←</span>
        <h2>Change Password</h2>
      </div>

      <div className="logo-container">
        <img
          src="a03de29c-dbb0-42af-862d-781fd0849bbb.png"
          alt="logo"
          className="logo"
        />
      </div>

      <div className="email">ashutosh.2209401003@geetauniversity.edu.in</div>

      <div className="form-group">
        <input type="text" placeholder="Enter Verification Code" />
        <span className="send-btn">Send</span>
      </div>

      <div className="form-group">
        <input type="password" placeholder="Enter Password" />
        <span className="eye-icon">👁️</span>
      </div>

      <div className="password-info">
        6 to 16 characters
        <br />
        • Must include: Uppercase letters, lowercase letters, numbers, and symbol
      </div>

      <button className="submit-btn">Submit</button>

      <div className="footer-text">
        By register, you accept our{" "}
        <a href="#">User Agreement</a> and <a href="#">Privacy Policy</a>
      </div>
    </div>
  );
};

export default ChangePassword;
