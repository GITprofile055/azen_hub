import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
// import { Pagination } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import axios from "axios";
import Api from "../../Requests/Api";
import Collapse from 'react-collapse';


import { SlArrowRight } from "react-icons/sl";
import TradingChart from "./TradingChart";
import { jwtDecode } from 'jwt-decode';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [isOpen, setIsOpen] = useState(true); // Modal visibility state
  const [activeIndex, setActiveIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [servers, setServers] = useState([])
  const [userPackage, setUserPackage] = useState("");
  const [income ,setIncome] = useState("");
  useEffect(() => {
    fetchwallet();
  }, []);
  const fetchwallet = async () => {
    try {
      const response = await Api.get("/fetchserver");

      if (response.data?.success && Array.isArray(response.data.server)) {
        const serverSlides = response.data.server.map((item, index) => ({
          title: `S${index + 1}-IntelliCalc Edition`,
          heading: "Benefits",
          text: ` ${item.invest_amount} `,
          text1: `Optional investment period (hours): ${item.plan}`,
          text2: `To: ${item.period_end}`,
          price: item.plan === "Free" ? "Free" : item.plan,
          days: item.days,
        }));

        setSlides(serverSlides);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleAccept = () => {
    console.log("Account connected with Telegram!");
    setIsOpen(false); // Close the modal after accepting
  };

  const [loading, setLoading] = useState(true);
  const [availbal, setAvailableBal] = useState();



  const [userDetails, setUserDetails] = useState(null);
  const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

  useEffect(() => {
    fetchUserDetails();
    newpackage();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await Api.get('/user');
      setUserDetails(response.data); // This should be your user object
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const newpackage = async () => {
    try {
    const response = await Api.get('/earning');
    // console.log(response.data.package.amount);
    setUserPackage(response.data.package.amount || 0); // adjust based on actual API structure
    setIncome(response.data.income)
  } catch (error) {
    console.error("Error fetching user details:", error);
  } 
  }
  // }, [token]);
  useEffect(() => {
    withfatch();
  }, []);

  const withfatch = async () => {
    try {
      const response = await Api.get("/availbal");
      if (response.data?.AvailBalance !== undefined) {
        setAvailableBal(response.data.AvailBalance);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { t } = useTranslation();

  return (

    <div>
      <header>
        <h1>aZen Hub</h1>
        <svg className="bell" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </header>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '1.2rem',
        padding: '0.5rem',
        margin: '0 1rem 1rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
      <Link to="/setting" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem' }}>
          <img src="https://i.pravatar.cc/60" style={{ width: '50px', height: '50px', borderRadius: '50%' }} alt="avatar" />
          <div>
            <p style={{ fontWeight: 700 }}>{userDetails?.name}</p>
            <p style={{ fontSize: '.75rem' }}>ID: {userDetails?.username}</p>

          </div>
        </div>
        </Link>
        <span style={{ background: '#b9ff7bff', padding: '.2rem .6rem', fontSize: '.75rem', borderRadius: '9999px' }}>
          ${userPackage ? userPackage : 0}
        </span>
      </div>
      {/* === Earnings Card === */}
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          delay: 2500, // 3 seconds
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]} // ✅ Add Autoplay module here
        style={{ marginLeft: '20px' }}>
        {[1, 2].map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slide-wrapper" style={{ width: '320px', height: '130px' }}>
              <img src={`static/img/slide${slide}.png`} alt={`Slide ${slide}`} className="slide-image" />

              {/* <div className="overlay" style={{ width: '100%', height: 'auto' }}>
                <div className="overlay-top">
                  <span className="price">aZen AI Agent</span>
                  <p className="" style={{ border: '1px solid gray', borderRadius: '5px', padding: '2px' }}>Invite To Earn →</p>
                </div>

                <p className="slide-description">
                  Referral Rewards Upgraded!  </p>
              </div> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="action-row">
        <div className="action-icons">
          <Link to="/deposit" style={{ textDecorationLine: 'none' }}>

            <img src="static/img/guide1.png" alt="withdraw" style={{height:50, marginBottom:10}}/>

            <p>Guide</p>
          </Link>

        </div>
        <div className="action-icons">
          <Link to="/withdraw-req" style={{ textDecorationLine: 'none' }}>

            <img src="static/img/lottery.png" alt="withdraw" style={{height:50, marginBottom:10}}/>
            <p>Lottery</p>
          </Link>

        </div>
        <div className="action-icons">
          <Link to="/transfer" style={{ textDecorationLine: 'none' }}>

            <img src="static/img/invite.png" alt="transfer" />
            <p>Invite</p>
          </Link>

        </div>

      </div>
      {/* === aZen DePIN === */}
      <div className="section-wrap">
        <div className="sec-head">
          <h4>Earning Center</h4>
        </div>
        <div className="depin-card">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
  <img
    src="static/img/usdt.png"
    alt="USDT Logo"
    style={{
      width: '32px',
      height: '32px',
      imageRendering: 'crisp-edges',
      borderRadius: '.6rem',
    }}
  />
  <p className="big-num" style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0 }}>
    {income ? income.toFixed(4) : '0.0000'}
  </p>
</div>

            <p className="connected-devices">Total $ZEN </p>
            <Link to="/server" style={{ textDecorationLine: 'none' }}>
            <button className="add-btn">Earn Now</button>
            </Link>
          </div>
          <img
            src="static/img/image.png"
            alt="Connected Devices Illustration"
            style={{
              flex: 1,
              maxWidth: '138px',
              width: '100%',
              imageRendering: 'crisp-edges',
              borderRadius: '.6rem', marginLeft: '43px',
            }}
          />
        </div>
        {/* <div className="metrics">
          <div className="metric">
            <p>150.10Hr</p>
            <span>Today's Online</span>
          </div>
          <div className="metric">
            <p>5243.12</p>
            <span>Today's O²</span>
          </div>
        </div> */}
      </div>




      <div class="community-card">
        <div class="ai-banner">
          <img src="static/img/ai_bot.png" class="bot-icon" />
          <div class="ai-text">
            <h3>Train AI Agent</h3>
            <p>Grow Your Influence Earn Rewards.</p>
          </div>
          ◉
        </div>

        <hr class="divider" />
        <p class="join-title">Join Community</p>

        <div class="social-icons">
          <div class="icon-box"><i class="fab fa-x-twitter"></i></div>
          <div class="icon-box"><i class="fab fa-telegram-plane"></i></div>
          <div class="icon-box"><i class="fas fa-globe"></i></div>
          <div class="icon-box"><i class="fab fa-linkedin-in"></i></div>
          <div class="icon-box"><i class="fas fa-video"></i></div>
        </div>
      </div>


    </div>

  );

};
export default Dashboard;
