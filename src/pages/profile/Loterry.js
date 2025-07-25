import React from "react";
import { useNavigate, Link } from "react-router-dom";


const Loterry = () => {
    const navigate = useNavigate();

    const backClick = () => {
        navigate(-1);
    };
    return (
        <div className="withdraw-containers">
            <div className="top-bar">
                <span className="back-icon" >&#8592;</span>
                <h3>Prize Pool Lottery</h3>
                <span></span>
            </div>
            <div className="wh-w750" style={{ position: "relative" }}>
                <div style={{ height: "500px", width: "100%" }}>
                    <div
                        style={{
                            backgroundImage:
                                'url("static/img/loterry2.png")',
                            backgroundSize: "100% 100%",
                            backgroundRepeat: "no-repeat",
                            height: "100%",
                            width: "100%",
                            
                        }}
                    />
                    <img
                        src="static/img/loterry2.png"
                        draggable={false}
                        alt="Background"
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "500px", opacity: 0 }}
                    />
                </div>

                {/* <div className="lottery_head flex_cc">You can draw once a day</div> */}

                <div className="luck-list">
                    {["6USDT", "100USDT", "0.1USDT", "1USDT", "0.6USDT", "200USDT", "0.3USDT", "4USDT"].map(
                        (title, idx) => (
                            <div key={idx} className={`luck-list_${idx + 1}`}>
                                <div className="cell-content flex_cc cell-item">
                                    <div style={{ marginTop: 2 }}>
                                        <div className="flex_cc column">
                                            <img src="/static/img/signIn2.png" style={{ width: '22px', height: '22px'}} />
                                            <div className="cell-content_title">{title}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )}

                    <div className="luck-list_9 ">
                        <div className="luck-list_title flex_cc column">
                            <img src="/static/img/ip1.png" style={{ width: '30px', height: '36px' }} className="bbmx-icon" />
                            <span style={{ color: '#b2f033' }}>bbMx</span>
                        </div>
                    </div>
                </div>

                <div className="luck-lists"><p>Start lottery</p></div>

                <div className="lottery_buttom flex_cs">
                    <div className="flex_cs" style={{ width: "45%" }}>
                        <div style={{ flex: "1 1 0%", marginLeft: '45px', color: 'white', fontSize: '12px' }}>Draw times</div>
                        <div className="flex_c">
                            <img src="/static/img/lottery_p3.png" className="ticket-icon" />
                        </div>
                    </div>
                    <div className="flex_c wheel-text">
                        <span style={{ color: 'white', fontSize: '12px' }}>Wheel level bbMx</span>
                        <img src="/static/img/lottery_p8.png" className="info-icon" style={{ marginRight: '45px' }} />
                    </div>
                </div>
            </div>
            <div className="lottery-card">
                <div className="lottery-header">
                    <h3>You can draw once a day</h3>
                    <div className="lottery-info">
                        <span className="tasks">Number of tasks (0/3)</span>
                        <span className="reset">
                            Reset time <b>33 : 16 : 16</b>
                        </span>
                    </div>
                    <p className="not-claimed">Tasks not yet claimed</p>
                </div>

                <hr className="divider" />

                <div className="lottery-body">
                    <h4>Introduction to lottery rules</h4>
                    <ul>
                        <li>
                            Daily lottery opportunity: Each participant has one chance to
                            draw a lottery every day.
                        </li>
                        <li>
                            Bonus withdrawal conditions: Participants need to complete
                            specific tasks to withdraw the bonus. Each participant can hold up
                            to three pending bonus tasks at the same time.
                        </li>
                        <li>
                            Weekly reset mechanism: Every week, the system will automatically
                            reset and clear all unfinished bonus tasks, and participants will
                            have the opportunity to draw new bonus tasks.
                        </li>
                    </ul>
                    <p>
                        This mechanism ensures the continuity and freshness of the event,
                        while providing participants with the opportunity to obtain rewards
                        regularly.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Loterry;
