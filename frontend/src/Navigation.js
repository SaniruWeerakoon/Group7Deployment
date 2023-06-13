/*import React, { useState, useEffect } from "react";
import "./Navigation.css";
import profilepic from "./images/common.png";
import '@fortawesome/fontawesome-free/css/all.css';
import { UserTypes } from "./utils/Enums";

const navigationLinks = {
  [UserTypes.HOME]: {
  links: [
      { label: "INFO", href: "/home" },
      { label: "SIGN UP", isOption: true },
      { label: "DONOR", href: "/donorSignUpPage", icon: "fas fa-tint" },
      { label: "ADMIN", href: "/adminSignUpPage", icon: "fas fa-user-cog" },
      { label: "HOSPITAL", href: "/hospitalSignUpPage", icon: "fas fa-hospital" },
      { label: "BLOOD BANK", href: "/bloodBankSignUpPage", icon: "fas fa-flask" },
      { label: "LOG IN", isOption: true },
      { label: "DONOR", href: "/donorLoginPage", icon: "fas fa-tint" },
      { label: "ADMIN", href: "/adminLoginPage", icon: "fas fa-user-cog" },
      { label: "HOSPITAL", href: "/hospitalLoginPage", icon: "fas fa-hospital" },
      { label: "BLOOD BANK", href: "/bloodBankLoginPage", icon: "fas fa-flask" },
    ],
  },
  [UserTypes.DONOR]: {
    iconClass: "donorIcon",
    links: [
      { label: "Donor Dashboard", href: "/donorDashboard", icon: "fas fa-info-circle" },
      { label: "Donation History", href: "/donorHistory", icon: "fas fa-history" },
      { label: "View Donor Points", href: "/donorPoints", icon: "fas fa-coins" },
      { label: "FAQs", href: "/FAQs", icon: "fas fa-question" },
      { label: "Find Nearest Location", href: "/donorlocation", icon: "fas fa-map-marker-alt" },
      { label: "Logout", href: "/home", icon: "fas fa-sign-out-alt" },
    ],
  },
  [UserTypes.ADMIN]: {
    iconClass: "adminIcon",
    links: [
      { label: "Admin Dashboard", href: "/adminDashboard", icon: "fas fa-info-circle" },
      { label: "Pending Requests", icon: "fas fa-clock", subLinks: [
        { label: "Hospital", href: "/hospitalPending", icon: "fas fa-hospital" },
        { label: "Blood Bank", href: "/bloodBankPending", icon: "fas fa-medkit" },
      ] },
      { label: "Accepted Requests", icon: "fas fa-check-circle", subLinks: [
        { label: "Hospital", href: "/hospitalAccepted", icon: "fas fa-hospital" },
        { label: "Blood Bank", href: "/bloodBankAccepted", icon: "fas fa-medkit" },
      ] },
      { label: "Logout", href: "/home", icon: "fas fa-sign-out-alt" },
    ],
  },
  [UserTypes.BLOODBANK]: {
    iconClass: "bloodBankIcon",
    links: [
      { label: "Blood Bank Dashboard", href: "/bloodBankDashboard", icon: "fas fa-info-circle" },
      { label: "Blood Stocks", href: "/bloodBankChart", icon: "fas fa-chart-bar" },
      { label: "Donor Base", href: "/donorSearch", icon: "fas fa-users" },
      { label: "Logout", href: "/home", icon: "fas fa-sign-out-alt" },
    ],
  },
  [UserTypes.HOSPITAL]: {
    iconClass: "hospitalIcon",
    links: [
      { label: "Hospital Dashboard", href: "/hospitalDashboard", icon: "fas fa-info-circle" },
      { label: "Blood Stocks", href: "/hospitalChart", icon: "fas fa-chart-bar" },
      { label: "Blood Bank Search", href: "/bloodBankSearch", icon: "fa fa-search" },
      { label: "Logout", href: "/home", icon: "fas fa-sign-out-alt" },
    ],
  },
};

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
    const userType = props.user;

    if (navigationLinks.hasOwnProperty(userType)) {
      const { links } = navigationLinks[userType];

      return (
        <ul className="sidebarnav">
          {userType !== UserTypes.HOME && (
            <>
              <h2 className="myac"> MY ACCOUNT </h2>
              <img src={profilepic} className={navigationLinks[userType].iconClass} />
            </>
          )}

          {links.map((link, index) => (
            <React.Fragment key={index}>
              <li className="lists">
                <a href={link.href} className="link">
                  {link.icon && <i className={link.icon}></i>}
                  {link.label}
                </a>
              </li>
              {link.subLinks && (
                <ul>
                  {link.subLinks.map((subLink, subIndex) => (
                    <li className="sublists" key={subIndex}>
                      <a href={subLink.href} className="link">
                        {subLink.icon && <i className={subLink.icon}></i>}
                        {subLink.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              <hr className="navhr" />
            </React.Fragment>
          ))}
        </ul>
      );
    }

    return null;
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

*/

