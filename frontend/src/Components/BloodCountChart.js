import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles/BloodCountChart.css";
import { Backend_URL } from "../App";
import { UserTypes, Routes } from "../utils/Enums";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

function BloodCountChart(props) {
  let user = props.user;
  const [data, setbloods] = useState([]);
  const [oPositive, setOpositive] = useState(0);
  const [oNegative, setONegative] = useState(0);
  const [aPositive, setApositive] = useState(0);
  const [aNegative, setANegative] = useState(0);
  const [bPositive, setBpositive] = useState(0);
  const [bNegative, setBNegative] = useState(0);
  const [abPositive, setABpositive] = useState(0);
  const [abNegative, setABNegative] = useState(0);

  let router = "";
  console.log("user2 is " + user);

  console.log("user is " + router);
  if (user === UserTypes.BLOODBANK) {
    router = Routes.bloodBank;
  } else {
    router = Routes.hospital;
  }
  let user2 = "Hospital05";
  useEffect(() => {
    axios
      .get(`${Backend_URL}/${router}/`)
      .then((response) => {
        setbloods(response.data);
        const user = response.data.find((blood) => blood.username === user2);
        if (user) {
          setOpositive(user.oPositive);
          setONegative(user.oNegative);
          setApositive(user.aPositive);
          setANegative(user.aNegative);
          setBpositive(user.bPositive);
          setBNegative(user.bNegative);
          setABpositive(user.abPositive);
          setABNegative(user.abNegative);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const bloodCounts = [
    { name: "A+", count: aPositive },
    { name: "A-", count: aNegative },
    { name: "B+", count: bPositive },
    { name: "B-", count: bNegative },
    { name: "AB+", count: abPositive },
    { name: "AB-", count: abNegative },
    { name: "O+", count: oPositive },
    { name: "O-", count: oNegative },
  ];

  function handleCountUpdate(index, value) {
    if (Number.isNaN(value)) {
      value = 0;
    }
    const newValue = value < 0 ? 0 : value;
    bloodCounts[index].count = newValue;
    setOpositive(bloodCounts[6].count);
    setONegative(bloodCounts[7].count);
    setApositive(bloodCounts[0].count);
    setANegative(bloodCounts[1].count);
    setBpositive(bloodCounts[2].count);
    setBNegative(bloodCounts[3].count);
    setABpositive(bloodCounts[4].count);
    setABNegative(bloodCounts[5].count);
  }
  ////////////////
  function updateData(e) {
    e.preventDefault();
    // Backend API endpoint
    const url = `${Backend_URL}/${router}/update/${user2}`;

    // Request body
    const updatedblood = {
      oPositive,
      oNegative,
      aPositive,
      aNegative,
      bPositive,
      bNegative,
      abPositive,
      abNegative,
    };

    // Send PUT request to update blood information by name
    axios
      .put(url, updatedblood)
      .then((response) => {
        alert(response.data.status);
      })
      .catch((error) => {
        alert("Error updating blood information: " + error.message);
      });
  }
  return (
    <form onSubmit={updateData}>
      <div className="borderbox">
        <div className="frequencytext">
          Frequency of blood group (In Pints){" "}
        </div>
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
                const barColor = bloodCount.count > 5 ? "green" : "red";
                return <Cell key={index} fill={barColor} />;
              })}
            </Bar>
          </BarChart>
          <p className="Bloodtypetext">Blood Type</p>
        </div>
        <div className="displaycontainer">
          <div>
            <div className="circle green"></div>
            <p className="infoone">High</p>
          </div>
          <div className="spacebetween" />
          <div>
            <div className="circle red"></div>
            <p className="infotwo">Low</p>
          </div>
        </div>
        <div className="IncrementDecrementButtons">
          <p className="bloodcount">Blood Count</p>

          {bloodCounts.map(
            (bloodCountno, index) => (
              console.log(bloodCountno),
              (
                <div key={index} className="numberborder">
                  <span className="bloodtypes">{bloodCountno.name}</span>
                  <input
                    className="bloodlabels"
                    type="number"
                    step="0.01"
                    value={bloodCountno.count}
                    onChange={(e) =>
                      handleCountUpdate(index, parseFloat(e.target.value))
                    }
                    onWheel={(e) => e.target.blur()}
                  />
                </div>
              )
            )
          )}
          <button className="submit">Submit Changes</button>
        </div>
      </div>
    </form>
  );
}

export default BloodCountChart;
