import { useState } from "react";
import Api from "../../Requests/Api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async () => {
    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await Api.post("/changePassword", {
        password,
        password_confirmation: passwordConfirmation,
        verification_code: verificationCode,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setPassword("");
        setPasswordConfirmation("");
        setVerificationCode("");
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error:", err.response);
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  const handleSendRequest = async () => {
    try {
      const response = await Api.post("/sendotp");
      console.log(response);
      if (response?.data?.success) {
        console.log("OTP sent successfully:", response.data);
        toast.success("OTP sent successfully!");
      } else {
        console.warn("Failed to send OTP:", response.data.message);
        toast.error(response?.data?.message || "Failed to send OTP!");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error(error?.response?.data?.message || "Failed to send OTP!");
    }
  };
  return (
    <div>
      <div
        className="settings-header"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 0",
          borderBottom: "1px solid #ddd",
        }}
      >
        <span
          className="settings-back"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#333",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          ←
        </span>

        <h2
          className="settings-title"
          style={{
            fontSize: "18px",
            fontWeight: "600",
            margin: 0,
            color: "#222",
          }}
        >
          Change Password
        </h2>
      </div>

      <form className="login-form" style={{ padding: "0 1.5rem" }}>
        <div
          className="form-group"
          style={{ position: "relative", marginBottom: "16px" }}
        >
          <input
            type="text"
            name="code"
            required
         
            placeholder="Enter Verification Code"
            style={{
              width: "100%",
              padding: "12px 80px 12px 14px", // space for button on the right
              fontSize: "14px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              boxSizing: "border-box",
            }}
          />
          <button
            type="button"
            // define this function
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

        <div className="form-group">
          {/* <label htmlFor="password">Password</label> */}
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <button type="submit" className="login-btn">
          submit
        </button>
      </form>

      {/* <div className="footer-text" style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
         Don’t have an account? <Link to="/register">Register</Link>
       </div> */}
    </div>
  );
};

export default ChangePassword;
