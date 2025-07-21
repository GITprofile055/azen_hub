import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { toast } from "react-toastify";

import Api from "../../Requests/Api";
import { Autoplay } from 'swiper/modules';
import { useTranslation } from 'react-i18next';

const NodeDetails = () => {
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [isOpen, setIsOpen] = useState(true); // Modal visibility state
  const [activeIndex, setActiveIndex] = useState(0);
  const [slides, setSlides] = useState([]);



  const handleBuy = async () => {
    const selectedAmount = slides[activeIndex]?.text;

    try {
      const response = await Api.post("/Deposit", {
        amount: selectedAmount
      });

      if (response.data.success) {
        toast.success(response.data.message || "Investment successful!");
      } else {
        toast.error(response.data.message || "Investment failed!");
      }
    } catch (error) {
      console.error("Investment Error:", error);
      toast.error("Something went wrong!");
    }
  };


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

  const [showAll, setShowAll] = useState(false); // toggle state
  const toggleDropdown = () => setIsOpen(!isOpen);


  const [loading, setLoading] = useState(true);
  const [availbal, setAvailableBal] = useState();


  const [userDetails, setUserDetails] = useState(null);
  const token = localStorage.getItem('authToken'); // Retrieve token from localStorage




  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await Api.get('/user');
      setUserDetails(response.data); // This should be your user object
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
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
     
 
      <div className="section-wrap">
        <div className="slider-section">
          {/* Left content */}

          <div className="slider-text">
            {slides[activeIndex] && (
              <>
                <h2>{slides[activeIndex].text} USDT</h2>
                <p>{slides[activeIndex].text1}/days</p>
                <button className="buy-now" onClick={handleBuy}>Buy</button>
              </>
            )}
          </div>

          {/* Right slider */}
          <div className="slider-box">
            <Swiper spaceBetween={20} slidesPerView={1} onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}>
              {[1, 2, 3].map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="slide-wrapper">
                    <img
                      src={`/static/img/slide${slide}.jpeg`}
                      alt={`Slide ${slide}`}
                      className="slide-image" style={{ width: '100%', height: '160px' }}
                    />

                    <div className="overlay">
                      <div className="overlay-top">
                        {/* <button className="buy-now">Buy Now</button> */}
                      </div>

                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

    
      </div>


    </div>

  );

};
export default NodeDetails;

