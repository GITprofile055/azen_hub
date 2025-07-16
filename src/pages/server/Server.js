import React,{useState, useEffect} from "react";
import Slider from "react-slick";
// App.js ya index.js me
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Api from "../../Requests/Api";
import { Toaster, toast } from 'react-hot-toast';
const Server = () => {
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
            text2:   `To: ${item.period_end}`,
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
        <div class="uni-body pages-server-server">
        <uni-app class="uni-app--showtabbar uni-app--maxwidth">
           <uni-page
              data-page="pages/server/server">
             
              <uni-page-wrapper>
                 <uni-page-body>
                  <Toaster position="top-right" reverseOrder={false} />
                    <uni-view data-v-7542ab04=""
                       class="page">
                       <uni-view data-v-7542ab04="" class="ellipse"></uni-view>
                       <uni-view
                          data-v-7542ab04="" class="page-title">Server</uni-view>
                       <uni-view data-v-7542ab04=""
                          class="top-card">
                          <img data-v-7542ab04=""  style={{filter: 'brightness(0) invert(0)'}} src="/static/img/server-icon.png" alt=""/>
                          <uni-view
                             data-v-7542ab04="" class="title">Start Trading Now!</uni-view>
                          <uni-view
                             data-v-7542ab04="" class="text">Buying a higher-tier server will give you a better
                             experience and greater advantages
                          </uni-view>
                       </uni-view>
                       <uni-view data-v-7cdca4f6="" class="top-group" style={{marginTop:'10px'}}>
                  <uni-view
                    data-v-7cdca4f6=""
                    class="top-btn selected"
                    onClick={() => setActiveTab("running")}
                    style={{
                      backgroundColor:
                        activeTab === "running"
                          ? "#15d5c7"
                          : "#fff",
                      color:
                        activeTab === "running" ? "#000" : "#000;",
                      transition: "all 0.3s ease",
                    }}
                  >
                    BUY
                  </uni-view>

                  <uni-view
                    data-v-7cdca4f6=""
                    class="top-btn selected"
                    onClick={() => setActiveTab("completed")}
                    style={{
                      backgroundColor:
                        activeTab === "completed"
                          ? "#15d5c7"
                          : "#fff",
                      color:
                        activeTab === "completed"
                          ? "#000"
                          : "#000",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Renewal
                  </uni-view>
                  
                </uni-view>
                       <uni-view data-v-7542ab04=""
                          class="container" >
                {activeTab === "running" ? (
                           
                          <uni-swiper data-v-7542ab04="" class="swiper">
                             <div class="uni-swiper-wrapper">
                                <div class="uni-swiper-slides">
                                   <div class="uni-swiper-slide-frame"
                                      style={{width: '100%', height: '340px', transform: 'translate(0%, 0px) translateZ(0px)'}}>
                                    
                                    <uni-swiper-item
   data-v-7542ab04=""class="product-card" style={{marginTop:'10px',borderRadius:'10px', backgroundColor:'#fff'}} 
   >
   <Slider {...settings}>
      {slides.map((slide, index) => (
      <uni-view data-v-b19b400c=""  key={index}>
         <uni-view
            data-v-b19b400c="" class="box">
            <uni-view data-v-b19b400c=""  
               class="left"><img data-v-b19b400c=""
               src="/static/img/cardleft.pn"
               alt=""/></uni-view>
            <uni-view data-v-b19b400c=""
               class="mid">
               <uni-view data-v-b19b400c=""
                  class="card-header">
                  <uni-view data-v-b19b400c=""style={{ marginTop:'20px'}}
                     class="title">{slide.title}
                  </uni-view>
                  <uni-text data-v-b19b400c=""
                     class="price">
                       {slide.price === "0" ? (
                        "Free"
                          ) : (
                               <>
                           {slide.price}
                        <span style={{fontSize: '14px', lineHeight: '17px', color: 'rgba(255, 255, 255, 0.5)'}}>/{slide.days} Days</span>
                              </>
                                  )}

                  </uni-text>
               </uni-view>
               <uni-view
                  data-v-b19b400c=""
                  class="card-title">{slide.heading}</uni-view>
               <uni-view
                  data-v-b19b400c="" class="card-body">
                  <uni-view
                     data-v-b19b400c="" class="benefit-item">
                     <img
                     data-v-b19b400c="" src="/static/img/check.png"
                     alt=""
                     style={{width: '20px', marginRight: '5px',filter: 'brightness(0) invert(0)'}}/>
                     <uni-text
                        data-v-b19b400c=""
                        class="benefit-text"><span>{slide.text}</span>
                     </uni-text>
                  </uni-view>
               
               </uni-view>
               <uni-view
                  data-v-b19b400c="" class="card-body">
                  <uni-view
                     data-v-b19b400c="" class="benefit-item">
                     <img
                     data-v-b19b400c="" src="/static/img/check.png"
                     alt=""
                     style={{width: '20px', marginRight: '5px',filter: 'brightness(0) invert(0)'}}/>
                     <uni-text
                        data-v-b19b400c=""
                        class="benefit-text"><span>{slide.text1}- {slide.text2}</span>

                     </uni-text>
                  </uni-view>
               
               </uni-view>
               {/* <uni-view
                  data-v-b19b400c="" class="card-body">
                  <uni-view
                     data-v-b19b400c="" class="benefit-item">
                     <img
                     data-v-b19b400c="" src="/static/img/check.png"
                     alt=""
                     style={{width: '20px', marginRight: '5px'}}/>
                     <uni-text
                        data-v-b19b400c=""
                        class="benefit-text"><span>{slide.text2}</span>

                     </uni-text>
                  </uni-view>
               
               </uni-view> */}
               <uni-view
                  data-v-b19b400c="" class="card-footer">
                  <uni-button
                     data-v-b19b400c=""
                     class="subscribe-button"  onClick={() => handleBuyClick(slide)}>Buy</uni-button>
               </uni-view>
            </uni-view>
            <uni-view
               data-v-b19b400c="" class="right"><img data-v-b19b400c=""
               src="{{asset('')}}static/img/cardright.png"
               alt=""/></uni-view>
         </uni-view>
      </uni-view>
      ))}
   </Slider>
   </uni-swiper-item>
       
                                     
                                   </div>
                                </div>
                             </div>
                          </uni-swiper>
                ) : (
   
<uni-page-body>
   <uni-view data-v-7542ab04="" class="page">
     
      <uni-view data-v-7542ab04="" class="content">
   <uni-view data-v-7542ab04="" class="list-box">
   {servers.map((server, index) => (
  <uni-view key={index} data-v-7542ab04="" class="server-item">
    <img data-v-7542ab04=""  style={{filter: 'brightness(0) invert(0)'}}  src={`/static/img/S${(index % 4) + 1}.png`} alt="" />
    ${server.amount}
    <uni-view data-v-7542ab04="" class="item-no">
      {server.serverhash}
      <uni-view data-v-7542ab04="" class="expired-time">{server.sdate}</uni-view>
    </uni-view>
    <uni-view
      data-v-7542ab04=""
      class={`renew ${index % 2 === 0 ? 'unrenew' : ''}`}
      onClick={() => handleRenew(server.serverhash, server.amount)}
    >
      Renewal
    </uni-view>
  </uni-view>
))}


      
   </uni-view>
</uni-view>
    
   </uni-view>
</uni-page-body>

                
               //    <uni-view data-v-7cdca4f6="" class="history-box" >
               //    <uni-view data-v-7cdca4f6="" class="nodata">
               //      <img
               //        data-v-7cdca4f6=""
               //        src="/static/img/nodata.png"
               //        alt=""
               //      />
               //      No Data
               //    </uni-view>
               //  </uni-view>
              )}
                       </uni-view>
                  
                    </uni-view>
                 </uni-page-body>
              </uni-page-wrapper>
           </uni-page>
      
      
        </uni-app>


        
       </div>
    );
};

export default Server;






