import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useTranslation();
  const activeFilter = 'invert(78%) sepia(24%) saturate(1531%) hue-rotate(124deg) brightness(85%) contrast(100%)';
  const activeColor = '#15d5c7';

  return (


    <nav>
      <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 9.75l8.25-6.615a2 2 0 012.5 0L22 9.75M4.5 10.5V18A2.25 2.25 0 006.75 20.25h3.75v-4.5a1.5 1.5 0 013 0v4.5h3.75A2.25 2.25 0 0021 18V10.5" />
        </svg>
        Home
      </NavLink>
      <NavLink to="/nodeDetails" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M10 3h4a1 1 0 011 1v2h-6V4a1 1 0 011-1zM4 7h16v13H4V7z" />
        </svg>

        Purchase
      </NavLink>
      <NavLink to="/server" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="1.5" />
        </svg>
        Earning
      </NavLink>

      <NavLink to="/refer" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="7" ry="3" />
          <path d="M5 5v5c0 1.657 3.134 3 7 3s7-1.343 7-3V5" />
          <path d="M5 10v5c0 1.657 3.134 3 7 3s7-1.343 7-3v-5" />
          <path d="M19 15h4m-2 -2v4" stroke="currentColor" />
        </svg>
        Referral
      </NavLink>

      <NavLink to="/wallet" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M17 5h2a2 2 0 012 2v9a2 2 0 01-2 2h-2m0-13H7a2 2 0 00-2 2v9a2 2 0 002 2h10m0-13v13" />
        </svg>
        Wallet
      </NavLink>
    </nav>

  );
}