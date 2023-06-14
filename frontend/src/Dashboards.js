import React from "react";
import "./Dashboards.css";
import Navigation from "./Navigation";
import { UserTypes } from "./utils/Enums";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Backend_URL } from "./App";

function Dashboards(props) {
  const choice = props.user;
  const history = useHistory();
  const [cookies, removeCookie] = useCookies([]);
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
      if (!cookies.token) {
        console.log("here");
        history.push(route);
      }
      axios.defaults.withCredentials = true;
      const url = `${Backend_URL}/${TypeofUser}/verify`;
      const response = await axios.post(url, {}, { withCredentials: true });
      console.log(response);
      console.log(cookies.token);
      const { status, user } = response.data;
      setUser(user);
      if (status) {
        return;
      } else {
        removeCookie("token");
        history.push(route);
      }
    };
    verifyCookie();
  }, [cookies, history, removeCookie]);
  const userTypes = {
    [UserTypes.DONOR]: {
      heading: "Personal Information",
      navigationIcon: "icon-donor",
      content: [
        { label: "NAME", icon: "fas fa-user", value: User.name },
        {
          label: "DATE OF BIRTH",
          icon: "fas fa-calendar-alt",
          value: User.dob,
        },
        { label: "BLOOD TYPE", icon: "fas fa-tint", value: User.bloodtype },
        { label: "TELEPHONE", icon: "fas fa-phone", value: User.telephone },
      ],
    },
    [UserTypes.ADMIN]: {
      heading: "Personal Information",
      navigationIcon: "icon-admin",
      content: [
        { label: "NAME", icon: "fas fa-user", value: User.username },
        {
          label: "Number of pending hospital requests",
          icon: "fas fa-bolt",
          value: User.pendingHosps,
        },
        {
          label: "Number of pending blood bank requests",
          icon: "fas fa-bolt",
          value: User.pendingBanks,
        },
        {
          label: "Number of accepted hospital requests",
          icon: "fas fa-bolt",
          value: User.Hosps,
        },
        {
          label: "Number of accepted blood bank requests",
          icon: "fas fa-bolt",
          value: User.Banks,
        },
      ],
    },
    [UserTypes.HOSPITAL]: {
      heading: "Personal Information",
      navigationIcon: "icon-hospital",
      content: [
        { label: "NAME OF HOSPITAL", icon: "fa fa-hospital", value: User.name },
        {
          label: "ADDRESS",
          icon: "fas fa-map-marker-alt",
          value: User.address,
        },
        {
          label: "TELEPHONE NUMBER",
          icon: "fas fa-phone",
          value: User.telephone,
        },
        {
          label: "DISTRICT OF THE HOSPITAL",
          icon: "fa fa-location-arrow",
          value: User.district,
        },
      ],
    },
    [UserTypes.BLOODBANK]: {
      heading: "Personal Information",
      navigationIcon: "icon-bloodbank",
      content: [
        {
          label: "NAME OF BLOOD BANK",
          icon: "fas fa-hospital",
          value: User.name,
        },
        {
          label: "DISTRICT OF BLOOD BANK",
          icon: "fas fa-location-arrow",
          value: User.district,
        },
        { label: "TELEPHONE", icon: "fas fa-phone", value: User.telephone },
        {
          label: "ADDRESS",
          icon: "fas fa-map-marker-alt",
          value: User.address,
        },
      ],
    },
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
              {item.label}{" "}
              <i className={`${item.icon} ${userInfo.navigationIcon}`}></i>
            </div>
            <p className="innertext">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboards;

/*
import React, { useState , useEffect } from "react";
import Dropdown from './Dropdown';
import "./Dashboards.css";
import { UserTypes } from "./utils/Enums";
import { DropDown } from "./utils/Enums";


function Dashboards(props) {
  const [isEditing, setIsEditing] = useState(false); 
  const [editedData, setEditedData] = useState({ 
    name: "",
    dateOfBirth: "",
    bloodType: "",
    telephone: "",
    address: "",
    district: ""
  });

  let choice = props.user;
  let content = null;


  useEffect(() => {
   
    const fetchUserData = () => {
      let userData = {};

      switch (choice) {
        case UserTypes.DONOR:
          userData = {
            name: "John Doe",
            dateOfBirth: "1990-01-01",
            bloodType: "A+",
            telephone: "1234567890",
            address: "123 Main Street",
            district: "City"
          };
          break;
        case UserTypes.HOSPITAL:
          userData = {
            name: "Hospital ABC",
            address: "456 Hospital Street",
            telephone: "9876543210",
            district: "City"
          };
          break;
        case UserTypes.BLOODBANK:
          userData = {
            name: "Blood Bank XYZ",
            district: "City",
            telephone: "5555555555",
            address: "789 Blood Bank Road"
          };
          break;
        case UserTypes.ADMIN:
          userData = {
            name: "Admin User",
          };
          break;
        default:
          break;
      }

      setEditedData(userData);
    };

    
    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true); 
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    let name = editedData.name;
    let dateOfBirth = editedData.dateOfBirth;
    let bloodType = editedData.bloodType;
    let telephone = editedData.telephone;
    let address = editedData.address;
    let district = editedData.district;
  
    switch (choice) {
      case UserTypes.DONOR:
        break;
      case UserTypes.HOSPITAL:
        break;
      case UserTypes.BLOODBANK:
        break;
      case UserTypes.ADMIN:
        break;
      default:
        break;
    }
  
    console.log("Name:", name);
    console.log("Date of Birth:", dateOfBirth);
    console.log("Blood Type:", bloodType);
    console.log("Telephone:", telephone);
    console.log("Address:", address);
    console.log("District:", district);
  
    console.log("Edited data:", editedData);
    setIsEditing(false);
  };

  const getFields = (fieldName) => {
    switch (fieldName) {
      case UserTypes.DONOR:
        return [
          { name: "name", label: "NAME", icon: "fas fa-user icon-left1", className: "leftcolumn1",type:"text" },
          { name: "dateOfBirth", label: "DATE OF BIRTH", icon: "fas fa-calendar-alt icon-left2", className: "rightcolumn1",type:"date" },
          { name: "bloodType", label: "BLOOD TYPE", icon: "fas fa-tint icon-left3", className: "rightcolumn1",  type: "custom", component: <Dropdown dropdown={DropDown.BLOODTYPEDROPDOWN} /> },
          { name: "telephone", label: "TELEPHONE", icon: "fas fa-phone icon-left4", className: "finalcolumn2" ,type:"number"},
          { name: "address", label: "ADDRESS", icon: "fas fa-map-marker-alt icon-left5", className: "finalcolumn1" ,type:"textarea"},
        ];
      case UserTypes.HOSPITAL:
        return [
          { name: "name", label: "NAME OF HOSPITAL", icon: "fa fa-hospital icon-left8", className: "leftcolumn1",type:"text" },
          { name: "address", label: "ADDRESS", icon: "fas fa-map-marker-alt icon-left9", className: "leftcolumn2" ,type:"textarea"},
          { name: "telephone", label: "TELEPHONE NUMBER", icon: "fas fa-phone icon-left10", className: "rightcolumn1",type:"number" },
          { name: "district", label: "DISTRICT OF THE HOSPITAL", icon: "fa fa-location-arrow icon-left11", className: "rightcolumn2" ,type:"custom" , component: <Dropdown dropdown={DropDown.DISTRICTDROPDOWN} />},
        ];
      case UserTypes.BLOODBANK:
        return [
          { name: "name", label: "NAME OF BLOOD BANK", icon: "fas fa-hospital icon-left12", className: "leftcolumn1",type:"text" },
          { name: "district", label: "DISTRICT OF BLOOD BANK", icon: "fas fa-location-arrow icon-left13", className: "leftcolumn2",type:"custom",component: <Dropdown dropdown={DropDown.DISTRICTDROPDOWN} /> },
          { name: "telephone", label: "TELEPHONE", icon: "fas fa-phone icon-left14", className: "rightcolumn1",type:"number" },
          { name: "address", label: "ADDRESS", icon: "fas fa-map-marker-alt icon-left15", className: "rightcolumn2",type:"textarea" },
        ];
      case UserTypes.ADMIN:
        return [
          { name: "name", label: "NAME", icon: "fas fa-user icon-left6", className: "leftcolumn1" },
        ];
      default:
        return [];
    }
  };

  if (choice === UserTypes.DONOR || choice === UserTypes.HOSPITAL || choice === UserTypes.BLOODBANK || choice === UserTypes.ADMIN) {
    const fields = getFields(choice);

    content = (
      <div>
        <div className="maincontainer">
          {!isEditing && ( 
            <button className="editandsubmit" onClick={handleEditClick}>
              Edit
            </button>
          )}
          <div className="dashboardinfo">
            <h3 className="finalheading">Personal Information</h3>
            <ul>
              {fields.map((field) => (
                <div key={field.name}>
                  <div className={field.className}>
                    <li className="list">
                      {field.label}
                      <i className={field.icon}></i>
                      {isEditing ? (
                        field.type === "custom" ? (
                          field.component 
                        ) : field.type === "textarea" ? (
                          <textarea
                            name={field.name}
                            value={editedData[field.name]}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            value={editedData[field.name]}
                            onChange={handleInputChange}
                          />
                        )
                      ) : (
                        <span className="innertext">{editedData[field.name]}</span>
                      )}
                    </li>
                  </div>
                </div>
              ))}
            </ul>
          </div>
          {isEditing && (
            <button className="editandsubmit" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>
      </div>
    );

    if (choice === UserTypes.ADMIN) {
      content = (
        <div>
          {content}
          <div className="admincolumn">
            <li className="requestlist">
              <span className="number">09</span><br/><i className="fas fa-bolt icon-left7"/>Number of pending hospital requests
            </li>
            <hr/>
            <li className="requestlist">
              <span className="number">90</span><br/><i className="fas fa-bolt icon-left7"/>Number of pending blood bank requests 
            </li>
            <hr/>
            <li className="requestlist" >
              <span className="number">80</span><br/><i className="fas fa-bolt icon-left7"/>Number of accepted hospital requests 
            </li>
            <hr/>
            <li className="requestlist">
              <span className="number">78</span><br/><i className="fas fa-bolt icon-left7"/>Number of accepted blood bank requests 
            </li>
          </div>
        </div>
      );
    }
  }
  
  return <div>{content}</div>;
}

export default Dashboards;
*/
