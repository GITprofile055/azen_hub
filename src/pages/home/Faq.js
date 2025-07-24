import React from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';


const Faq = () => {
  const navigate = useNavigate();

  const backClick = () => {
    navigate(-1);
  };
  return (

    <div className="withdraw-container">
      <div className="top-bar">
        <span className="back-icon" onClick={backClick}>&#8592;</span>
        <h3>Support And Help</h3>
        <span></span>
      </div>
      <p>
        Azen Software is a dynamic, user-focused technology company that specializes or custom enterprise software, Azen Software ensures high standards of quality, performance, and scalability in every project.

      </p>

      <p>
        The team at Azen is made up of skilled developers, designers, and strategists who work closely with clients to understand their unique requirements and deliver tailored solutions. Azen’s mission is not just to build software, but to create digital experiences that drive real business growth. Their commitment to customer satisfaction, timely delivery, and long-term support is what sets them apart in the software development industry.

      </p>
    </div>

  )



};
export default Faq;

