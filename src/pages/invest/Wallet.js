import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";
import Api from "../../Requests/Api";
import { useTranslation } from 'react-i18next';

const Wallet = () => {
  
  const [showAll, setShowAll] = useState(false);
  const [availbal, setAvailableBal] = useState();
  const [userDetails, setUserDetails] = useState(null);
  const { t } = useTranslation();
const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails();
    fetchAvailableBalance();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await Api.get('/user');
      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchAvailableBalance = async () => {
    try {
      const response = await Api.get("/availbal");
      if (response.data?.AvailBalance !== undefined) {
        setAvailableBal(response.data.AvailBalance);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <header>
        <h1>Wallet</h1>
       <Link to="/setting">
       
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" stroke="currentColor"
          strokeWidth="2" viewBox="0 0 24 24" style={{ background: '#f0f0f0', borderRadius: '50%', padding: '8px' }}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.591 1.1c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.1 2.592c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.1 2.591c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.591 1.1c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.592-1.1c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.1-2.591c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.1-2.592c-.94-1.543.826-3.31 2.37-2.37.996.608 2.302.075 2.592-1.1z" />
          <circle cx="12" cy="12" r="3.5" />
        </svg></Link>

      </header>

      <section className="section-wrap">
        <div style={{
          background: 'linear-gradient(135deg, #f1ff34, #64ce0c)',
          borderRadius: '1.2rem',
          padding: '1rem 1.2rem',
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem' }}>
            <img src="https://i.pravatar.cc/60" style={{ width: '50px', height: '50px', borderRadius: '50%' }} alt="avatar" />
            <div>
              <p style={{ fontWeight: 700 }}>Michele</p>
              <p style={{ fontSize: '.75rem' }}>ID:1234322</p>
              <div style={{ marginTop: '.25rem', display: 'flex', gap: '.3rem' }}>
                <img src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png" width="18" alt="icon1" />
                <img src="https://cdn-icons-png.flaticon.com/512/725/725643.png" width="18" alt="icon2" />
                <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" width="18" alt="icon3" />
                <img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" width="18" alt="icon4" />
              </div>
            </div>
          </div>
          <span style={{ background: '#b6f2a5', padding: '.2rem .6rem', fontSize: '.75rem', borderRadius: '9999px' }}>
            Mystery Box2323
          </span>
        </div>

        <div style={{
          background: 'linear-gradient(180deg, #f1ff34, #ffffff)',
          borderRadius: '1.2rem',
          border: '1px solid rgb(235, 232, 232)',
          padding: '1.2rem',
          marginBottom: '1rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.4rem' }}>
            <span style={{ fontSize: '.85rem', color: 'gray' }}>Available $XaZen</span>
            <span style={{ fontSize: '.8rem', color: 'gray' }}>交易记录</span>
          </div>

          <h2 style={{ fontSize: '2rem', fontWeight: 900, margin: 0 }}>34,324.21</h2>
         <button
  onClick={() => navigate("/withdraw-req")}
  style={{
    width: '100%',
    marginTop: '1rem',
    padding: '.6rem',
    borderRadius: '9999px',
    border: 'none',
    background: '#000',
    color: '#fff',
    fontWeight: 600
  }}
>
  Withdraw to Wallet
</button>

          <hr style={{ height: '0.5px', backgroundColor: 'rgb(232, 232, 232)', border: 0, marginTop: '15px' }} />
          <p style={{ textAlign: 'center', fontSize: '.75rem', color: 'gray', marginTop: '.8rem' }}>
            Understand the aZen ecosystem token $XaZen
          </p>
        </div>

        <div style={{
          background: 'linear-gradient(to right, #6a11cb, #2575fc)',
          borderRadius: '1.2rem',
          padding: '1.2rem',
          color: 'white',
          marginBottom: '1rem'
        }}>
          <p style={{ fontSize: '.75rem' }}>HTxYDiAD***KY <img src="https://cdn-icons-png.flaticon.com/512/1828/1828774.png" width="14" alt="copy" style={{ verticalAlign: 'middle' }} /></p>
          <p style={{ fontSize: '.9rem', margin: '.5rem 0 0' }}>0.00 <small style={{ opacity: .8 }}>Solana</small></p>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '.2rem 0 1rem' }}>9,947.54</h3>
          <button style={{
            width: '100%',
            padding: '.6rem',
            borderRadius: '9999px',
            border: 'none',
            background: '#fff',
            color: '#000',
            fontWeight: 600
          }}>
            Open Wallet
          </button>
        </div>

        <div style={{
          background: '#fff',
          border: '1px solid rgb(235, 232, 232)',
          borderRadius: '1.2rem',
          padding: '1rem'
        }}>
          <p style={{ marginBottom: '.6rem', fontWeight: 600 }}>加入社区</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <img src="https://cdn-icons-png.flaticon.com/512/733/733635.png" width="36" alt="telegram"
              style={{ padding: '8px', borderRadius: '12px', background: '#f0f0f0' }} />
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" width="36" alt="discord"
              style={{ padding: '8px', borderRadius: '12px', background: '#f0f0f0' }} />
            <img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" width="36" alt="instagram"
              style={{ padding: '8px', borderRadius: '12px', background: '#f0f0f0' }} />
            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111748.png" width="36" alt="wechat"
              style={{ padding: '8px', borderRadius: '12px', background: '#f0f0f0' }} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Wallet;