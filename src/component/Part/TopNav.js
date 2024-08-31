import { useEffect } from "react";
import { Link } from "react-router-dom";

function TopNav() {


  function checkLeftIcon() {
    
    if (window.location.pathname === '/link' || window.location.pathname === '/manual') {
      return <div onClick={() => alert('준비중입니다.')}><i className="fa-solid fa-bars"></i></div>
    } else {
      return <div onClick={() => window.history.back()}><i className="fa-solid fa-arrow-left"></i></div>
    }
  }

  return (
    <div className="top-menu">
        <div className="d-flex justify-content-between">
            {checkLeftIcon()}
            <div><h1>PAYSM</h1></div>
            <div><Link to={"/profile"}><i className="fa-solid fa-user"></i></Link></div>    
        </div>
    </div>
  );
}

export default TopNav;
