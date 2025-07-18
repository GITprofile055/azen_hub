import React, { useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import axios from "axios";
import Api from "../../Requests/Api";
import Collapse from 'react-collapse';


import { SlArrowRight } from "react-icons/sl";
import TradingChart from "./TradingChart";
import { jwtDecode } from 'jwt-decode';
import { useTranslation } from 'react-i18next';

const symbols = ["dogeusdt", "ethusdt", "dotusdt", "nearusdt"];


const Dashboard = () => {
   const [selectedSymbol, setSelectedSymbol] = useState(null);
   const navigate = useNavigate();
   const [user, setUser] = useState(null);
   const [isOpen, setIsOpen] = useState(true); 

   const closeModal = () => {
      setIsOpen(false);
   };

   const handleAccept = () => {
      console.log("Account connected with Telegram!");
      setIsOpen(false); 
   };
   const [cryptoData, setCryptoData] = useState({});
   const [binanceSymbols, setBinanceSymbols] = useState([]);
   const [showAll, setShowAll] = useState(false); 
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
 
      {/* === Earnings Card === */}
      <section className="card">
        <p style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.7)' }}>Today Earning</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <span className="value">56,288.20</span>
          <span style={{ fontSize: '.75rem', color: 'var(--lime-400)', fontWeight: 700 }}>$XaZen</span>
        </div>
        <svg className="sparkline" viewBox="0 0 300 90" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke="var(--lime-500)"
            strokeWidth="3"
            strokeLinecap="round"
            points="0,70 50,60 100,65 150,50 200,60 250,35 300,70"
          />
        </svg>
        <div style={{ textAlign: 'center' }}>
          <span className="tag">34,3400 $XaZen</span>
        </div>
      </section>
 
      {/* === aZen DePIN === */}
      <div className="section-wrap">
        <div className="sec-head">
          <h2>Earning Center</h2>
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
              borderRadius: '.6rem',marginLeft: '43px',
            }}
          />
        </div>
        <div className="metrics">
          <div className="metric">
            <p>150.10Hr</p>
            <span>Today's Online</span>
          </div>
          <div className="metric">
            <p>5243.12</p>
            <span>Today's O²</span>
          </div>
        </div>
      </div>
 
      {/* === Referral Banner === */}
      <div className="section-wrap">
        <a href="#" className="banner">
          <img
            src="https://placehold.co/350x96/BAFF2C/000?text=Referral+Rewards+"
            alt="Referral Rewards"
            style={{ width: '100%', display: 'block', borderRadius: '1rem' }}
          />
        </a>
      </div>
 
      {/* === Earning Center === */}
      <div className="section-wrap" style={{ paddingBottom: '2rem' }}>
        <div className="sec-head">
          <h2>Earning Center</h2>
          <a href="#">More ›</a>
        </div>
        <div className="grid2">
          {/* Daily Check */}
          <div className="mini-card">
            <div className="label">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 9l9-7 9 7v11a2 2 0 01-2 2h-3a2 2 0 01-2-2V12H8v8a2 2 0 01-2 2H3a2 2 0 01-2-2V9z"
                />
              </svg>
              Daily Check
            </div>
            <div className="big">
              10<sup style={{ fontSize: '.8rem' }}>O²</sup>
            </div>
            <button className="disabled-btn" disabled>
              Check +10
            </button>
          </div>
 
          {/* Pending Rewards */}
          <div className="mini-card">
            <div className="label">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 6.75V4.5a2.25 2.25 0 10-4.5 0V6.14a3.25 3.25 0 00-1.875 2.86v.75H6.75A2.25 2.25 0 004.5 12v6.75A2.25 2.25 0 006.75 21h10.5A2.25 2.25 0 0019.5 18.75V12a2.25 2.25 0 00-2.25-2.25H13.5v-.75c0-1.3-.816-2.36-1.875-2.86V4.5a2.25 2.25 0 10-4.5 0v2.25"
                />
              </svg>
              Pending Rewards
            </div>
            <div className="big">
              300<sup style={{ fontSize: '.8rem' }}>O²</sup>
            </div>
            <button className="lime-btn">Start Earning</button>
          </div>
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