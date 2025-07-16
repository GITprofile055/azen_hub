import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useTranslation();
  const activeFilter = 'invert(78%) sepia(24%) saturate(1531%) hue-rotate(124deg) brightness(85%) contrast(100%)';
  const activeColor = '#15d5c7';

  return (

    <nav>
      <a href="index.html">
        <div className="nav-item active" data-tab="home">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 9.75l8.25-6.615a2 2 0 012.5 0L22 9.75M4.5 10.5V18A2.25 2.25 0 006.75 20.25h3.75v-4.5a1.5 1.5 0 013 0v4.5h3.75A2.25 2.25 0 0021 18V10.5"
            />
          </svg>
          Home
        </div>
      </a>

      <a href="earning.html">
        <div className="nav-item" data-tab="earning">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="1.5" />
          </svg>
          Earning
        </div>
      </a>

      <a href="refer.html">
        <div className="nav-item" data-tab="referral">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <ellipse cx="12" cy="5" rx="7" ry="3" />
            <path d="M5 5v5c0 1.657 3.134 3 7 3s7-1.343 7-3V5" />
            <path d="M5 10v5c0 1.657 3.134 3 7 3s7-1.343 7-3v-5" />
            <path d="M19 15h4m-2 -2v4" stroke="currentColor" />
          </svg>

          Referral
        </div>
      </a>

      <a href="wallet.html">
        <div className="nav-item" data-tab="wallet">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 5h2a2 2 0 012 2v9a2 2 0 01-2 2h-2m0-13H7a2 2 0 00-2 2v9a2 2 0 002 2h10m0-13v13"
            />
          </svg>
          Wallet
        </div>
      </a>
    </nav>
  );
}