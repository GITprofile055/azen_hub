import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import axios from "axios";
import Api from "../../Requests/Api";
import Collapse from 'react-collapse';


import { SlArrowRight } from "react-icons/sl";
import TradingChart from "./TradingChart";
import { jwtDecode } from 'jwt-decode';
import { useTranslation } from 'react-i18next';

const symbols = ["dogeusdt", "ethusdt", "dotusdt", "nearusdt"];


const NodeDetails = () => {
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
        <h1>Purchage</h1>
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
                <button className="buy-now">Buy</button>
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