import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./Components/Navigation"
import LoginAndSignUp from "./Components/LoginAndSignUp";
// import HomePage from "./HomePage";
import FAQs from "./Components/FAQs";
import Table from "./Components/Table";
import Dashboards from "./Components/Dashboards";
import Donorpoints from "./Components/Donorpoints";
import BloodCountChart from "./Components/BloodCountChart";
import About from "./Components/About";
import { UserTypes } from "./utils/Enums";

import { TableNames } from "./utils/Enums";
import { FormNames } from "./utils/Enums";

// export const Backend_URL="http://localhost:8070"
export const Backend_URL = "https://blood-donation-system-btsr.onrender.com";

function App() {
  return (
    <Router>
      <Route exact path="/">
      <About user={UserTypes.ABOUT} />
      </Route>
      <Route exact path="/about">
        <About user={UserTypes.ABOUT} />
      </Route>
      <Route path="/aboutDonor">
        <About user={UserTypes.DONOR} />
      </Route>
      <Route path="/aboutHospital">
        <About user={UserTypes.HOSPITAL} />
      </Route>
      <Route path="/aboutBloodBank">
        <About user={UserTypes.BLOODBANK} />
      </Route>
      <Route path="/aboutAdmin">
        <About user={UserTypes.ADMIN} />
      </Route>
      <Route path="/FAQs">
        <FAQs />
      </Route>
      <Route path="/location1">
        <Navigation user={UserTypes.DONOR} />
        <Table tableName={TableNames.DONORLOCATION} />
      </Route>
      <Route path="/donorPoints">
        <Donorpoints />
      </Route>
      <Route path="/bloodBankChart">
        <Navigation user={UserTypes.BLOODBANK} />
        <BloodCountChart user={UserTypes.BLOODBANK}/>
      </Route>
      <Route path="/hospitalChart">
        <Navigation user={UserTypes.HOSPITAL} />
        <BloodCountChart user={UserTypes.HOSPITAL}  />
      </Route>

      <Route path="/donorLoginPage">
        <LoginAndSignUp page={FormNames.DONOR_LOGIN} user={UserTypes.DONOR} />
      </Route>
      <Route path="/donorSignUpPage">
        <LoginAndSignUp page={FormNames.DONOR_SIGNUP} />
      </Route>
      <Route path="/adminLoginPage">
        <LoginAndSignUp page={FormNames.ADMIN_LOGIN} user={UserTypes.ADMIN} />
      </Route>
      <Route path="/adminSignUpPage">
        <LoginAndSignUp page={FormNames.ADMIN_SIGNUP} />
      </Route>
      <Route path="/hospitalLoginPage">
        <LoginAndSignUp
          page={FormNames.HOSPITAL_LOGIN}
          user={UserTypes.HOSPITAL}
        />
      </Route>
      <Route path="/hospitalSignUpPage">
        <LoginAndSignUp page={FormNames.HOSPITAL_SIGNUP} />
      </Route>
      <Route path="/bloodBankLoginPage">
        <LoginAndSignUp
          page={FormNames.BLOODBANK_LOGIN}
          user={UserTypes.BLOODBANK}
        />
      </Route>
      <Route path="/bloodBankSignUpPage">
        <LoginAndSignUp page={FormNames.BLOODBANK_SIGNUP} />
      </Route>

      <Route path="/donorHistory">
        <Navigation user={UserTypes.DONOR} />
        <Table tableName={TableNames.DONORHISTORY} />
      </Route>
      <Route path="/donorSearch">
        <Navigation user={UserTypes.BLOODBANK} />
        <Table tableName={TableNames.DONORSEARCH} />
      </Route>
      <Route path="/bloodBankSearch">
        <Navigation user={UserTypes.HOSPITAL} />
        <Table tableName={TableNames.BLOODBANKSEARCH} />
      </Route>
      <Route path="/hospitalPending">
        <Navigation user={UserTypes.ADMIN} />
        <Table tableName={TableNames.HOSPITALPENDING} />
      </Route>
      <Route path="/hospitalAccepted">
        <Navigation user={UserTypes.ADMIN} />
        <Table tableName={TableNames.HOSPITALACCEPTED} />
      </Route>
      <Route path="/bloodBankPending">
        <Navigation user={UserTypes.ADMIN} />
        <Table tableName={TableNames.BLOODBANKPENDING} />
      </Route>
      <Route path="/bloodBankAccepted">
        <Navigation user={UserTypes.ADMIN} />
        <Table tableName={TableNames.BLOODBANKACCEPTED} />
      </Route>

      <Route path="/donorDashboard">
        <Dashboards user={UserTypes.DONOR} />
      </Route>
      <Route path="/adminDashboard">
        <Dashboards user={UserTypes.ADMIN} />
      </Route>
      <Route path="/hospitalDashboard">
        <Dashboards user={UserTypes.HOSPITAL} />
      </Route>
      <Route path="/bloodBankDashboard">
        <Dashboards user={UserTypes.BLOODBANK} />
      </Route>

    
    </Router>
  );
}

