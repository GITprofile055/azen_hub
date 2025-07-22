import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";
import Api from "../../Requests/Api";
import { useTranslation } from 'react-i18next';
import { Pencil } from 'lucide-react';

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

  const handleGoToProfile = () => {
    navigate('/profile');
  };
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

              <p style={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                {userDetails?.email ? userDetails.email.slice(0, 6) : ''}
              
                <span onClick={handleGoToProfile}
                  style={{
                    borderBottom: '1px solid black',
                    marginLeft: '4px',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  <Pencil size={12} strokeWidth={2} />
                </span>
              </p>


              <p style={{ fontSize: '.75rem' }}>ID: {userDetails?.username}</p>
              <div style={{ marginTop: '.15rem', display: 'flex', gap: '.3rem' }}>
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
        <div className="card inapp-balance-card">
          <p className="section-title">In-App Balance</p>

          <h2 className="main-balance">{availbal}<span className="unit">$</span> <span className="usd"></span></h2>

          <div className="action-row">
            <div className="action-icon">
              <Link to="/deposit" style={{ textDecorationLine: 'none' }}>

                <img src="static/img/deposit.png" alt="withdraw" style={{ width: '42px', height: '42px' }} />

                <p>Deposit</p>
              </Link>

            </div>
            <div className="action-icon">
              <Link to="/withdraw-req" style={{ textDecorationLine: 'none' }}>

                <img src="static/img/withdrawal.png" alt="withdraw" style={{ width: '42px', height: '42px' }} />
                <p>Withdraw</p>
              </Link>

            </div>
            <div className="action-icon">
              <Link to="/transfer" style={{ textDecorationLine: 'none' }}>

                <img src="static/img/transfer.png" alt="transfer" style={{ width: '42px', height: '42px' }} />
                <p>Transfer</p>
              </Link>

            </div>
            <div className="action-icon">
              <Link to="/transaction" style={{ textDecorationLine: 'none' }}>

                <img src="static/img/details.png" alt="details" style={{ width: '42px', height: '42px' }} />
                <p>Details</p>
              </Link>

            </div>
          </div>

          <div className="asset-footer">
            <div>
              <p className="footer-label">0</p>
              <p className="footer-text">NFT&gt;</p>
            </div>
            <div>
              <p className="footer-label">0 USD</p>
              <p className="footer-text">Other Assets&gt;</p>
            </div>
            <button className="withdraw-btn" onClick={() => navigate("/withdraw-req")}>Withdraw</button>
          </div>
        </div>

        <div style={{
          background: "linear-gradient(to right, rgb(206, 161, 255), rgb(146, 187, 255))",
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


      </section>
    </div>
  );
};

export default Wallet;