import React, { useState, useEffect } from "react";
import "./Navigation.css";
import profilepic from "./images/common.png";
import '@fortawesome/fontawesome-free/css/all.css';
import { UserTypes } from "./utils/Enums";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const navigationLinks = {
  [UserTypes.HOME]: {
    iconClass: "homeIcon",
    links: [
      { label: "INFO", href: "/home" },
      {
        label: "SIGN UP",
        subLinks: [
          { label: "DONOR", href: "/donorSignUpPage", icon: "fas fa-tint" },
          { label: "ADMIN", href: "/adminSignUpPage", icon: "fas fa-user-cog" },
          { label: "HOSPITAL", href: "/hospitalSignUpPage", icon: "fas fa-hospital" },
          { label: "BLOOD BANK", href: "/bloodBankSignUpPage", icon: "fas fa-flask" },
        ],
      },
      {
        label: "LOG IN",
        subLinks: [
          { label: "DONOR", href: "/donorLoginPage", icon: "fas fa-tint" },
          { label: "ADMIN", href: "/adminLoginPage", icon: "fas fa-user-cog" },
          { label: "HOSPITAL", href: "/hospitalLoginPage", icon: "fas fa-hospital" },
          { label: "BLOOD BANK", href: "/bloodBankLoginPage", icon: "fas fa-flask" },
        ],
      },
    ],
  },
  [UserTypes.DONOR]: {
    iconClass: "donorIcon",
    links: [
      { label: "Donor Dashboard", href: "/donorDashboard", icon: "fas fa-info-circle" },
      { label: "Donation History", href: "/donorHistory", icon: "fas fa-history" },
      { label: "View Donor Points", href: "/donorPoints", icon: "fas fa-coins" },
      { label: "FAQs", href: "/FAQs", icon: "fas fa-question" },
      { label: "Find Nearest Location", href: "/donorlocation", icon: "fas fa-map-marker-alt" },
      { label: "Logout", href: "/home", icon: "fas fa-sign-out-alt" },
    ],
  },
  [UserTypes.ADMIN]: {
    iconClass: "adminIcon",
    links: [
      { label: "Admin Dashboard", href: "/adminDashboard", icon: "fas fa-info-circle" },
      { label: "Pending Requests",icon: "fas fa-clock", subLinks: [
        { label: "Hospital", href: "/hospitalPending", icon: "fas fa-hospital" },
        { label: "Blood Bank", href: "/bloodBankPending", icon: "fas fa-medkit" },
      ] },
      { label: "Accepted Requests", icon: "fas fa-check-circle", subLinks: [
        { label: "Hospital", href: "/hospitalAccepted", icon: "fas fa-hospital" },
        { label: "Blood Bank", href: "/bloodBankAccepted", icon: "fas fa-medkit" },
      ] },
      { label: "Logout", href: "/home", icon: "fas fa-sign-out-alt" },
    ],
  },
  [UserTypes.BLOODBANK]: {
    iconClass: "bloodBankIcon",
    links: [
      { label: "Blood Bank Dashboard", href: "/bloodBankDashboard", icon: "fas fa-info-circle" },
      { label: "Blood Stocks", href: "/bloodBankChart", icon: "fas fa-chart-bar" },
      { label: "Donor Base", href: "/donorSearch", icon: "fas fa-users" },
      { label: "Logout", href: "/home", icon: "fas fa-sign-out-alt" },
    ],
  },
  [UserTypes.HOSPITAL]: {
    iconClass: "hospitalIcon",
    links: [
      { label: "Hospital Dashboard", href: "/hospitalDashboard", icon: "fas fa-info-circle" },
      { label: "Blood Stocks", href: "/hospitalChart", icon: "fas fa-chart-bar" },
      { label: "Blood Bank Search", href: "/bloodBankSearch", icon: "fa fa-search" },
      { label: "Logout", href: "/home", icon: "fas fa-sign-out-alt" },
    ],
  },
};

function Navigation(props) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(true);
  const [cookies, removeCookie] = useCookies([]);
  const history = useHistory();

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

  function handleDashboard(userType, event) {
    event.preventDefault();
    console.log("hello");
    // Rest of your logic
    
    removeCookie("token");
    history.push("/home")
  }


  const renderNavigationLinks = () => {
    const userType = props.user;

    if (navigationLinks.hasOwnProperty(userType)) {
      const {links } = navigationLinks[userType];

      return (
        <ul className="sidebarnav">
          {userType !== UserTypes.HOME && (
            <>
              <h2 className="myac"> MY ACCOUNT </h2>
              <img src={profilepic} className={navigationLinks[userType].iconClass} />
            </>
          )}

          {links.map((link, index) => (
                        <React.Fragment key={index}>
                        {link.label === "Logout" ? (
                           <li className="lists">
                           <a href="#" className="link" onClick={(event) => handleDashboard(userType, event)}>
                             {link.icon && <i className={link.icon}></i>}
                             {link.label}
                           </a>
                         </li>
                        ) : (
                         <li className="lists">
                         <a href={link.href} className="link">
                            {link.icon && <i className={link.icon}></i>}
                            {link.label}

                         </a>
                      </li>
                        )}       
              {link.subLinks && (
                <>
                <ul>
                  {link.subLinks.map((subLink, subIndex) => (
                    <li className="sublists" key={subIndex}>
                        <a href={subLink.href} className="link">
                        {subLink.icon && <i className={subLink.icon}></i>}
                       {subLink.label}
                    </a>
                 </li>
                  ))}
                </ul>
               
                </>
              )}
              <hr className="navhr" />
            </React.Fragment>
          ))}
        </ul>
      );
    }

    return null;
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