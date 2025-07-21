import { useState } from "react";
import Api from "../../Requests/Api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendRequest = async () => {
    try {
      const response = await Api.post('/sendForgotOtp', {
        email: email.trim() // Make sure 'email' state variable exists
      });
  
      if (response?.data?.success) {
        toast.success("OTP sent successfully!");
      } else {
        toast.error(response?.data?.message || "Failed to send OTP!");
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error(error?.response?.data?.message || "Failed to send OTP!");
    }
  };
  
  const handleForgotPassword = async () => {
    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match!");
      return;
    }
  
    try {
      const response = await Api.post('/forgotPassword', {
        email,
        password,
        password_confirmation: passwordConfirmation,
        verification_code: verificationCode
      });
  
      if (response.data.success) {
        toast.success(response.data.message);
        setEmail('');
        setPassword('');
        setPasswordConfirmation('');
        setVerificationCode('');
        navigate('/login');

      }
     
      else {
        toast.error(response.data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Error:', err.response);
      toast.error(err.response?.data?.message || "Server error");
    }
  };
  

 
  return (
  <div>
      <div className="logo" style={{ textAlign: 'center', padding: '2rem 1rem 1rem' }}>
        <h1>aZen Hub</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)' }}>Reset password to continue</p>
      </div>

      <form className="login-form" onSubmit={(e) => {
        e.preventDefault();
        handleForgotPassword();
      }} style={{ padding: '0 1.5rem' }}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email or username"
          />
        </div>

         <div className="form-group" style={{ position: "relative" }}>
          <label htmlFor="email">Verification Code</label>

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
              border: "1px solid #ccc",
              borderRadius: "10px",
              boxSizing: "border-box",
            }}
          />
          <button
            type="button"
            onClick={handleSendRequest}
            style={{
              position: "absolute",
              right: "8px",
              top: "70%",
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
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
           <div className="form-group">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            id="password"
            name="password_confirmation"
            required
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Enter confirm password"
          />
        </div>
       
        <button type="submit" className="login-btn">Submit</button>
      </form>

      {/* <div className="footer-text" style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
        Don’t have an account? <Link to="/register">Register</Link>
      </div> */}
    </div>
      );
};

export default ForgotPassword;


//  <div class="uni-body pages-login-forget">
// <uni-app class="uni-app--maxwidth">
//    <uni-page data-page="pages/login/forget">
        
//       <uni-page-wrapper>
//          <uni-page-body>
//             <uni-view data-v-0c515aee="" class="page">
//                <uni-view data-v-0c515aee="" class="ellipse"></uni-view>
//                <uni-view data-v-0c515aee="" class="top-box">
//                   <uni-view data-v-636c600c="" data-v-0c515aee="" class="uni-row" style="margin-left: 0px; margin-right: 0px;">
//                      <uni-view data-v-35b9a113="" data-v-0c515aee="" class="uni-col uni-col-6" style="padding-left: 0px; padding-right: 0px;">
//                         <uni-view data-v-0c515aee="" class="back"><img data-v-0c515aee="" src="/static/img/back.png" alt="" style="width: 35px;"/></uni-view>
//                      </uni-view>
//                      <uni-view data-v-35b9a113="" data-v-0c515aee="" class="uni-col uni-col-12" style="padding-left: 0px; padding-right: 0px;">
//                         <uni-view data-v-0c515aee="" class="page-title">Forget</uni-view>
//                      </uni-view>
//                      <uni-view data-v-35b9a113="" data-v-0c515aee="" class="uni-col uni-col-6" style="padding-left: 0px; padding-right: 0px;"></uni-view>
//                   </uni-view>
//                </uni-view>
//                <uni-view data-v-0c515aee="" class="content">
//                   <uni-view data-v-0c515aee="" class="input-layer">
//                      <uni-view data-v-0c515aee="" class="input-title">Email Address</uni-view>
//                      <uni-view data-v-30449abe="" data-v-0c515aee="" class="uni-easyinput" style="color: rgb(255, 255, 255);">
//                         <uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border " style="border-color: rgba(255, 255, 255, 0.2); background-color: unset;">
//                            <uni-view data-v-30449abe="" class="content-clear-icon"><img data-v-30449abe="" src="/static/img/email-fill.png" alt=""></uni-view>
                             
