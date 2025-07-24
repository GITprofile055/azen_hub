import React, { useState, useEffect } from "react";
import Slider from "react-slick";
// App.js ya index.js me
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Api from "../../Requests/Api";
import { Toaster, toast } from 'react-hot-toast';
const Server = () => {
  const [dailyRewards, setDailyRewards] = useState([]);
  const [connect, setConnected] = useState(false);
  const [eligibleRewardId, setEligibleRewardId] = useState(null);
  const [lastClaimedDay, setLastClaimedDay] = useState(null);
  const [claimedRewards, setClaimedRewards] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState({});
  const [error, setError] = useState();
  const [showPopup, setShowPopup] = useState(false); 
  const [claimedAmount, setClaimedAmount] = useState("0.00 USDT");
  const [todayReward, setTodayreward] =useState(); 
  const [communityTasks, setTasks] = useState([]); 
  const [claimableTasks, setClaimableTasks] = useState({});
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    fetchRewards();
    Claimed();
    getTaskRecord();
     setShowModal(false);
  }, []);


  const fetchRewards = async () => {
    try {
      const response = await Api.get('/baycoin', { Coins: "newBalance" });
      if (response?.data) {
        setDailyRewards(response.data.data);
      }
      else {
        console.error("API Response:", error);
      }
      if (response.data.u_id) {
        setConnected(true);
      }
      else {
        setConnected(false);
      }
    } catch (error) {
      toast.error("❌ Fetching rewards failed:", error, { duration: 1000 });
    }
  };
  const Claimed = async () => {
    try {
      const response = await Api.get('/claim-day');
      setTodayreward(response.data.todayr);
      // console.log(response.data);   
      if (response.data.lastClaimed) {
        const lastClaimedTimestamp = new Date(response.data.lastClaimed).getTime();
        const nowTimestamp = new Date().getTime();
        // Convert to day numbers
        const lastClaimedDay = Math.floor(lastClaimedTimestamp / (1000 * 60 * 60 * 24));
        const nowDay = Math.floor(nowTimestamp / (1000 * 60 * 60 * 24));

        // Calculate days missed
        const daysMissed = nowDay - lastClaimedDay;

        // Check if user skipped 2+ days
        if (daysMissed >= 2) {
          setEligibleRewardId(response.data.userClaimsCount + daysMissed);
        } else {
          // Check if 24 hours have passed since last claim
          const hoursPassed = (nowTimestamp - lastClaimedTimestamp) / (1000 * 60 * 60);
          if (hoursPassed >= 24) {
            setEligibleRewardId(response.data.userClaimsCount + 1);
          } else {
            setEligibleRewardId(null); // Block claiming before 24 hours
          }
        }

        setLastClaimedDay(response.data.userClaimsCount);
      } else {
        setEligibleRewardId(1);
        setLastClaimedDay(0);
      }
    } catch (error) {
      // console.log(response.data);
      toast.error(error, '❌ Failed to fetch claim data', { duration: 1000 });
    }
  };

  const handleClaim = async (reward) => {
    if (reward.id !== eligibleRewardId) {
      toast.error("❌ You must wait 24 hours before claiming the next reward!", { duration: 1000 });
      // setIsModalOpen(true);
      return;
    }

    try {
      const response = await Api.post('/claim-reward', { rewardId: reward.id });
      if (response?.data?.success) {
        setClaimedRewards([...claimedRewards, reward.id]);
        // setIsModalOpen(true);
        console.log(response.data);
        setClaimedAmount(`${response.data.Reward}0 USDT`);
        setShowPopup(true);
        // toast.success("🎉 Reward claimed successfully!",{ duration: 1000 });
        // alert("🎉 Reward claimed successfully!");
        Claimed(); // Refresh claim status
      } else {
        throw new Error("Claim failed");
      }
    } catch (error) {
      // console.error("❌ Claiming reward failed:", error);
      toast.error("Oops! Someting went Wrong", { duration: 1000 });
      // setIsModalOpen(true);
    }
  };


       const getTaskRecord = async () => {
        try {
         const response = await Api.get("/getTasks");
         setTasks(response.data); 
        } catch (error) {
         console.error("Error fetching user info:", error);
       }
       };

  const handleStart = async (taskId,taskUrl) => {
    window.open(taskUrl, "_blank");
    setLoadingTasks((prev) => ({ ...prev, [taskId]: true }));
    const response = await Api.post("/startTask", {task_id: taskId} );
    setTimeout(() => {
      setLoadingTasks((prev) => ({ ...prev, [taskId]: false }));
      setClaimableTasks((prev) => ({ ...prev, [taskId]: true }));
    }, 50000);
  };

    const handClaim = async (taskId) => {
      try {
        const response = await Api.post("/claimTask",{task_id: taskId }); // Axios automatically parses JSON
       
        setLoadingTasks((prev) => ({ ...prev, [taskId]: true }));
        setTimeout(() => {
          setLoadingTasks((prev) => ({ ...prev, [taskId]: false }));
          setShowModal(true);
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === taskId ? { ...task, status: "completed" } : task
            )
          );
        }, 5000);
        console.log(response?.data);
        setClaimedAmount(`${response.data.Reward}0 USDT`);
        setShowPopup(true);
      } catch (error) {
        toast.error("Error fetching user info:", error,{ duration: 1000 });
        if (error.response) {
          const errorMessage = error.response.data.message || "An error occurred";
          // console.log(error.response.data.message);
          toast.error(errorMessage,{ duration: 1000 });
          // setIsModalOpen(true);
        } else {
          toast.error("Something went wrong. Please try again.",{ duration: 1000 });
          // setIsModalOpen(true)
        }
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
  const styles = {
    checkinButton: {
      padding: '10px 20px',
      backgroundColor: '#00c853',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1rem',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    popup: {
      textAlign: 'center',
      color: 'white',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    iconGlow: {
      width: '120px',
      height: '120px',
      margin: '0 auto 1rem',
      background: 'radial-gradient(circle, #d9ff00, #aaff00)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'glowPulse 1.5s infinite',
    },
    rewardImage: {
      width: '100px',
      height: '100px',
    },
    amount: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
    },
    okButton: {
      backgroundColor: '#c6ff30',
      border: 'none',
      padding: '0.6rem 6rem',
      fontSize: '1rem',
      fontWeight: 'bold',
      borderRadius: '9999px',
      cursor: 'pointer',
      color: 'black',
    },
    // Add keyframes in CSS (not supported inline)
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
          <Toaster position="top-right" reverseOrder={false} />
          {showPopup && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h2 style={styles.title}>Congrats!</h2>
            <div style={styles.iconGlow}>
              <img
                src="static/img/usdt.png"
                alt="Z Coin"
                style={styles.rewardImage}
              />
            </div>
            <div style={styles.amount}>{claimedAmount}</div>
            <button style={styles.okButton} onClick={() => setShowPopup(false)}>
              OK
            </button>
          </div>
        </div>
      )}

          {/* Keyframes animation must still go in <style> tag */}
          <style>{`
        @keyframes glowPulse {
          0% { box-shadow: 0 0 5px #c6ff30; }
          50% { box-shadow: 0 0 20px #c6ff30; }
          100% { box-shadow: 0 0 5px #c6ff30; }
        }
      `}</style>
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
          <h2 style={{ fontSize: '2rem' }}>{parseFloat(todayReward ? todayReward : 0).toFixed(2)}</h2>
        </div>




        <div class="checkin-card">
          <div class="checkin-header">
            <h3>Check-in Rewards</h3>
            <span class="checkin-rule">Rule ℹ️</span>
          </div>

          <div class="checkin-days">
            {dailyRewards.map((reward) => (
              <div class="checkin-day" key={reward.id}>
                <div class={`reward-box ${reward.id === eligibleRewardId ? "active" : "disabled"}`}>

                  {/* <span class="reward-x2">×2</span> */}

                  <div class="reward-icon">
                    <img src="static/img/usdt.png" alt="USDT Logo" style={{ width: '25px', height: '25px', imageRendering: 'crisp-edges', borderRadius: '.6rem', }} />
                  </div>
                  +{parseFloat(reward.coin).toFixed(2)}
                </div>
                <div>Day {reward.id}</div>
              </div>
            ))}

          </div>

          <button class="checkin-button" onClick={() => {
            const rewardToClaim = dailyRewards.find(r => r.id === eligibleRewardId);
            if (rewardToClaim) {
              handleClaim(rewardToClaim);
            } else {
              toast.error("❌ You already Claim reward Today !", { duration: 1000 });
            }
          }
          }>Check-in</button>
        </div>


        <div
          style={{ marginTop: '1.5rem', background: '#fff', borderRadius: '1rem', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="https://cdn-icons-png.flaticon.com/512/4712/4712106.png" width="60"
            style={{ borderRadius: '0.5rem' }} />
          <div style={{ flex: '1' }}>
            <strong>Train AI Agent</strong><br />
            <span style={{ fontSize: '0.8rem', color: '#666' }}>💰 +20 Z</span>
          </div>
          <button
            style={{ background: '#c6ff30', padding: '0.5rem 1rem', border: 'none', borderRadius: '1.5rem', fontWeight: '600' }}>Train
            now</button>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem' }}>Beginner Quest</h3>
          <div style={{ display: 'flex', overflow:'scroll',scrollbarWidth: 'none'}}>
            {communityTasks.map((task) => (
  <div
    key={task.id}
    style={{
      flex: 1,
      background: '#fff',
      borderRadius: '1rem',
      padding: '1rem',
      textAlign: 'center',
      margin: '0.5rem',
    }}
  >  
   <div style={{display:'flex'}}>
    <img src={task.icon} alt={task.name} className="w-11 h-12" style={{width: 20, height: 20}} />
    <p className="text-black font-bold" style={{marginLeft:5}}>{task.name}</p>
    </div>
    <div style={{display:'flex', margin: '5px 0px 0px 10px' }}>
    <p style={{ marginBottom: '0.4rem',fontWeight: 800, }}>+{parseFloat(task.reward ? task.reward :0).toFixed(2)}</p>
     <img src="static/img/usdt.png" alt={task.name} className="w-11 h-12" style={{width: 20, height: 20}} />
     </div>
    {task.status === "completed" ? (
      <button disabled
        style={{
          background: '#c6ff30',
          border: 'none',
          padding: '0.2rem 1rem',
          borderRadius: '1.5rem',
          fontWeight: 400,
        }}
      >
        Linked
      </button>

    ) : claimableTasks[task.id] ? (
      <button
        onClick={() => handClaim(task.id)}
        style={{
          background: '#c6ff30',
          border: 'none',
          padding: '0.2rem 1rem',
          borderRadius: '1.5rem',
          fontWeight: 400,
        }}
      >
        Claim
      </button>
    ) : (
      <button
        onClick={() => handleStart(task.id, task.link)}
        disabled={loadingTasks[task.id]}
        style={{
          background: '#c6ff30',
          border: 'none',
          padding: '0.2rem 1rem',
          borderRadius: '1.5rem',
          fontWeight: 400,
        }}
      >
        {loadingTasks[task.id] ? (
          <img src="static/img/loading.gif" alt="USDT Logo" style={{width: '30px', height: '30px', imageRendering: 'crisp-edges', borderRadius: '.6rem', }}  />
        ) : (
          "Link"
        )}
      </button>
    )}
  </div>
))}

          </div>

        </div>

      </section>



    </div>
  );
};

export default Server;






