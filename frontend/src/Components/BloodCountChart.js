import React, { useState  } from "react";
import "./Styles/BloodCountChart.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";


function BloodCountChart() {
  const [bloodCounts, setBloodCounts] = useState([
    { name: "A+", count: 0 },
    { name: "A-", count: 0 },
    { name: "B+", count: 0 },
    { name: "B-", count: 0 },
    { name: "AB+", count: 0 },
    { name: "AB-", count: 0 },
    { name: "O+", count: 0 },
    { name: "O-", count: 0 },
  ]);

  function handleCountUpdate(index, value) {
    if (isNaN(value)) {
      value = 0;
    }
    const newValue = value < 0 ? 0 : value;

    setBloodCounts((prevState) =>
      prevState.map(
        (count, i) => (i === index ? { ...count, count: newValue } : count),
        console.log(bloodCounts),
        console.log(index),
        console.log(prevState),
        console.log(value)

      )
    );
  }
  
  return (
    <div className="borderbox">
      <p className="frequencytext">Frequency of blood group (In Pints) </p>
      <div className="Barchart">
        <BarChart       
      width={600}
      height={400}
      data={bloodCounts}
      barCategoryGap={18}
      barGap={9}
      border-radius={80}
      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
    >
          <CartesianGrid stroke="white" strokeDasharray="1" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" className="bar">
            {bloodCounts.map((bloodCount, index) => {
              const barColor = bloodCount.count > 2 ? "green" : "red";
              return <Cell key={index} fill={barColor}  />;
            })}
          </Bar>
        </BarChart>
        <p className="Bloodtypetext">Blood Type</p>
      </div>
        <div>
          <div className="circle green"></div>
          <p className="infoone">High</p>
        </div>
        <div>
          <div className="circle red"></div>
          <p className="infotwo">Low</p>
      </div>
   
      <div className="IncrementDecrementButtons">

    <p className="bloodcount">Blood Count</p>
    
  {bloodCounts.map((bloodCountno, index) => (
    console.log(bloodCountno),
    <div key={index} className="numberborder">
      <span className="bloodtypes">{bloodCountno.name}</span>
      <input className="bloodlabels"
        type="number"
        step="0.01"
        value={bloodCountno.count}
        onChange={(e) =>
          handleCountUpdate(index, parseFloat(e.target.value))
        }
        onWheel={(e) => e.target.blur()}
      />
      </div>
   
  ))}
  <button className="submit" >Submit Changes</button>
</div>

</div>);}



export default BloodCountChart;


