import React, { useEffect, useState } from 'react';

import { useNavigate, useLocation, Link } from 'react-router-dom';
import Api from "../../Requests/Api";
import { Toaster, toast } from 'react-hot-toast';
import { MdNotifications } from "react-icons/md";


const Notice = () => {
  const navigate = useNavigate();


        const backClick = () => {
    navigate(-1);
  };
    const NotificationCard = ({ title, message, date }) => {
        return (
            <div style={styles.card}>
                <div style={styles.iconContainer}>
                    <MdNotifications size={24} color="#7ED321" />
                </div>
                <div style={styles.textContainer}>
                    <p style={styles.title}>{title}</p>
                    <p style={styles.message}>{message}</p>
                    <p style={styles.date}>{date}</p>
                </div>
            </div>
        );
    };

    const styles = {
        card: {
            display: "flex",
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: "12px",
            margin: "12px 0",
            boxShadow: "0 0 4px rgba(0,0,0,0.1)",
            alignItems: "flex-start",
        },
        iconContainer: {
            backgroundColor: "#E8FDD3",
            padding: 8,
            borderRadius: 10,
            marginRight: 12,
            marginTop: 4,
        },
        textContainer: {
            flex: 1,
        },
        title: {
            fontWeight: "600",
            fontSize: "14px",
            color: "#111",
            margin: 0,
        },
        message: {
            color: "#444",
            fontSize: "12px",
            margin: "6px 0",
        },
        date: {
            color: "#888",
            fontSize: "12px",
            marginTop: "4px",
        },
    };

    return (
     <div className="withdraw-container">
      <div className="top-bar">
        <span className="back-icon" onClick={backClick}>&#8592;</span>
        <h3>Notification</h3>
        <span style={{fontWeight:'600'}}>All read</span>
      </div>
            <NotificationCard
                title="Link Your X Account"
                message="Connect now to unlock more rewards and join the daily prize draw!"
                date="07/22 13:20:37"
            />

            <NotificationCard
                title="🎉1500$AZEN, All rewards have been distributed! 🏆"
                message="🎉 The ZENi × aZen Summer Airdrop Carnival has officially ended, and all rewards have been distributed! 🏆 Huge thanks to everyone who joined and helped make this campaign a success 💜"
                date="07/18 13:02:51"
            />

            <NotificationCard
                title="aZen × @ICPHUBS China Community Quest is LIVE!"
                message="Complete the tasks & WIN 10,000 $AZEN reward!"
                date="07/18 10:21:01"
            />
        </div>
    );
};

export default Notice;