//                            <uni-input data-v-30449abe="" class="uni-easyinput__content-input" style="padding-left: 10px;">
//                               <div class="uni-input-wrapper">
//                                  <div class="uni-input-placeholder uni-easyinput__placeholder-class" data-v-30449abe="" data-v-0c515aee="" style="display: none;">Please Enter Email Address</div>
//                                  <input maxlength="140" step="" enterkeyhint="done" autocomplete="off" type="" class="uni-input-input">  
//                               </div>
//                            </uni-input>
                             
//                            <uni-text data-v-45a6b600="" data-v-30449abe="" class="uni-icons content-clear-icon uniui-clear" style="color: rgb(192, 196, 204); font-size: 24px;"><span></span></uni-text>
//                         </uni-view>
//                      </uni-view>
//                   </uni-view>
//                   <uni-view data-v-0c515aee="" class="input-layer">
//                      <uni-view data-v-0c515aee="" class="input-title">New Password</uni-view>
//                      <uni-view data-v-30449abe="" data-v-0c515aee="" class="uni-easyinput" style="color: rgb(255, 255, 255);">
//                         <uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border " style="border-color: rgba(255, 255, 255, 0.2); background-color: unset;">
                             
//                            <uni-input data-v-30449abe="" class="uni-easyinput__content-input" style="padding-left: 10px;">
//                               <div class="uni-input-wrapper">
//                                  <div class="uni-input-placeholder uni-easyinput__placeholder-class" data-v-30449abe="" data-v-0c515aee="" style="display: none;">Please enter new password</div>
//                                  <input maxlength="140" step="" enterkeyhint="done" autocomplete="off" type="password" class="uni-input-input">  
//                               </div>
//                            </uni-input>
//                            <uni-text data-v-45a6b600="" data-v-30449abe="" class="uni-icons content-clear-icon uniui-eye-filled" style="color: rgb(192, 196, 204); font-size: 22px;"><span></span></uni-text>
//                            <uni-text data-v-45a6b600="" data-v-30449abe="" class="uni-icons content-clear-icon uniui-clear" style="color: rgb(192, 196, 204); font-size: 24px;"><span></span></uni-text>
//                         </uni-view>
//                      </uni-view>
//                   </uni-view>
//                   <uni-view data-v-0c515aee="" class="input-layer">
//                      <uni-view data-v-0c515aee="" class="input-title">Confirm Password</uni-view>
//                      <uni-view data-v-30449abe="" data-v-0c515aee="" class="uni-easyinput" style="color: rgb(255, 255, 255);">
//                         <uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border " style="border-color: rgba(255, 255, 255, 0.2); background-color: unset;">
                             
//                            <uni-input data-v-30449abe="" class="uni-easyinput__content-input" style="padding-left: 10px;">
//                               <div class="uni-input-wrapper">
//                                  <div class="uni-input-placeholder uni-easyinput__placeholder-class" data-v-30449abe="" data-v-0c515aee="">Please enter your new password again</div>
//                                  <input maxlength="140" step="" enterkeyhint="done" autocomplete="off" type="password" class="uni-input-input">  
//                               </div>
//                            </uni-input>
                             
//                         </uni-view>
//                      </uni-view>
//                   </uni-view>
//                   <uni-view data-v-0c515aee="" class="input-layer">
//                      <uni-view data-v-0c515aee="" class="input-title">Verification Code</uni-view>
//                      <uni-view data-v-30449abe="" data-v-0c515aee="" class="uni-easyinput" style="color: rgb(255, 255, 255);">
//                         <uni-view data-v-30449abe="" class="uni-easyinput__content is-input-border " style="border-color: rgba(255, 255, 255, 0.2); background-color: unset;">
                             
//                            <uni-input data-v-30449abe="" class="uni-easyinput__content-input" style="padding-right: 10px; padding-left: 10px;">
//                               <div class="uni-input-wrapper">
//                                  <div class="uni-input-placeholder uni-easyinput__placeholder-class" data-v-30449abe="" data-v-0c515aee="">Please Enter Verification Code</div>
//                                  <input maxlength="140" step="" enterkeyhint="done" autocomplete="off" type="" class="uni-input-input">  
//                               </div>
//                            </uni-input>
                             
//                            <uni-view data-v-0c515aee="" class="resend">Send</uni-view>
//                         </uni-view>
//                      </uni-view>
//                   </uni-view>
//                </uni-view>
//                <uni-view data-v-0c515aee="" class="submit">Submit</uni-view>
//             </uni-view>
//          </uni-page-body>
//       </uni-page-wrapper>
//    </uni-page>
   
// </uni-app>

// </div> 