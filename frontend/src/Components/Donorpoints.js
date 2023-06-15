import React from "react";
import Navigation from "./Navigation";
import './Styles/Donorpoints.css';
import rewardpic from '../images/rewardimage2.png';


export default function Donorpoints(props) {
     return (
       <div>
         <Navigation user="donor"/>
        
         <img src={rewardpic} className='reward' />
         <div className="box">
          <br/>
          <div className="border">
         <p className="paragraph">DONOR POINTS EARNED ARE</p>
         <p className="numberpoint">60</p>
         </div>
         </div>
       </div>
     );
}