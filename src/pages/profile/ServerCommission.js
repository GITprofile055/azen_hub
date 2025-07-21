import React, { useState, useEffect } from "react";
import Slider from "react-slick";
// App.js ya index.js me
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Api from "../../Requests/Api";
import { Toaster, toast } from 'react-hot-toast';
const ServerCommission = () => {
  const [activeTab, setActiveTab] = useState("running");
  const [slides, setSlides] = useState([]);
  const [servers, setServers] = useState([])

  useEffect(() => {
    fetchwallet();
    fetchrenew();
  }, []);
  const fetchwallet = async () => {
    try {
      const response = await Api.get("/fetchserver");

      if (response.data?.success && Array.isArray(response.data.server)) {
        const serverSlides = response.data.server.map((item, index) => ({
          title: `S${index + 1}-IntelliCalc Edition`,
          heading: "Benefits",
          text: `Amount that can be invested: ${item.invest_amount}`,
          text1: `Optional investment period (hours): ${item.period}`,
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

  const handleBuyClick = async (slideData) => {
    try {
      const response = await Api.post('/submitserver', {
        amount: slideData.text.split(": ")[1],     // Extracts "30"
        period: slideData.text1.split(": ")[1],    // Extracts "8, 12"
        period_end: slideData.text2.split(": ")[1],
        plan: slideData.price,
        days: slideData.days,
      });
      if (response.data.success) {
        toast.success("Purchase successful", response.data.message);
        // console.log("Purchase successful");
      } else {
        toast.error("Purchase failed", response.data.message);
        // console.error("Purchase failed");
      }
    } catch (error) {
      toast.error("Error making purchase:", error);
      // console.error("Error making purchase:", error);
    }
  };

  const fetchrenew = async () => {
    try {
      const response = await Api.get('/fetchrenew');
      if (response.data?.success) {
        setServers(response.data.server); // or .servers if you update backend
      } else {
        console.error("API did not return success");
      }
    } catch (error) {
      console.error("Error fetching servers:", error);
    }
  };

  const handleRenew = async (serverhash, amount) => {
    try {
      const response = await Api.post('/renew-server', { serverhash, amount });
      if (response.data?.success) {
        toast.success("Renewal successful", response.data.message);
        // console.log("Renewal successful");
        fetchrenew(); // Optionally refetch the updated server list
      } else {
        toast.error("Renewal failed", response.data.message);
        // console.error("Renewal failed");
      }
    } catch (error) {
      toast.error("Error during renewal:", error);
    }
  };



  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
    return (

           <div className="uni-body pages-server-server">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="page">
        <div className="ellipse"></div>
        <h2 className="page-title">Server</h2>

        <div className="top-card">
          <img
            src="/static/img/server-icon.png"
            alt="server"
            style={{ filter: "brightness(0) invert(0)" }}
          />
          <h3 className="title">Start Trading Now!</h3>
          <p className="text">
            Buying a higher-tier server will give you a better experience and
            greater advantages
          </p>
        </div>

        <div className="top-group" style={{ marginTop: "10px" }}>
          <div
            className="top-btn"
            onClick={() => setActiveTab("running")}
            style={{
              backgroundColor: activeTab === "running" ? "#15d5c7" : "#fff",
              color: "#000",
              transition: "all 0.3s ease",
            }}
          >
            BUY
          </div>
          <div
            className="top-btn"
            onClick={() => setActiveTab("completed")}
            style={{
              backgroundColor: activeTab === "completed" ? "#15d5c7" : "#fff",
              color: "#000",
              transition: "all 0.3s ease",
            }}
          >
            Renewal
          </div>
        </div>

        <div className="container">
          {activeTab === "running" ? (
            <Slider {...settings} className="swiper">
              {slides.map((slide, index) => (
                <div key={index} className="product-card">
                  <div className="box">
                    <div className="left">
                      <img src="/static/img/cardleft.pn" alt="left" />
                    </div>
                    <div className="mid">
                      <div className="card-header">
                        <h4 className="title" style={{ marginTop: "20px" }}>{slide.title}</h4>
                        <p className="price">
                          {slide.price === "0" ? (
                            "Free"
                          ) : (
                            <>
                              {slide.price}
                              <span className="price-duration">
                                /{slide.days} Days
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                      <div className="card-title">{slide.heading}</div>
                      <div className="card-body">
                        <div className="benefit-item">
                          <img
                            src="/static/img/check.png"
                            alt="check"
                            style={{ width: "20px", marginRight: "5px", filter: "brightness(0) invert(0)" }}
                          />
                          <span className="benefit-text">{slide.text}</span>
                        </div>
                        <div className="benefit-item">
                          <img
                            src="/static/img/check.png"
                            alt="check"
                            style={{ width: "20px", marginRight: "5px", filter: "brightness(0) invert(0)" }}
                          />
                          <span className="benefit-text">{slide.text1} - {slide.text2}</span>
                        </div>
                      </div>
                      <div className="card-footer">
                        <button className="subscribe-button" onClick={() => handleBuyClick(slide)}>
                          Buy
                        </button>
                      </div>
                    </div>
                    <div className="right">
                      <img src="/static/img/cardright.png" alt="right" />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="content">
              <div className="list-box">
                {servers.map((server, index) => (
                  <div key={index} className="server-item">
                    <img
                      src={`/static/img/S${(index % 4) + 1}.png`}
                      alt="server"
                      style={{ filter: "brightness(0) invert(0)" }}
                    />
                    ${server.amount}
                    <div className="item-no">
                      {server.serverhash}
                      <div className="expired-time">{server.sdate}</div>
                    </div>
                    <div
                      className={`renew ${index % 2 === 0 ? "unrenew" : ""}`}
                      onClick={() => handleRenew(server.serverhash, server.amount)}
                    >
                      Renewal
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    );
};

export default ServerCommission;












