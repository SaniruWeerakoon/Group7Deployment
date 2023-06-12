import React, { useState, useEffect } from "react";
import "./Table.css";
import Dropdown from "./Dropdown";
import { TableNames } from "./utils/Enums";
import { DropDown } from "./utils/Enums";
import { validateForm, validateField } from "./Validation";
import axios from "axios";

import { Backend_URL } from "./App";


function Table({ tableName }) {
  const [id, setId] = useState([]);
  const [name, setName] = useState([]);
  const [NIC, setNIC] = useState([]);
  const [telephone, setTelephone] = useState([]);
  const [location, setLocation] = useState([]);
  const [password, setpassword] = useState([]);
  const [username, setusername] = useState([]);
  const [district, setdistrict] = useState([]);
  const [pbloodbank, setpbloodbank] = useState([]);
  const [pHospitals, setpHospitals] = useState([]);
  const [Hospitals, setHospitals] = useState([]);
  const [BloodBanks, setBloodBanks] = useState([]);
  const user = "admin";
  console.log("test " + name);

  useEffect(() => {
    console.log("user is " + user);
    if (user === "Donor") {
      axios
        .get(`${Backend_URL}/Donor/`)
        .then((response) => {
          const responseData = response.data;
          const NICs = responseData.map((item) => item.NIC);
          const names = responseData.map((item) => item.name);
          const telephones = responseData.map((item) => item.telephone);

          setNIC(NICs);
          setName(names);
          setTelephone(telephones);
        })
        .catch((error) => {
          console.log("Error fetching data:", error);
        });
    } else if (user === "BloodBank" || user === "Hospital") {
      axios.get(`${Backend_URL}/${user}/`).then((response) => {
        const responseData = response.data;
        const ids = responseData.map((item) => item.id);
        const names = responseData.map((item) => item.name);
        const telephones = responseData.map((item) => item.telephone);
        const locations = responseData.map((item) => item.address);
        const usernames = responseData.map((item) => item.username);
        const districts = responseData.map((item) => item.district);
        const passwords = responseData.map((item) => item.password);

        setId(ids);
        setName(names);
        setTelephone(telephones);
        setLocation(locations);
        setusername(usernames);
        setdistrict(districts);
        setpassword(passwords);

        console.log("test2 ");
      });
    } else if (user === "admin") {
      axios.get(`${Backend_URL}/admin/`).then((response) => {
        const responseData = response.data;
        const pendingBB = responseData.pendingBB;
        const pendingH = responseData.pendingH;
        const Hosps = responseData.Hosps;
        const Banks = responseData.Banks;
        setpbloodbank(pendingBB);
        setpHospitals(pendingH);
        setHospitals(Hosps);
        setBloodBanks(Banks);
      });
    }
  }, []);

  ///////
  const [inputValueArray, setInputValueArray] = useState([]);
  const [errors, setErrors] = useState({});
  const [dropdownValues, setDropdownValues] = useState({
    bloodtypedropdown: "",
    districtdropdown: "",
  });

  const handleDropdownChange = (event, dropdownName) => {
    const value = event.target.value;
    setDropdownValues((prevState) => ({
      ...prevState,
      [dropdownName]: value,
    }));
  };

  const bloodTypeValue = dropdownValues.bloodtypedropdown;
  const districtValue = dropdownValues.districtdropdown;

  function deletebtn(e) {
    e.preventDefault();
    axios
      .delete(`http://localhost:8070/bloodBank/delete/${id}`)
      .then(() => {
        alert("Deleted successfully");
        window.location.reload();
      })
      .catch((error) => {
        alert("Deletion unsuccessful");
        console.log(error);
      });
  }

  function acceptbtn(
    e,
    name,
    telephone,
    location,
    username,
    password,
    district,
    id,
    check
  ) {
    let user2 = "";
    let user3 = "";
    if (check == 1) {
      user2 = "confirmedBloodBank";
      user3 = "bloodBank";
    } else {
      user2 = "confirmedHospital";
      user3 = "hospital";
    }
    e.preventDefault();
    const newBank = {
      name,
      telephone,
      address: location,
      username,
      password,
      district,
    };
    axios
      .post(`http://localhost:8070/${user2}/add`, newBank)
      .then(() => {
        alert("confirmedBloodBank added to the database");
      })
      .catch((err) => {
        alert(err);
      });
    axios
      .delete(`http://localhost:8070/${user3}/delete/${id}`)
      .then(() => {
        alert("Deleted successfully");
        window.location.reload();
      })
      .catch((error) => {
        alert("Deletion unsuccessful");
        console.log(error);
      });
  }

  const handleChange = (event, index) => {
    const value = event.target.value;
    setInputValueArray((prevState) => {
      const newState = [...prevState];
      newState[index] = value;
      return newState;
    });
  };
  ///////// Donor search /////////

  const [dateValue, setDateValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [pintsValue, setPintsValue] = useState("");
  const [rewardValue, setRewardValue] = useState("");

  const handleSubmit = (index, name) => {
    const startIndex = index * 4;
    const rowValues = inputValueArray.slice(startIndex, startIndex + 4);
    console.log(`Submit button clicked for index ${index + 1}`);
    console.log(rowValues[0], rowValues[1], rowValues[2], rowValues[3]);

    setDateValue(rowValues[0] || "");
    setTypeValue(rowValues[1] || "");
    setPintsValue(rowValues[2] || "");
    setRewardValue(rowValues[3] || "");

    const formValues = {
      date: rowValues[0] || "",
      type: rowValues[1] || "",
      pints: rowValues[2] || "",
      reward: rowValues[3] || "",
    };

    const currentPage = tableName;

    const forms = [
      {
        formName: currentPage,
        requiredFields: ["pints", "reward", "type", "date"],
      },
    ];

    const newErrors = validateForm(forms, currentPage, formValues);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [`row${index}`]: newErrors,
    }));

    if (Object.keys(newErrors).length === 0) {
      console.log(formValues);
      const newdonation = {
        name,
        dateValue,
        typeValue,
        pintsValue,
        rewardValue,
      };
      axios
        .post("http://localhost:8070/donation/add", name, formValues)
        .then(() => {
          alert("donation added to the database");
        })
        .catch((err) => {
          alert(err);
        });
      console.log("done " + name, formValues);
    } else {
      alert("error");
    }
  };
  //////////

  const tables = {
    [TableNames.DONORHISTORY]: {
      columns: [
        "DATE OF DONATION",
        "BLOOD TYPE",
        "QUANTITY OF BLOOD DONATED IN PINTS",
        "NAME OF BLOOD BANK",
        "LOCATION OF BLOOD BANK",
        "CONTACT DETAILS",
      ],
    },
    [TableNames.DONORLOCATION]: {
      columns: ["NAME OF BLOOD BANK", "CONTACT DETAILS", "DISTRICT", "ADDRESS"],
    },
    [TableNames.DONORSEARCH]: {
      columns: [
        "NIC OF DONOR",
        "DATE OF DONATION",
        "NAME OF DONOR",
        "TELEPHONE DETAILS",
        "ENTER BLOOD TYPE",
        "ENTER LOCATION OF BLOOD BANK",
        "ENTER AMOUNT OF BLOOD DONATED [IN PINTS]",
        "REWARD POINTS",
        "CONFIRM CHANGES",
      ],
    },
    [TableNames.BLOODBANKSEARCH]: {
      columns: [
        "BLOOD BANK NAME",
        "BLOOD TYPE",
        "AMOUNT OF BLOOD",
        "LOCATION",
        "CONTACT DETAILS",
      ],
    },
    [TableNames.BLOODBANKPENDING]: {
      columns: ["NAME OF BLOOD BANK", "TELEPHONE NUMBER", "LOCATION", "ACTION"],
    },
    [TableNames.BLOODBANKACCEPTED]: {
      columns: ["NAME OF BLOOD BANK", "TELEPHONE NUMBER", "LOCATION", "ACTION"],
    },
    [TableNames.HOSPITALACCEPTED]: {
      columns: ["NAME OF HOSPITAL", "TELEPHONE NUMBER", "LOCATION", "ACTION"],
    },
    [TableNames.HOSPITALPENDING]: {
      columns: ["NAME OF HOSPITAL", "TELEPHONE NUMBER", "LOCATION", "ACTION"],
    },
  };

  const tableData = tables[tableName];

  if (!tableData) {
    return <div>No table found</div>;
  }

  const { columns } = tableData;

  let rows;
  rows = generateRows(
    tableName,
    inputValueArray,
    setInputValueArray,
    handleChange,
    handleSubmit,
    errors,
    NIC,
    name,
    telephone,
    location,
    acceptbtn,
    password,
    district,
    username,
    id,
    deletebtn,
    pbloodbank,
    pHospitals,
    Hospitals,
    BloodBanks
  );

  return (
    <div>
      <h2 className="tablename">{tableName}</h2>

      <div className="tablecover">
        {tableName === TableNames.DONORSEARCH && (
          <input
            type="text"
            className="search"
            onChange={(e) => setName(e.target.value.toLowerCase())}
            placeholder="Search . . ."
          />
        )}
        {tableName === TableNames.BLOODBANKSEARCH && ( //?//
          <div className="row-container">
            <div className="dropdown5">
              <Dropdown
                dropdown={DropDown.DISTRICTDROPDOWN}
                value={dropdownValues.districtdropdown}
                onChange={(event) =>
                  handleDropdownChange(event, DropDown.DISTRICTDROPDOWN)
                }
              />
            </div>
            <div className="dropdown4">
              <Dropdown
                dropdown={DropDown.BLOODTYPEDROPDOWN}
                value={dropdownValues.bloodtypedropdown}
                onChange={(event) =>
                  handleDropdownChange(event, DropDown.BLOODTYPEDROPDOWN)
                }
              />
            </div>
            <button className="submit3">Submit</button>
          </div>
        )}
        {tableName === TableNames.DONORLOCATION && ( //??//
          <div className="row-container">
            <div className="dropdown3">
              <Dropdown dropdown={DropDown.DISTRICTDROPDOWN} />
            </div>
            <div>
              <button className="submit2">Submit</button>
            </div>
          </div>
        )}

        <table className="tablemain">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          {rows.length === 0 ? (
            <p className="norows">No rows found</p>
          ) : (
            <>
              <tbody>
                {rows.map((row, rowindex) => (
                  <tr key={rowindex}>
                    {Object.values(row).map((cell, cellindex) => (
                      <td key={cellindex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>
    </div>
  );
}

function generateRows(
  tableName,
  inputValueArray,
  setInputValueArray,
  handleChange,
  handleSubmit,
  errors,
  NIC,
  name,
  telephone,
  location,
  acceptbtn,
  password,
  district,
  username,
  id,
  deletebtn,
  pbloodbank,
  pHospitals,
  Hospitals,
  BloodBanks
) {
  console.log(pbloodbank.length, pHospitals, Hospitals, BloodBanks);
  const rows = [];
  let check = 0;
  // const filteredData = username.filter((username) =>
  //   username.toLowerCase().includes(name.toLowerCase())
  // );

  if (tableName === TableNames.DONORHISTORY) {
    const dateValues = ["1/2/12", "8", "8/9/10", "9"];
    const bloodValues = ["a"];
    const quantityValues = [1, 2, 3, 3];
    const location = [""];
    const nameofbloodbank = [""];
    const contactdetails = ["9"];
    const numRows = 7;
    for (let i = 0; i < numRows; i++) {
      const row = {
        "DATE OF DONATION": dateValues[i],
        "BLOOD TYPE": bloodValues[i],
        "QUANTITY OF BLOOD DONATED IN PINTS": quantityValues[i],
        "NAME OF BLOOD BANK": nameofbloodbank[i],
        "LOCATION OF BLOOD BANK": location[i],
        "CONTACT DETAILS": contactdetails[i],
      };
      rows.push(row);
    }
  } else if (tableName === TableNames.DONORLOCATION) {
    const namebloodbank = ["Narahempital Bloodbank"];
    const contact = ["0999999", "822222"];
    const district = [];
    const address = ["a"];
    const numRows = 6;
    for (let i = 0; i < numRows; i++) {
      const row = {
        "NAME OF BLOOD BANK": namebloodbank[i],
        "CONTACT DETAILS": contact[i],
        DISTRICT: district[i],
        ADDRESS: address[i],
      };
      rows.push(row);
    }
  } else if (tableName === TableNames.DONORSEARCH) {
    ////// donor search  //////////filteredData.length
    const numberofRows = name.length;
    const locationInput = [""];
    for (let i = 0; i < numberofRows; i++) {
      const rowErrors = errors[`row${i}`] || {};

      const row = {
        "NIC OF DONOR": NIC[i],
        "DATE OF DONATION": (
          <>
            <input
              type="date"
              name="date"
              value={inputValueArray[i * 4] || ""}
              onChange={(event) => handleChange(event, i * 4)}
            />
            {/*{rowErrors.date && <div style={{ color: 'red' }}>{rowErrors.date}</div>}*/}
            {rowErrors["date"] && (
              <div style={{ color: "red" }}>{rowErrors["date"]}</div>
            )}
          </>
        ),
        "NAME OF DONOR": name[i],
        "TELEPHONE DETAILS": telephone[i],
        "ENTER BLOOD TYPE": (
          <>
            <div className="dropdown6">
              <Dropdown
                dropdown="bloodtypedropdown"
                value={inputValueArray[i * 4 + 1] || ""}
                onChange={(event) => handleChange(event, i * 4 + 1)}
              />
            </div>
            {rowErrors.type && (
              <div style={{ color: "red" }}>{rowErrors.type}</div>
            )}
          </>
        ),
        "ENTER LOCATION OF BLOOD BANK": locationInput[i],
        "ENTER AMOUNT OF BLOOD DONATED [IN PINTS]": (
          <>
            <input
              type="number"
              min="0"
              value={inputValueArray[i * 4 + 2] || ""}
              onChange={(event) => handleChange(event, i * 4 + 2)}
            />
            {rowErrors.pints && (
              <div style={{ color: "red" }}>{rowErrors.pints}</div>
            )}
          </>
        ),
        "REWARD POINTS": (
          <>
            <input
              type="number"
              min="0"
              value={inputValueArray[i * 4 + 3] || ""}
              onChange={(event) => handleChange(event, i * 4 + 3)}
            />
            {rowErrors.reward && (
              <div style={{ color: "red" }}>{rowErrors.reward}</div>
            )}
          </>
        ),
        "CONFIRM CHANGES": (
          <button
            className="submitbutton"
            onClick={() => handleSubmit(i, name[i])}
            type="submit"
          >
            Submit
          </button>
        ),
      };
      rows.push(row);
    }
  } else if (tableName === TableNames.BLOODBANKSEARCH) {
    const name = ["monaragala", "moratuwa"];
    const bloodtype = ["a"];
    const quantity = [1, 2, 3, 3];
    const contactdetails = ["2222"];
    const location = ["wwwww"];
    const numberofrows = 3;
    for (let i = 0; i < numberofrows; i++) {
      const row = {
        "BLOOD BANK NAME": name[i],
        "BLOOD TYPE": bloodtype[i],
        "AMOUNT OF BLOOD": quantity[i],
        LOCATION: location[i],
        "CONTACT DETAILS": contactdetails[i],
      };
      rows.push(row);
    }
  } else if (tableName === TableNames.BLOODBANKPENDING) {
    ///////////// Blood bank pending ///////////
    const numberofrows = pbloodbank.length;
    check = 1;
    for (let i = 0; i < numberofrows; i++) {
      const row = {
        "NAME OF BLOOD BANK": pbloodbank[i].name,
        "TELEPHONE NUMBER": pbloodbank[i].telephone,
        ADDRESS: pbloodbank[i].address,
        ACTION: (
          <div className="acceptAndDeclineBtn">
            <div>
              <button
                className="acceptBtn"
                onClick={() => {
                  AcceptOrDecline(pbloodbank[i].username, "true", "BloodBank");
                }}
              >
                ACCEPT
              </button>
            </div>
            <div>
              <button
                className="declineBtn"
                onClick={() => {
                  AcceptOrDecline(pbloodbank[i].username, "false", "BloodBank");
                }}
              >
                DECLINE
              </button>
            </div>
          </div>
        ),
      };
      rows.push(row);
    }
  } else if (tableName === TableNames.HOSPITALPENDING) {
    ///////////// hospital pending ///////////
    check = 2;
    const numberofrows = pHospitals.length;
    for (let i = 0; i < numberofrows; i++) {
      const row = {
        "NAME OF BLOOD BANK": pHospitals[i].name,
        "TELEPHONE NUMBER": pHospitals[i].telephone,
        ADDRESS: pHospitals[i].address,
        ACTION: (
          <div className="acceptAndDeclineBtn">
            <div>
              <button
                className="acceptBtn"
                onClick={(e) =>
                  AcceptOrDecline(pHospitals[i].username, "true", "Hospital")
                }
              >
                ACCEPT
              </button>
            </div>
            <div>
              <button
                className="declineBtn"
                onClick={(e) => {
                  AcceptOrDecline(pHospitals[i].username, "false", "Hospital");
                }}
              >
                DECLINE
              </button>
            </div>
          </div>
        ),
      };
      rows.push(row);
    }
  } else if (tableName === TableNames.HOSPITALACCEPTED) {
    // const name_b = ["hospital4", "hospital5", "hospital6"];
    // const telephone_b = ["1212121212", "2323232323", "1212121212"];
    // const location_b = ["location1", "location2", "location3"];
    const declinebtn_b = (
      <button
        className="declineBtn"
        onClick={() => {
          //AcceptOrDecline(Hospitals[i].username, "false", "Hospital");
        }}
      >
        DECLINE
      </button>
    );
    const numberofrows = Hospitals.length;
    for (let i = 0; i < numberofrows; i++) {
      const row = {
        "NAME OF BLOOD BANK": Hospitals[i].name,
        "TELEPHONE NUMBER": Hospitals[i].telephone,
        ADDRESS: Hospitals[i].address,
        ACTION: declinebtn_b,
      };
      rows.push(row);
    }
  } else if (tableName === TableNames.BLOODBANKACCEPTED) {
    // const name_b = ["bloodbank1", "bloodbank2", "bloodbank3"];
    // const telephone_b = ["1212121212", "2323232323", "1212121212"];
    // const location_b = ["location1", "location2", "location3"];
    const declinebtn_b = <button className="declineBtn" onClick={()=>{}}>DECLINE</button>;
    const numberofrows = BloodBanks.length;
    for (let i = 0; i < numberofrows; i++) {
      const row = {
        "NAME OF BLOOD BANK": BloodBanks[i].name,
        "TELEPHONE NUMBER": BloodBanks[i].telephone,
        ADDRESS: BloodBanks[i].address,
        ACTION: declinebtn_b,
      };
      rows.push(row);
    }
  }

  return rows;
}
async function AcceptOrDecline(username, choice, type) {
  //if possible shud make a windows.refresh to update the new list in the table
  await axios
    .post(`${Backend_URL}/admin/AcceptOrDecline`, {
      username,
      choice,
      type,
    })
    .then((response) => {
      if (response.data.success === true) {
        console.log("Successful");
      } else {
        console.log("Unsuccessful");
      }
    });
}
export default Table;
