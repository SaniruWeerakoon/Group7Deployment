import React, { useState, useEffect } from "react";
import "./Navigation.css";
import profilepic from "./images/common.png";
import "@fortawesome/fontawesome-free/css/all.css";
import { UserTypes } from "./utils/Enums";
// import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const navigationLinks = {
  [UserTypes.ABOUT]: {
    iconClass: "homeIcon",
    links: [
      { label: "About", href: "/about", icon: "fa fa-home" },
      { label: "SIGN UP" },
      { label: "DONOR", href: "/donorSignUpPage", icon: "fas fa-tint" },
      { label: "ADMIN", href: "/adminSignUpPage", icon: "fas fa-user-cog" },
      {
        label: "HOSPITAL",
        href: "/hospitalSignUpPage",
        icon: "fas fa-hospital",
      },
      {
        label: "BLOOD BANK",
        href: "/bloodBankSignUpPage",
        icon: "fas fa-flask",
      },
      { label: "LOG IN" },
      { label: "DONOR", href: "/donorLoginPage", icon: "fas fa-tint" },
      { label: "ADMIN", href: "/adminLoginPage", icon: "fas fa-user-cog" },
      {
        label: "HOSPITAL",
        href: "/hospitalLoginPage",
        icon: "fas fa-hospital",
      },
      {
        label: "BLOOD BANK",
        href: "/bloodBankLoginPage",
        icon: "fas fa-flask",
      },
    ],
  },
  [UserTypes.DONOR]: {
    iconClass: "donorIcon",
    links: [
      { label: "About", href: "/aboutDonor", icon: "fa fa-home" },
      {
        label: "Donor Dashboard",
        href: "/donorDashboard",
        icon: "fas fa-info-circle",
      },
      {
        label: "Donation History",
        href: "/donorHistory",
        icon: "fas fa-history",
      },
      {
        label: "View Donor Points",
        href: "/donorPoints",
        icon: "fas fa-coins",
      },
      { label: "FAQs", href: "/FAQs", icon: "fas fa-question" },
      {
        label: "Find Nearest Location",
        href: "/donorlocation",
        icon: "fas fa-map-marker-alt",
      },
      { label: "Logout", href: "/home", icon: "fas fa-sign-out-alt" },
    ],
  },
  [UserTypes.ADMIN]: {
    iconClass: "adminIcon",
    links: [
      { label: "About", href: "/aboutAdmin", icon: "fa fa-home" },
      {
        label: "Admin Dashboard",
        href: "/adminDashboard",
        icon: "fas fa-info-circle",
      },
      { label: "Pending Requests" },
      { label: "Hospital", href: "/hospitalPending", icon: "fas fa-hospital" },
      { label: "Blood Bank", href: "/bloodBankPending", icon: "fas fa-flask" },
      { label: "Accepted Requests" },
      { label: "Hospital", href: "/hospitalAccepted", icon: "fas fa-hospital" },
      { label: "Blood Bank", href: "/bloodBankAccepted", icon: "fas fa-flask" },
      { label: "Logout", href: "/home", icon: "fas fa-sign-out-alt" },
    ],
  },
  [UserTypes.BLOODBANK]: {
    iconClass: "bloodBankIcon",
    links: [
      { label: "About", href: "/aboutBloodBank", icon: "fa fa-home" },
      {
        label: "Blood Bank Dashboard",
        href: "/bloodBankDashboard",
        icon: "fas fa-info-circle",
      },
      {
        label: "Blood Stocks",
        href: "/bloodBankChart",
        icon: "fas fa-chart-bar",
      },
      { label: "Donor Base", href: "/donorSearch", icon: "fas fa-users" },
      { label: "Logout", href: "/home", icon: "fas fa-sign-out-alt" },
    ],
  },
  [UserTypes.HOSPITAL]: {
    iconClass: "hospitalIcon",
    links: [
      { label: "About", href: "/aboutHospital", icon: "fa fa-home" },
      {
        label: "Hospital Dashboard",
        href: "/hospitalDashboard",
        icon: "fas fa-info-circle",
      },
      {
        label: "Blood Stocks",
        href: "/hospitalChart",
        icon: "fas fa-chart-bar",
      },
      {
        label: "Blood Bank Search",
        href: "/bloodBankSearch",
        icon: "fa fa-search",
      },
      { label: "Logout", href: "/home", icon: "fas fa-sign-out-alt" },
    ],
  },
};

function Navigation(props) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(true);
  //const [cookies, removeCookie] = useCookies([]);
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
    // removeCookie("token");
    history.push("/about");
  }

  const renderNavigationLinks = () => {
    const userType = props.user;

    if (navigationLinks.hasOwnProperty(userType)) {
      const { links } = navigationLinks[userType];

      return (
        <ul className="sidebarnav">
          {userType !== UserTypes.ABOUT && (
            <>
              <h2 className="myac"> MY ACCOUNT </h2>
              <img
                src={profilepic}
                className={navigationLinks[userType].iconClass}
              />
            </>
          )}

          {links.map((link, index) => (
            <React.Fragment key={index}>
              {link.label === "Logout" ? (
                <li className="lists">
                  <a
                    href="#"
                    className="link"
                    onClick={(event) => handleDashboard(userType, event)}
                  >
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