export default App;

/*
import {BrowserRouter as Router, Route} from "react-router-dom"
import Navigation from './Navigation';
import LoginAndSignUp from './LoginAndSignUp';
import HomePage from "./HomePage";
import FAQs from "./FAQs";
import Table from "./Table";
import Dashboards from "./Dashboards";
import Location1 from './Location1';
import Donorpoints from './Donorpoints';
import BloodCountChart from './BloodCountChart';
import Test from './Test';

function App() {
  return (
    <Router>
      <Route exact path='/'>
        
          <Navigation user='bloodBank'/>
          
         
        
      </Route>
      <Route path='/home'>
         <HomePage/>
      </Route>
      <Route path='/FAQs'>
         <FAQs/>
      </Route>
      <Route path='/location1'>
        <Location1/>
      </Route>
      <Route path='/location2'>
        <Navigation user="donor"/>
        <Table tableName="DONOR LOCATION"/>
      </Route>
      <Route path='/donorPoints'>
        <Donorpoints/>
      </Route>
      <Route path='/bloodBankChart'>
        <Navigation user="bloodBank"/>
        <BloodCountChart/>
      </Route>
      <Route path='/hospitalChart'>
        <Navigation user="hospital"/>
        <BloodCountChart/>
      </Route>
      {/*
      <Route path='/donorLoginPage'>
         <Test page={'donorLogin'}/>
      </Route>
      <Route path='/donorSignUpPage'>
         <Test page={'donorSignup'}/>
      </Route>
      <Route path='/adminLoginPage'>
          <Test  page={'adminLogin'}/>
      </Route>
      <Route path='/adminSignUpPage'>
          <Test page={'adminSignup'}/>
      </Route>
      <Route path='/hospitalLoginPage'>
          <Test page={'hospitalLogin'}/>
      </Route>
      <Route path='/hospitalSignUpPage'>
         <Test page={'hospitalSignup'}/>
      </Route>
      <Route path='/bloodBankLoginPage'>
         <Test  page={'bloodBankLogin'}/>
      </Route>
      <Route path='/bloodBankSignUpPage'>
         <Test page={'bloodBankSignup'}/>
      </Route>
  

      <Route path='/donorHistory'>
         <Navigation user='donor' />
         <Table tableName={"DONOR HISTORY"} />
      </Route>
      <Route path='/donorSearch'>
         <Navigation user='bloodBank'/>
         <Table tableName={"DONOR SEARCH"}/>
      </Route>
      <Route path='/bloodBankSearch'>
         <Navigation user='hospital'/>
         <Table tableName={"BLOOD BANK SEARCH"}/>
      </Route>
      <Route path='/hospitalPending'>
         <Navigation user='admin'/>
         <Table tableName={"HOSPITAL PENDING REQUESTS"}/>
      </Route>
      <Route path='/hospitalAccepted'>
         <Navigation user='admin'/>
         <Table tableName={"HOSPITAL ACCEPTED REQUESTS"}/>
      </Route>
      <Route path='/bloodBankPending'>
        <Navigation user='admin'/>
        <Table tableName={"BLOOD BANK PENDING REQUESTS"}/>
      </Route>
      <Route path='/bloodBankAccepted'>
        <Navigation user='admin'/>  
        <Table tableName={"BLOOD BANK ACCEPTED REQUESTS"}/>
      </Route>

      <Route path='/donorDashboard'>
        <Dashboards user='donor'/>
      </Route>
      <Route path='/adminDashboard'>
        <Dashboards user='admin'/>
      </Route>
      <Route path='/hospitalDashboard'>
        <Dashboards user='hospital'/>
      </Route>
      <Route path='/bloodBankDashboard'>
        <Dashboards user='bloodBank'/>
      </Route>







    </Router>

    
  )
}

export default App;*/
