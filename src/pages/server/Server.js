import React, { useState, useEffect } from "react";
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
    <div class="">
      <header>
        <h1>Earning</h1>


      </header>

      <section style={{ padding: '1.5rem', fontFamily: 'Inter, sansSerif', background: '#f7f7f7' }}>

        <div style={{
          background: 'linear-gradient(180deg, #0b0b0b, #2c2c2c), url("assets/bg-Dfx17Fkb.jpeg") no-repeat center center',
          backgroundSize: 'cover',
          color: '#fff',
          padding: '2rem 1.2rem',
          borderRadius: '1.2rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: '800' }}>Earning Center</h1>
          <p style={{ fontSize: '0.85rem', color: '#bbb' }}>Boost Your Rewards with Multiple Accounts</p>

          <button style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: '#c6ff30',
            border: 'none',
            padding: '0.3rem 1rem',
            fontWeight: 600,
            borderRadius: '9999px',
          }}>
            Link X
          </button>

          <p style={{ marginTop: '2rem' }}>Total $ZEN</p>
          <h2 style={{ fontSize: '2rem' }}>0</h2>
        </div>




        <div class="checkin-card">
          <div class="checkin-header">
            <h3>Check-in Rewards</h3>
            <span class="checkin-rule">Rule ℹ️</span>
          </div>

          <div class="checkin-days">
            <div class="checkin-day">
              <div class="reward-box active">
                +10
                <div class="reward-icon">Z</div>
              </div>
              <div>Today</div>
            </div>

            <div class="checkin-day">
              <div class="reward-box">+10
                <div class="reward-icon">Z</div>
              </div>
              <div>Day 2</div>
            </div>

            <div class="checkin-day">
              <div class="reward-box">+10
                <div class="reward-icon">Z</div>
              </div>
              <div>Day 3</div>
            </div>

            <div class="checkin-day">
              <div class="reward-box">+20
                <span class="reward-x2">×2</span>
                <div class="reward-icon">Z</div>
              </div>
              <div>Day 4</div>
            </div>

            <div class="checkin-day">
              <div class="reward-box">+20
                <span class="reward-x2">×2</span>
                <div class="reward-icon">Z</div>
              </div>
              <div>Day 5</div>
            </div>

            <div class="checkin-day">
              <div class="reward-box">+20
                <span class="reward-x2">×2</span>
                <div class="reward-icon">Z</div>
              </div>
              <div>Day 6</div>
            </div>

            <div class="checkin-day">
              <div class="reward-box">+20
                <span class="reward-x2">×2</span>
                <div class="reward-icon">Z</div>
              </div>
              <div>Day 7</div>
            </div>
          </div>

          <button class="checkin-button">Check-in</button>
        </div>


        <div
          style={{ marginTop: '1.5rem', background: '#fff', borderRadius: '1rem', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="https://cdn-icons-png.flaticon.com/512/4712/4712106.png" width="60"
            style={{borderRadius: '0.5rem'}} />
          <div style={{flex: '1'}}>
            <strong>Train AI Agent</strong><br />
            <span style={{fontSize: '0.8rem', color: '#666'}}>💰 +20 Z</span>
          </div>
          <button
            style={{ background: '#c6ff30', padding: '0.5rem 1rem', border: 'none', borderRadius: '1.5rem', fontWeight: '600' }}>Train
            now</button>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem' }}>Beginner Quest</h3>
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <div
              style={{
                flex: 1,
                background: '#fff',
                borderRadius: '1rem',
                padding: '1rem',
                textAlign: 'center',
              }}
            >
              <p style={{ marginBottom: '0.4rem' }}>+200 💰</p>
              <button
                style={{
                  background: '#c6ff30',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '1.5rem',
                  fontWeight: 600,
                }}
              >
                Link
              </button>
            </div>

            <div
              style={{
                flex: 1,
                background: '#fff',
                borderRadius: '1rem',
                padding: '1rem',
                textAlign: 'center',
              }}
            >
              <p style={{ marginBottom: '0.4rem' }}>+100 💰</p>
              <button
                style={{
                  background: '#000',
                  color: '#fff',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '1.5rem',
                  fontWeight: 600,
                }}
              >
                Claim
              </button>
            </div>

            <div
              style={{
                flex: 1,
                background: '#fff',
                borderRadius: '1rem',
                padding: '1rem',
                textAlign: 'center',
              }}
            >
              <p style={{ marginBottom: '0.4rem' }}>+200 💰</p>
              <button
                style={{
                  background: '#c6ff30',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '1.5rem',
                  fontWeight: 600,
                }}
              >
                Join
              </button>
            </div>
          </div>

        </div>

      </section>



    </div>
  );
};

export default Server;






