import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./Dashboards.css";
import Navigation from "./Navigation";
import { UserTypes } from "./utils/Enums";
import { Backend_URL } from "./App";

function Dashboards(props) {
  //new code
  let choice = props.user;
  //end of new code
  //const choice = UserType.DONOR;//old code
  let content = null;
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
        history.push(route);
      }
      axios.defaults.withCredentials = true;
      const url = `${Backend_URL}/${TypeofUser}/verify`;
      const { data } = await axios.post(url, {}, { withCredentials: true });
      const { status, user } = data;
      setUser(user);
      if (status) {
        return;
      } else {
        removeCookie("token"); history.push(route);
      }
    };
    verifyCookie();
  }, [cookies, history, removeCookie]);

  if (choice === UserTypes.DONOR) {
    //   const { data } = await axios.get("http://localhost:8070/Donor/user",{username});
    //  const {name,telephone,bloodtype,dob,address} =data
    content = (
      <div>
        <Navigation user={UserTypes.DONOR} />
        <div className="maincontainer">
          <div className="dashboardinfo">
            <h3 className="finalheading">Personal Information</h3>
            <ul>
              <div className="leftcolumn1">
                <li className="list">
                  <div className="flex1">
                    NAME <i className="fas fa-user icon-left1"></i>
                  </div>
                  <span className="innertext">{User.name}</span>
                </li>
              </div>
              <div className="rightcolumn1">
                <li className="list">
                  <div className="flex1">
                    DATE OF BIRTH
                    <i className="fas fa-calendar-alt icon-left2"></i>
                  </div>
                  <span className="innertext">{User.dob}</span>
                </li>
              </div>
              <div className="rightcolumn1">
                <li className="list">
                  <div className="flex1">
                    BLOOD TYPE<i className="fas fa-tint icon-left3"></i>
                  </div>
                  <span className="innertext">{User.bloodtype}</span>
                </li>
              </div>
              <div className="finalcolumn2">
                <li className="list">
                  <div className="flex1">
                    TELEPHONE <i className="fas fa-phone icon-left4"></i>
                  </div>
                  <span className="innertext">{User.telephone}</span>
                </li>
              </div>
              <div className="finalcolumn1">
                <li className="list">
                  <div className="flex1">
                    ADDRESS <i className="fas fa-map-marker-alt icon-left5"></i>
                  </div>
                  <span className="innertext">{User.address}</span>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    );
  } else if (choice === UserTypes.ADMIN) {
    
    content = (
      <div>
        <Navigation user={UserTypes.ADMIN} />
        <div className="maincontainer">
          <div className="dashboardinfo">
            <h3 className="finalheading">Personal Information</h3>
            <ul>
              <div className="leftcolumn1">
                <li className="list">
                  <div className="flex1">
                    NAME <i className="fas fa-user icon-left6"></i>
                  </div>
                  <span className="innertext">{User.username}</span>
                </li>
              </div>
              <div className="admincolumn">
                <li className="requestlist">
                  <span className="number">{User.pendingHosps}</span>
                  <br />
                  <i className="fas fa-bolt icon-left7" />
                  Number of pending hospital requests
                </li>
                <hr />
                <li className="requestlist">
                  <span className="number">{User.pendingBanks}</span>
                  <br />
                  <i className="fas fa-bolt icon-left7" />
                  Number of pending blood bank requests
                </li>
                <hr />
                <li className="requestlist">
                  <span className="number">{User.Hosps}</span>
                  <br />
                  <i className="fas fa-bolt icon-left7" />
                  Number of accepted hospital requests
                </li>
                <hr />
                <li className="requestlist">
                  <span className="number">{User.Banks}</span>
                  <br />
                  <i className="fas fa-bolt icon-left7" />
                  Number of accepted blood bank requests
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    );
  } else if (choice === UserTypes.HOSPITAL) {
    content = (
      <div>
        <Navigation user={UserTypes.HOSPITAL} />
        <div className="maincontainer">
          <div className="dashboardinfo">
            <h3 className="finalheading">Personal Information</h3>
            <ul>
              <div className="leftcolumn1">
                <li className="list">
                  <div className="flex1">
                    NAME OF HOSPITAL{" "}
                    <i className="fa fa-hospital icon-left8"></i>
                  </div>
                  <span className="innertext">{User.name}</span>
                </li>
              </div>
              <div className="leftcolumn2">
                <li className="list">
                  <div className="flex1">
                    ADDRESS <i className="fas fa-map-marker-alt icon-left9"></i>
                  </div>
                  <span className="innertext">{User.address}</span>
                </li>
              </div>
              <div className="rightcolumn1">
                <li className="list">
                  <div className="flex1">
                    TELEPHONE NUMBER{" "}
                    <i className="fas fa-phone icon-left10"></i>
                  </div>
                  <span className="innertext">{User.telephone}</span>
                </li>
              </div>
              <div className="rightcolumn2">
                <li className="list">
                  <div className="flex1">
                    DISTRICT OF THE HOSPITAL
                    <i className="fa fa-location-arrow icon-left11"></i>
                  </div>
                  <span className="innertext">{User.district}</span>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    );
  } else if (choice === UserTypes.BLOODBANK) {
    content = (
      <div>
        <Navigation user={UserTypes.BLOODBANK} />
        <div className="maincontainer">
          <div className="dashboardinfo">
            <h3 className="finalheading">Personal Information</h3>
            <ul>
              <div className="leftcolumn1">
                <li className="list">
                  <div className="flex1">
                    NAME OF BLOOD BANK
                    <i className="fas fa-hospital icon-left12"></i>
                  </div>
                  <span className="innertext">{User.name}</span>
                </li>
              </div>
              <div className="leftcolumn2">
                <li className="list">
                  <div className="flex1">
                    DISTRICT OF BLOOD BANK
                    <i className="fas fa-location-arrow icon-left13"></i>
                  </div>
                  <span className="innertext">{User.district}</span>
                </li>
              </div>
              <div className="rightcolumn1">
                <li className="list">
                  <div className="flex1">
                    TELEPHONE<i className="fas fa-phone icon-left14"></i>
                  </div>
                  <span className="innertext">{User.telephone}</span>
                </li>
              </div>
              <div className="rightcolumn2">
                <li className="list">
                  <div className="flex1">
                    ADDRESS<i className="fas fa-map-marker-alt icon-left15"></i>
                  </div>
                  <span className="innertext">{User.address}</span>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
}

export default Dashboards;
