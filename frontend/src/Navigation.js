import React , { useState , useEffect }from "react";
import "./Navigation.css";
import profilepic from "./images/common.png";
import '@fortawesome/fontawesome-free/css/all.css';
import { UserTypes } from "./utils/Enums";


function Navigation(props) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(true);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
    setIsButtonClicked(!isButtonClicked);
  };

  const closeSideBar = () => {
    setIsSideBarOpen(false);
    setIsButtonClicked(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 840) {
        closeSideBar();
      } else {
        setIsSideBarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderNavigationLinks = () => {

    if (props.user === UserTypes.HOME) {
      return (
      <>
      <ul>
        <li className="lists">
        <a href="/home" className="link"><i className="fas fa-info-circle"></i>INFO</a>
      </li>
        <li className="lists" >
        <a  className="optionsLink"><i className="fas fa-user-plus"></i>SIGN UP</a>
      </li>
        <div className="OptionLoginAndSignUp">
          <li className="lists">
        <a href="/donorSignUpPage" className="link">
       <i className="fas fa-tint"></i> 
          DONOR</a>
      </li>
        <li className="lists">
        <a href="/adminSignUpPage" className="link">
        <i className="fas fa-user-cog"></i> 
          ADMIN</a>
      </li>
        <li className="lists">
        <a href="/hospitalSignUpPage"  className="link">
        <i className="fas fa-hospital"></i> 
        HOSPITAL</a>
      </li>
        <li className="lists">
        <a href="/bloodBankSignUpPage"  className="link">
       <i className="fas fa-flask"></i>
         BLOOD BANK</a>
      </li>
      </div>

        <li className="lists" >
        <a className="optionsLink" ><i className="fas fa-sign-in-alt"></i>LOG IN</a>
        </li>
        <div className="OptionLoginAndSignUp">
        <li className="lists">
        <a href="/donorLoginPage"  className="link">
         <i className="fas fa-tint"></i> 
          DONOR</a>
      </li>
       <li className="lists">
        <a href="/adminLoginPage"  className="link">
        <i className="fas fa-user-cog"></i> 
         ADMIN</a>
      </li>
       <li className="lists">
        <a href="/hospitalLoginPage"  className="link">
        <i className="fas fa-hospital"></i> 
         HOSPITAL</a>
      </li>
        <li className="lists">
        <a href="/bloodBankLoginPage"  className="link">
        <i className="fas fa-flask"></i>
          BLOOD BANK</a>
       </li>
      </div>
     
      </ul>
      
      </>
      );
      }

    if (props.user === UserTypes.DONOR) {
      return (
        <ul className="sidebarnav">
          <h2 className="myac"> MY ACCOUNT </h2>
          <img src={profilepic} className='donorIcon' />

          <li className="lists">
            <a href="/donorDashboard" 
            className="link">
              <i className="fas fa-info-circle"></i> 
              Donor Dashboard 
            </a>
          </li>
          <hr className="navhr"/>
          <li className="lists">
            <a href="/donorHistory" className="link">
            <i className="fas fa-history"></i>Donation History </a>
          </li>
          <hr className="navhr"/>
          <li className="lists">
            <a href="/donorPoints" className="link">
            <i className="fas fa-coins"></i>
              View Donor Points</a>
          </li >
          <hr className="navhr"/>
          <li className="lists">
            <a href="/FAQs" className="link">
            <i className="fas fa-question"></i>
              FAQS</a>
          </li>
          <hr className="navhr"/>
          <li className="lists">
            <a href="/donorlocation" className="link">
            <i className="fas fa-map-marker-alt"></i> 
              Find Nearest Location</a>
          </li>
          <hr className="navhr"/>
          <li className="lists">
            <a href="/home" className="link">
            <i className="fas fa-sign-out-alt"></i>
              Logout</a>
          </li>
          <hr className="navhr"/>
        </ul>
      );
    }

    if (props.user === UserTypes.ADMIN) {
      return (
        <ul className="sidebarnav">
          <h2 className="myac"> MY ACCOUNT </h2>
          <img src={profilepic} className='adminIcon' />
          <li className="lists">
            <a href="/adminDashboard" className="link">
            <i className="fas fa-info-circle"></i> 
              Admin Dashboard
            </a>
            </li>
          <li className="lists" >
          <div  className="sidelink"> <i className="fas fa-clock"></i>Pending Requests</div>  
            <ul>
              <li className="sublists">
            <a href="/hospitalPending" className="link" >
            <i className="fas fa-hospital"></i>Hospital</a>
            </li>
            <li className="sublists">
             <a href="/bloodBankPending" className="link" >
            <i className="fas fa-medkit"></i>Blood Bank</a>
            </li>
          </ul>
         </li>
      <li className="lists" >
      <div className="sidelink"><i className="fas fa-check-circle"></i>Accepted requests</div>
      <ul>
          <li className="sublists">
            <a href="/hospitalAccepted" className="link">
            <i className="fas fa-hospital"></i>
            Hospital</a>
          </li>
          <li className="sublists">
            <a href="/bloodBankAccepted" className="link">
            <i className="fas fa-medkit"></i>
            Blood Bank</a>
            </li>
         </ul>
      </li>
     <li className="lists">
            <a href="/home" className="link">
            <i className="fas fa-sign-out-alt"></i>
              Logout
            </a>
      </li>
     
        </ul>
      );
    }
    if (props.user === UserTypes.BLOODBANK) {
      return (
        <ul className="sidebarnav">
          <h2 className="myac"> MY ACCOUNT </h2>
          <img src={profilepic} className='bloodBankIcon' />
          <li className="lists">
            <a href="/bloodBankDashboard" className="link"><i className="fas fa-info-circle"></i>Dashboard</a>
          </li>
          <li className="lists">
            <a href="/bloodBankChart" className="link"><i className="fas fa-chart-bar"></i>Blood Stocks</a>
          </li>
          <li className="lists">
            <a href="/donorSearch" className="link"> <i className="fas fa-users"></i> Donor Base</a>
          </li>
          <li className="lists">
            <a href="/home" className="link"><i className="fas fa-sign-out-alt"></i>Logout</a>
          </li>
        </ul>
      );
    }

    if (props.user === UserTypes.HOSPITAL) {
      return (
        <ul className="sidebarnav">
          <h2 className="myac"> MY ACCOUNT </h2>
          <img src={profilepic} className='hospitalIcon' />
          <li className="lists">
            <a href="/hospitalDashboard" className="link"><i className="fas fa-info-circle"></i> Hospital Dashboard</a>
          </li>
          <li className="lists">
            <a href="/hospitalChart" className="link"><i className="fas fa-chart-bar"></i>Blood Stocks</a>
          </li>
          <li className="lists">
            <a href="/bloodBankSearch" className="link"><i className="fa fa-search"></i>Blood Bank Search</a>
          </li>
          <li className="lists">
            <a href="/home" className="link"><i className="fas fa-sign-out-alt"></i>Logout</a>
          </li>
        </ul>
      );
    }

  };

  return (
    <div>
      <button
        className={`sidebar-toggle ${isButtonClicked ? "active" : ""}`}
        onClick={toggleSideBar}
      >
        <i className={`fas ${isButtonClicked ? "fa-times" : "fa-bars"}`}></i>
      </button>
      <div className={`sidebar ${isSideBarOpen ? "active" : ""}`}>
        {renderNavigationLinks()}
      </div>
    </div>
  );
}

export default Navigation;



