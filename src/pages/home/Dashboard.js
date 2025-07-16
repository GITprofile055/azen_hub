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

   const [isOpen, setIsOpen] = useState(true); // Modal visibility state

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

      <div class="uni-body pages-index-index">
         <uni-app class="uni-app--showtabbar uni-app--maxwidth">
            <uni-page
               data-page="pages/index/index"> <uni-page-wrapper><uni-page-body>
                  <uni-view data-v-06ae08d2=""
                     class="page">
                     <uni-view data-v-06ae08d2="" class="ellipse"></uni-view>
                     <uni-view
                        data-v-06ae08d2="" class="top-box"><uni-view data-v-06ae08d2="" class="left">
                           <Link to="/profile">
                              <uni-view
                                 data-v-06ae08d2="" class="ava"><img data-v-06ae08d2="" src="/static/ava/ava4.jpg"
                                    alt="" /></uni-view>
                           </Link>

                           <uni-view data-v-06ae08d2="" class="top-text">
                              <uni-view
                                 data-v-06ae08d2="" class="name">{t('welcome')}, {userDetails?.name}</uni-view>
                              <uni-view data-v-06ae08d2=""
                                 class="uid">{t('UID')}: {userDetails?.username}</uni-view>

                           </uni-view>

                        </uni-view><uni-view
                           data-v-06ae08d2="" class="right"><uni-view data-v-06ae08d2="" class="notice"><img
                              data-v-06ae08d2="" src="/static/img/rewards.png" alt=""
                              style={{ width: '28px', filter: 'brightness(0) invert(0)'}}/></uni-view>
                           <Link to="/Notice">
                              <uni-view data-v-06ae08d2="" class="notice"><img
                                 data-v-06ae08d2="" src="/static/img/notice.png" alt=""  style={{filter: 'brightness(0) invert(0)'}} /><uni-view
                                    data-v-06ae08d2=""
                                    class="red-point"></uni-view></uni-view>
                           </Link>
                        </uni-view></uni-view>
                     <uni-view
                        data-v-06ae08d2="" class="balance-card"><uni-view data-v-06ae08d2="" class="first"><uni-view
                           data-v-06ae08d2="" class="balance-title">{t('Balance')} 
                            (USDT)</uni-view></uni-view><uni-view data-v-06ae08d2="" class="second"><uni-view
                              data-v-06ae08d2="" translate="no" class="balance-num">{availbal}</uni-view><uni-view
                                 data-v-06ae08d2="" translate="no" class="profit-num">+0.0000<uni-view
                                    data-v-06ae08d2=""
                                    class="today" style={{color:'#000'}}>Yesterday</uni-view></uni-view></uni-view><uni-view
                                       data-v-06ae08d2="" class="third">
                           <uni-view data-v-06ae08d2=""
                              class="balance-btn">
                              <Link to="/RechargeFunds" style={{ color: '#000', textDecoration: 'none', fontWeight: '500', fontSize: '16px' }}>
                                 Deposit
                              </Link><img data-v-06ae08d2="" src="/static/img/usdtdown.png" style={{filter: 'brightness(0) invert(0)'}}
                                 alt="" /></uni-view>
                           <uni-view data-v-06ae08d2="" class="transfer"><img
                              data-v-06ae08d2="" src="/static/img/transfer.png" alt="" style={{filter: 'brightness(0) invert(0)'}}/></uni-view>

                           <uni-view
                              data-v-06ae08d2="" class="balance-btn"> <Link to="/withdrawReq" style={{ color: '#000', textDecoration: 'none', fontWeight: '500', fontSize: '16px' }}>Withdraw </Link><img data-v-06ae08d2=""
                                 src="/static/img/usdtup.png" alt=""  style={{filter: 'brightness(0) invert(0)'}} /></uni-view>

                        </uni-view></uni-view>
                     <uni-view
                        data-v-06ae08d2="" class="index-title">{t('attention')}</uni-view>
                     <uni-view data-v-06ae08d2=""
                        class="attention-box"> <uni-view data-v-06ae08d2="" class="attention-item"><uni-view
                           data-v-06ae08d2="" class="coin-layer"><img data-v-06ae08d2=""
                              src="/static/coin/eth.png" alt="" /><uni-view data-v-06ae08d2=""
                                 class="coin-name">ETHUSDT<uni-view data-v-06ae08d2=""
                                    class="coin">135.36M</uni-view></uni-view></uni-view><uni-view
                                       data-v-06ae08d2="" class="price">1632.02</uni-view><uni-view data-v-06ae08d2=""
                                          class="prop-updown">+2.85%</uni-view></uni-view><uni-view data-v-06ae08d2=""
                                             class="attention-item"><uni-view data-v-06ae08d2="" class="coin-layer"><img
                                                data-v-06ae08d2="" src="/static/coin/btc.png" alt="" /><uni-view
                                                   data-v-06ae08d2="" class="coin-name">BTCUSDT<uni-view data-v-06ae08d2=""
                                                      class="coin">471.89M</uni-view></uni-view></uni-view><uni-view
                                                         data-v-06ae08d2="" class="price">84465.10</uni-view><uni-view data-v-06ae08d2=""
                                                            class="prop-updown">+0.75%</uni-view></uni-view><uni-view data-v-06ae08d2=""
                                                               class="attention-item"><uni-view data-v-06ae08d2="" class="coin-layer"><img
                                                                  data-v-06ae08d2="" src="/static/coin/xrp.png" alt="" /><uni-view
                                                                     data-v-06ae08d2="" class="coin-name">XRPUSDT<uni-view data-v-06ae08d2=""
                                                                        class="coin">63.62M</uni-view></uni-view></uni-view><uni-view
                                                                           data-v-06ae08d2="" class="price">2.13</uni-view><uni-view data-v-06ae08d2=""
                                                                              class="prop-down">-0.76%</uni-view></uni-view></uni-view>
                     <uni-view
                        data-v-06ae08d2="" class="new-banner">
                        <uni-swiper data-v-06ae08d2="" style={{ height: '165px' }}>
                           <div class="uni-swiper-wrapper">
                              <div class="uni-swiper-slides">
                                 <div class="uni-swiper-slide-frame"
                                    style={{ width: '100%', height: '100%', transform: 'translate(0%, 0px) translateZ(0px)' }}>
                                    <uni-swiper-item data-v-06ae08d2=""
                                       style={{ position: 'absolute', width: '100%', height: '100%', transform: 'translate(0%, 0px) translateZ(0px)' }}><uni-view
                                          data-v-06ae08d2="" class="banner-item"><img data-v-06ae08d2=""
                                             src="/static/img/Registration.png" alt="" /><uni-view
                                                data-v-06ae08d2="" class="banner-title">{t('ExclusiveUsers')}</uni-view><uni-view data-v-06ae08d2=""
                                                class="banner-text">{t('Exclusiverewards')}</uni-view><uni-view data-v-06ae08d2=""
                                                class="banner-btn">{t('rewards')}</uni-view></uni-view></uni-swiper-item>
                                    <uni-swiper-item
                                       data-v-06ae08d2=""
                                       style={{ position: 'absolute', width: '100%', height: '100%', transform: 'translate(100%, 0px) translateZ(0px)' }}><uni-view
                                          data-v-06ae08d2="" class="banner-item"><img data-v-06ae08d2=""
                                             src="/static/img/server-icon.png" alt="" /><uni-view
                                                data-v-06ae08d2="" class="banner-title">Unlock Smart
                                             Trading</uni-view><uni-view data-v-06ae08d2=""
                                                class="banner-text">Unlock Smart Trading with Firefly Star – Try
                                             228 AI Strategies for Free!</uni-view><uni-view
                                                data-v-06ae08d2="" class="banner-btn">Get
                                             Rewards</uni-view></uni-view></uni-swiper-item>
                                    <uni-swiper-item
                                       data-v-06ae08d2=""
                                       style={{ position: 'absolute', width: '100%', height: '100%', transform: 'translate(200%, 0px) translateZ(0px)' }}><uni-view
                                          data-v-06ae08d2="" class="banner-item"><img data-v-06ae08d2=""
                                             src="/static/img/flash.png" alt="" /><uni-view data-v-06ae08d2=""
                                                class="banner-title">Smart Trading</uni-view><uni-view
                                                   data-v-06ae08d2="" class="banner-text">Smart Trading, Steady
                                             Growth – Build Your Wealth with Confidence!</uni-view><uni-view
                                                data-v-06ae08d2="" class="banner-btn">Get
                                             Rewards</uni-view></uni-view></uni-swiper-item>
                                 </div>
                              </div>
                              <div class="uni-swiper-dots uni-swiper-dots-horizontal">
                                 <div class="uni-swiper-dot uni-swiper-dot-active"></div>
                                 <div class="uni-swiper-dot"></div>
                                 <div class="uni-swiper-dot"></div>
                              </div>
                           </div>
                        </uni-swiper></uni-view>

                     <uni-view data-v-06ae08d2="" class="market-box"><uni-view
                        data-v-06ae08d2="" class="market-title">{t('MarketQuotes')}</uni-view>


                        <div style={{ padding: "2px", color: "#fff", maxWidth: "500px" }}>
                           {coinsToShow.map((coin) => {
                              const isPositive = coin.percent >= 0;

                              return (
                                 <div
                                    key={coin.symbol}

                                    // onClick={() => setSelectedSymbol(coin.symbol)} 
                                    onClick={() => coin.symbol && navigate(`/dashboard/TradingChart/${coin.symbol.toUpperCase()}`)}
                                    style={{
                                       display: "flex",
                                       alignItems: "center",
                                       justifyContent: "space-between",
                                       background: "#fff",
                                       padding: "12px",
                                       borderRadius: "10px",
                                       marginBottom: "10px"
                                    }}
                                 >
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                       <img
                                          src={coin.image}
                                          alt={coin.name}
                                          style={{
                                             width: "40px",
                                             height: "40px",
                                             borderRadius: "50%",
                                             marginRight: "10px",
                                             color:"#000"

                                          }}
                                       />
                                       
                                       <div>
                                          <div style={{ fontWeight: "bold",color: "#000" }}>{coin.symbol}</div>
                                          <div style={{ fontSize: "12px", color: "#000" }}>{coin.volume}</div>
                                       </div>
                                    </div>

                                    <div style={{ textAlign: "right", marginRight: "10px" }}>
                                       <div style={{color: "#000"}}>${coin.price?.toFixed(2)}</div>
                                       <div style={{ fontSize: "12px", color: isPositive ? "#0f0" : "#f44" }}>
                                          {coin.change?.toFixed(2)}
                                       </div>
                                    </div>

                                    <div
                                       style={{
                                          backgroundColor: isPositive ? "rgb(21 213 199)" : "#f44336",
                                          color: "#000",
                                          padding: "4px 10px",
                                          borderRadius: "12px",
                                          fontSize: "13px",
                                          minWidth: "60px",
                                          textAlign: "center"
                                       }}
                                    >
                                       {isPositive ? "+" : ""}
                                       {coin.percent?.toFixed(2)}%
                                    </div>
                                 </div>
                              );
                           })}

                           {/* Show More / Less Button */}
                           {allCoins.length > 5 && (

                              <uni-view data-v-06ae08d2="" onClick={() => setShowAll(!showAll)}
                                 style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: '3px' }}> {showAll ? "Hide " : "More "}<img
                                    data-v-06ae08d2="" src="/static/img/Expand.png" alt=""
                                    style={{ width: '30px', height: '20px',filter: 'brightness(0) invert(0)' }} /> </uni-view>
                           )}
                        </div>
                        {selectedSymbol && <TradingChart symbol={selectedSymbol} />}



                     </uni-view>
                     <uni-view
                        data-v-06ae08d2="" class="market-title"
                        style={{ marginTop: '10px', marginBottom: '8px' }}>{t('FAQ')}</uni-view>
                     <uni-view data-v-06ae08d2=""
                        class="content"
                     >

                        <uni-view
                           data-v-6fe2d4dd="" data-v-06ae08d2="" class="uni-collapse">
                           <uni-view data-v-9da912bc=""
                              data-v-06ae08d2="" class="uni-collapse-item">

                              <uni-view data-v-9da912bc=""
                                 onClick={toggleDropdown}
                                 class="uni-collapse-item__title uni-collapse-item-border">
                                 <uni-view
                                    data-v-9da912bc="" class="uni-collapse-item__title-wrap">
                                    <uni-view
                                       data-v-9da912bc="" class="uni-collapse-item__title-box">
                                       <uni-text
                                          data-v-9da912bc="" class="uni-collapse-item__title-text"><span>{t('HowtoStayUpdated')}</span>
                                       </uni-text>
                                    </uni-view>
                                 </uni-view>
                                 <uni-view
                                    data-v-9da912bc=""
                                    class="uni-collapse-item__title-arrow uni-collapse-item--animation"
                                 >
                                    <uni-text
                                       data-v-45a6b600=""
                                       data-v-9da912bc=""
                                       class="uni-icons"
                                       style={{ color: 'rgb(187, 187, 187)', fontSize: '14px' }}
                                    >
                                       <img
                                          src="/static/img/down-arrow.png"
                                          alt=""
                                          style={{
                                             transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                             transition: "transform 0.3s ease"
                                          }}
                                       />
                                    </uni-text>
                                 </uni-view>

                              </uni-view>
                              <Collapse isOpened={isOpen}
                                 data-v-9da912bc="" class="uni-collapse-item__wrap is--transition"
                                 style={{ height: '0px' }}>
                                 <uni-view data-v-9da912bc="" id="Uni_la5w"
                                    class="uni-collapse-item__wrap-content open">
                                    <uni-view data-v-06ae08d2=""
                                       class="content">
                                       <uni-text data-v-06ae08d2="" class="text"><span>{t('OfficialWebsite')}</span>
                                       </uni-text>
                                       <uni-text data-v-06ae08d2=""
                                          class="text">
                                             {/* <span>Customer Service: Reach out via online chat or
                                             email
                                             support.</span> */}
                                       </uni-text>
                                    </uni-view>
                                 </uni-view>
                              </Collapse>
                           </uni-view>
                        </uni-view>



                        <uni-view
                           data-v-06ae08d2="" class="title">{t('Policy')}</uni-view>

                        <uni-view
                           data-v-06ae08d2="" class="policy-item">{t('FIREFLYAgreement')}<SlArrowRight size={11} style={{ marginLeft: '5px' }} /></uni-view>
                        <uni-view
                           data-v-06ae08d2="" class="policy-item">{t('FireflyServerUsageAgreement')}<SlArrowRight size={11} style={{ marginLeft: '5px' }} /></uni-view>
                     </uni-view>

                  </uni-view>

               </uni-page-body>
               </uni-page-wrapper>
            </uni-page>

         </uni-app>
         <Outlet />
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