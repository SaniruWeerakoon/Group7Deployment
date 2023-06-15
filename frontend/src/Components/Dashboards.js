import React from "react";
import "./Styles/Dashboards.css";
import Navigation from "./Navigation";
import { UserTypes } from "../utils/Enums";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import { useCookies } from "react-cookie";
import axios from "axios";
import { Backend_URL } from "../App";

function Dashboards(props) {
 const choice = props.user;
  const history = useHistory();
  // const [cookies, removeCookie] = useCookies([]);
  const [User, setUser] = useState({});
  let route = "";
  let TypeofUser = "";

  useEffect(() => {
    if (choice === UserTypes.DONOR) {
      route = "donorLoginPage";
      TypeofUser = "Donor";
    } else if (choice === UserTypes.ADMIN) {
      route = "adminLoginPage";
      TypeofUser = "admin";
    } else if (choice === UserTypes.HOSPITAL) {
      route = "hospitalLoginPage";
      TypeofUser = "hospital";
    } else if (choice === UserTypes.BLOODBANK) {
      route = "bloodBankLoginPage";
      TypeofUser = "bloodBank";
    }
    const verifyCookie = async () => {
      // if (!cookies.token) {
      //   console.log("here");
      //   history.push(route);
      // }
      axios.defaults.withCredentials = true;
      const url = `${Backend_URL}/${TypeofUser}/verify`;
      const response = await axios.post(url, {}, { withCredentials: true });
      const { status, user } = response.data;
      setUser(user);
      if (status) {
        return;
      } else {
        // removeCookie("token");
        history.push(route);
      }
    };
    verifyCookie();
  }, [ history,]);//cookies, removeCookie removed
  const userTypes = {
    [UserTypes.DONOR]: {
      heading: 'Personal Information',
      navigationIcon: 'icon-donor',
      content: [
      { label: 'NAME', icon: 'fas fa-user', value: User.name },
        { label: 'DATE OF BIRTH', icon: 'fas fa-calendar-alt', value: User.dob },
        { label: 'BLOOD TYPE', icon: 'fas fa-tint', value:User.bloodtype},
      { label: 'TELEPHONE NUMBER', icon: 'fas fa-phone', value: User.telephone },
      ]
    },
    [UserTypes.ADMIN]: {
      heading: 'Personal Information',
      navigationIcon: 'icon-admin',
      content: [
        { label: 'NAME', icon: 'fas fa-user', value: User.username },
        { label: 'Number of pending hospital requests', icon: 'fas fa-bolt', value:  User.pendingHosps },
        { label: 'Number of pending blood bank requests', icon: 'fas fa-bolt', value:  User.pendingBanks },
        { label: 'Number of accepted hospital requests', icon: 'fas fa-bolt', value:  User.Hosps },
        { label: 'Number of accepted blood bank requests', icon: 'fas fa-bolt', value:  User.Banks }
      ]
    },
    [UserTypes.HOSPITAL]: {
      heading: 'Personal Information',
      navigationIcon: 'icon-hospital',
      content: [
        { label: 'NAME OF HOSPITAL', icon: 'fa fa-hospital', value: User.name },
        { label: 'TELEPHONE NUMBER', icon: 'fas fa-phone', value: User.telephone },
        { label: 'DISTRICT OF HOSPITAL', icon: 'fa fa-location-arrow', value: User.district},
        { label: 'ADDRESS', icon: 'fas fa-map-marker-alt', value: User.address }         
      ]
    },
    [UserTypes.BLOODBANK]: {
      heading: 'Personal Information',
      navigationIcon: 'icon-bloodbank',
      content: [
        { label: 'NAME OF BLOOD BANK', icon: 'fas fa-hospital', value: User.name },
        { label: 'TELEPHONE NUMBER', icon: 'fas fa-phone', value:User.telephone },
        { label: 'DISTRICT OF BLOOD BANK', icon: 'fas fa-location-arrow', value: User.district },
        { label: 'ADDRESS', icon: 'fas fa-map-marker-alt', value: User.address}
      ]
    }
  };

  const userInfo = userTypes[choice];

  return (
    <div>
      <Navigation user={choice} />
      <h3 className="firstheading">{userInfo.heading}</h3>
      <div className="flex1">
      {userInfo.content.map((item, index) => (
  <div className="flex2" key={index}>
    <div className="flex3">
      {item.label} <i className={`${item.icon} ${userInfo.navigationIcon}`}></i>
    </div>
   <p className="innertext">{item.value}</p>
  </div>
      ))}
      </div>
    </div>
  );
}

export default Dashboards;


