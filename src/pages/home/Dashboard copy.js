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
  const [cryptoData, setCryptoData] = useState({});
  const [binanceSymbols, setBinanceSymbols] = useState([]);
  const [showAll, setShowAll] = useState(false); // toggle state
  const toggleDropdown = () => setIsOpen(!isOpen);


  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 20,
            page: 1,
            sparkline: false
          }
        });

        const formatted = {};
        const binanceSyms = [];

        res.data.forEach((coin) => {
          const symbol = `${coin.symbol}usdt`.toUpperCase();
          formatted[symbol] = {
            id: coin.id,
            name: coin.name,
            symbol: symbol,
            image: coin.image,
            price: coin.current_price,
            change: coin.price_change_24h,
            percent: coin.price_change_percentage_24h,
            volume: (coin.total_volume / 1_000_000).toFixed(2) + "M"
          };
          binanceSyms.push(symbol.toLowerCase());
        });

        setCryptoData(formatted);
        setBinanceSymbols(binanceSyms);
      } catch (error) {
        console.error("CoinGecko fetch error:", error);
      }
    };

    fetchCrypto();
  }, []);

  useEffect(() => {
    if (binanceSymbols.length === 0) return;

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${binanceSymbols
        .map((s) => `${s}@ticker`)
        .join("/")}`
    );

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      const data = msg.data;

      setCryptoData((prev) => {
        const existing = prev[data.s];
        if (!existing) return prev;

        return {
          ...prev,
          [data.s]: {
            ...existing,
            price: parseFloat(data.c),
            change: parseFloat(data.p),
            percent: parseFloat(data.P),
            volume: (parseFloat(data.v) / 1_000_000).toFixed(2) + "M"
          }
        };
      });
    };

    return () => ws.close();
  }, [binanceSymbols]);

  const allCoins = Object.values(cryptoData);
  const coinsToShow = showAll ? allCoins : allCoins.slice(0, 5);
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
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '1.2rem',
        padding: '0.5rem',
        margin: '0 1rem 1rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem' }}>
          <img src="https://i.pravatar.cc/60" style={{ width: '50px', height: '50px', borderRadius: '50%' }} alt="avatar" />
          <div>
            <p style={{ fontWeight: 700 }}>{userDetails?.name}</p>
            <p style={{ fontSize: '.75rem' }}>ID: {userDetails?.username}</p>

          </div>
        </div>
        <span style={{ background: '#b9ff7bff', padding: '.2rem .6rem', fontSize: '.75rem', borderRadius: '9999px' }}>
          aZen 0
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
      {/* <div className="action-row">
        <div className="action-icons">
          <Link to="/deposit" style={{ textDecorationLine: 'none' }}>

            <img src="static/img/earn.png" alt="withdraw"  />

            <p>Earn</p>
          </Link>

        </div>
        <div className="action-icons">
          <Link to="/withdraw-req" style={{ textDecorationLine: 'none' }}>

            <img src="static/img/trade.png" alt="withdraw" />
            <p>Trade</p>
          </Link>

        </div>
        <div className="action-icons">
          <Link to="/transfer" style={{ textDecorationLine: 'none' }}>

            <img src="static/img/invite.png" alt="transfer" />
            <p>Invite</p>
          </Link>

        </div>

      </div> */}
      {/* === aZen DePIN === */}
      <div className="section-wrap">
        <div className="sec-head">
          <h4>Earning Center</h4>
        </div>
        <div className="depin-card">
          <div>
            <p className="big-num">20</p>
            <p className="connected-devices">Total $ZEN </p>
            <button className="add-btn">Earn Now</button>
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

















// binance api implement




// import TradingChart from "./TradingChart";

// const symbols = ["dogeusdt", "ethusdt", "dotusdt", "nearusdt"];

// const [prices, setPrices] = useState({});
// const [selectedSymbol, setSelectedSymbol] = useState(null); // 👈 chart state

// useEffect(() => {
//    const ws = new WebSocket(
//       `wss://stream.binance.com:9443/stream?streams=${symbols
//          .map((s) => `${s}@ticker`)
//          .join("/")}`
//    );

//    ws.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       const data = message.data;
//       setPrices((prev) => ({
//          ...prev,
//          [data.s]: {
//             symbol: data.s,
//             price: parseFloat(data.c),
//             change: parseFloat(data.p),
//             percent: parseFloat(data.P),
//             volume: (parseFloat(data.v) / 1_000_000).toFixed(2) + "M"
//          }
//       }));
//    };

//    return () => ws.close();
// }, []);

// return (
//    <div style={{ padding: "16px", background: "#141417", color: "#fff", borderRadius: "10px", maxWidth: "600px" }}>
//       {Object.values(prices).map((coin) => {
//          const isPositive = coin.percent >= 0;
//          return (
//             <div
//                key={coin.symbol}
//                onClick={() => setSelectedSymbol(coin.symbol)} // 👈 set chart
//                style={{
//                   cursor: "pointer",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   background: "#1e1e22",
//                   padding: "12px",
//                   borderRadius: "10px",
//                   marginBottom: "10px"
//                }}
//             >
//                <div style={{ display: "flex", alignItems: "center" }}>
//                   <img
//                      src={`https://cryptologos.cc/logos/${coin.symbol.toLowerCase().replace("usdt", "")}-logo.png`}
//                      onError={(e) => (e.target.style.display = "none")}
//                      alt={coin.symbol}
//                      style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }}
//                   />
//                   <div>
//                      <div style={{ fontWeight: "bold" }}>{coin.symbol}</div>
//                      <div style={{ fontSize: "12px", color: "#aaa" }}>{coin.volume}</div>
//                   </div>
//                </div>

//                <div style={{ textAlign: "right", marginRight: "10px" }}>
//                   <div>${coin.price.toFixed(4)}</div>
//                   <div style={{ fontSize: "12px", color: isPositive ? "#0f0" : "#f44" }}>
//                      {coin.change.toFixed(4)}
//                   </div>
//                </div>

//                <div style={{
//                   backgroundColor: isPositive ? "#00d0aa" : "#f44336",
//                   color: "#fff",
//                   padding: "4px 10px",
//                   borderRadius: "12px",
//                   fontSize: "13px",
//                   minWidth: "60px",
//                   textAlign: "center"
//                }}>
//                   {isPositive ? "+" : ""}
//                   {coin.percent.toFixed(2)}%
//                </div>
//             </div>
//          );
//       })}

//       {/* 👇 Show chart below if selected */}
//       {selectedSymbol && <TradingChart symbol={selectedSymbol} />}
//    </div>