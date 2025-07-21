import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaWallet } from 'react-icons/fa';
import { SiOkx } from 'react-icons/si';

const AddWallet = () => {
    //   const [activeTab, setActiveTab] = useState();
    const navigate = useNavigate();

    // const handleClick = () => {
    //     navigate('/Add-WalletAddress'); // Yahan '/add-wallet' ko apne desired path se replace karein
    // }; 

    const handleClick = (network) => {
        navigate(`/add-walletAddress/${network}`); // e.g. /wallet/trc20
      }; 
    const backClick = () => {
        navigate(-1); // Go back to the previous page in history
    };
    return (
        <div className="withdraw-container">
            <div className="top-bar">
                <span className="back-icon" onClick={backClick}>&#8592;</span>
                <h3>Manage Wallet</h3>
                <span></span>
            </div>
            <div className="withdraw-box">
                {/* --- Wallet 1 --- */}
                {/* <div className="balance-card">
                    <div className="balance-left">
                        <p className="balance-value">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 7H3V5H21V7ZM21 9H3C1.9 9 1 9.9 1 11V19C1 20.1 1.9 21 3 21H21C22.1 21 23 20.1 23 19V11C23 9.9 22.1 9 21 9ZM17 15C16.45 15 16 14.55 16 14C16 13.45 16.45 13 17 13C17.55 13 18 13.45 18 14C18 14.55 17.55 15 17 15Z"
                                    fill="currentColor" />
                            </svg>
                            <span>BEP20 Wallet</span>
                        </p>
                        <p className="balance-text">ofgdj9823bx237vytwgxhb83vywegh</p>
                    </div>
                    <p className="balance-text">Link</p>
                </div> */}

                {/* --- Wallet 2 --- */}
              {/* <Link to="/add-walletAddress" style={{textDecorationLine:'none'}}> */}
                <div className="balance-card"onClick={() => handleClick('Trc20')}>
                    <div className="balance-left">
                        <p className="balance-value">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 7H3V5H21V7ZM21 9H3C1.9 9 1 9.9 1 11V19C1 20.1 1.9 21 3 21H21C22.1 21 23 20.1 23 19V11C23 9.9 22.1 9 21 9ZM17 15C16.45 15 16 14.55 16 14C16 13.45 16.45 13 17 13C17.55 13 18 13.45 18 14C18 14.55 17.55 15 17 15Z"
                                    fill="currentColor" />
                            </svg>
                            <span>TRC20</span>
                        </p>
                    </div>
                    <p className="balance-text">+ Add</p>
                </div>
                  <div className="balance-card"onClick={() => handleClick('Bep20')}>
                    <div className="balance-left">
                        <p className="balance-value">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 7H3V5H21V7ZM21 9H3C1.9 9 1 9.9 1 11V19C1 20.1 1.9 21 3 21H21C22.1 21 23 20.1 23 19V11C23 9.9 22.1 9 21 9ZM17 15C16.45 15 16 14.55 16 14C16 13.45 16.45 13 17 13C17.55 13 18 13.45 18 14C18 14.55 17.55 15 17 15Z"
                                    fill="currentColor" />
                            </svg>
                            <span>BEP20</span>
                        </p>
                    </div>
                    <p className="balance-text">+ Add</p>
                </div>
              {/* </Link> */}
            </div>

        </div>
    );
};

export default AddWallet;

