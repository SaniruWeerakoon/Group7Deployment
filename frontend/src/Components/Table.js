import React, { useState, useEffect } from "react";
import "./Styles/Table.css";
import Dropdown from "./Dropdown";
import { TableNames, Routes } from "../utils/Enums";
import { DropDown } from "../utils/Enums";
import { validateForm, validateField } from "./Validation";
import axios from "axios";
import { Backend_URL } from "../App";
function Table({ tableName }) {
  const [value, setValue] = useState("");
  const [name, setName] = useState([]);
  const [NIC, setNIC] = useState([]);
  const [telephone, setTelephone] = useState([]);
  const [location, setLocation] = useState([]);
  const [username, setusername] = useState([]);
  const [district, setdistrict] = useState([]);
  const [pbloodbank, setpbloodbank] = useState([]);
  const [pHospitals, setpHospitals] = useState([]);
  const [Hospitals, setHospitals] = useState([]);
  const [BloodBanks, setBloodBanks] = useState([]);
  const [date, setDate] = useState([]);
  const [pint, setPint] = useState([]);
  const [type, setType] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  let user = "";
  if (tableName == TableNames.DONORHISTORY) {
    user = Routes.donation;
  } else if (
    tableName == TableNames.DONORLOCATION ||
    tableName == TableNames.BLOODBANKSEARCH
  ) {
    user = Routes.bloodBank;
  } else {
    user = Routes.admin;
  }
  let newusername = "Bank05";
  const [oPositive, setOpositive] = useState([]);
  const [oNegative, setONegative] = useState([]);
  const [aPositive, setApositive] = useState([]);
  const [aNegative, setANegative] = useState([]);
  const [bPositive, setBpositive] = useState([]);
  const [bNegative, setBNegative] = useState([]);
  const [abPositive, setABpositive] = useState([]);
  const [abNegative, setABNegative] = useState([]);

  const [donationUsername, setdonationUsername] = useState("");
  const [donationTelephone, setdonationTelephone] = useState("");
  const [donationLocation, setdonationLocation] = useState("");
  const [data, setData] = useState([]);

  if (tableName === TableNames.DONORSEARCH) {
    axios
      .get(`${Backend_URL}/bloodBank/`)
      .then((response) => {
        setData(response.data);
        const donationUser = response.data.find(
          (blood) => blood.username === newusername
        );
        if (donationUser) {
          setdonationUsername(donationUser.username);
          setdonationTelephone(donationUser.telephone);
          setdonationLocation(donationUser.address);
        } else {
          console.log("not found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    if (user === Routes.bloodBank) {
      axios
        .get(`${Backend_URL}/${user}/`)
        .then((response) => {
          const responseData = response.data;
          const districts = responseData.map((item) => item.district);
          const ids = responseData.map((item) => item.id);
          const names = responseData.map((item) => item.name);
          const telephones = responseData.map((item) => item.telephone);
          const locations = responseData.map((item) => item.address);
          const usernames = responseData.map((item) => item.username);

          const oPos = responseData.map((item) => item.oPositive);
          const aPos = responseData.map((item) => item.aPositive);
          const bPos = responseData.map((item) => item.bPositive);
          const abPos = responseData.map((item) => item.abPositive);
          const oNegs = responseData.map((item) => item.oNegative);
          const aNegs = responseData.map((item) => item.aNegative);
          const bNegs = responseData.map((item) => item.bNegative);
          const abNegs = responseData.map((item) => item.abNegative);

          setOpositive(oPos);
          setONegative(oNegs);
          setApositive(aPos);
          setANegative(aNegs);
          setBpositive(bPos);
          setBNegative(bNegs);
          setABpositive(abPos);
          setABNegative(abNegs);

          // setId(ids);
          setName(names);
          setTelephone(telephones);
          setLocation(locations);
          setusername(usernames);
          setdistrict(districts);
        })
        .catch((error) => {
          console.log("Error fetching data:", error);
        });
    } else if (user === Routes.donation) {
      axios
        .get(`${Backend_URL}/${user}/`)
        .then((response) => {
          const responseData = response.data;

          const names = responseData.map((item) => item.name);
          const filteredData = responseData.filter(
            (item) => item.name === newusername
          );
          const dates = filteredData.map((item) => item.date);
          const pints = filteredData.map((item) => item.pints);
          const locations = filteredData.map((item) => item.donationLocation);
          const types = filteredData.map((item) => item.type);
          const usernames = responseData.map((item) => item.donationUsername);
          const telephones = responseData.map((item) => item.telephone);

          setTelephone(telephones);
          setusername(usernames);
          setName(names);
          setDate(dates);
          setPint(pints);
          setLocation(locations);
          setType(types);
        })
        .catch((error) => {
          console.log("Error fetching data:", error);
        });
    } else if ((user = Routes.admin)) {
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
  const [selecteddistrict, setselecteddistrict] = useState("");
  const [selectedblood, setselectedblood] = useState("");
  const handleDropdownChange = (event, dropdownName) => {
    const selectedValue = event.target.value;
    setDropdownValues((prevState) => ({
      ...prevState,
      [dropdownName]: value,
    }));
    setValue(selectedValue);
    if (dropdownName === DropDown.DISTRICTDROPDOWN) {
      setselecteddistrict(selectedValue);
    } else if (dropdownName === "bloodtypedropdown") {
      setselectedblood(selectedValue);
    }
  };
  const [blood, setBlood] = useState([]);
  function bankSearch(e) {
    e.preventDefault();
    axios.get(`${Backend_URL}/${Routes.bloodBank}/`).then((response) => {
      const responseData = response.data;
      const filteredData = responseData.filter(
        (item) => item.district === selecteddistrict
      );
      const bloods = filteredData.map((item) => item[selectedblood]);
      const districts = filteredData.map((item) => item.district);
      const names = filteredData.map((item) => item.name);
      const telephones = filteredData.map((item) => item.telephone);
      const locations = filteredData.map((item) => item.address);

      setdistrict(districts);
      setName(names);
      setTelephone(telephones);
      setLocation(locations);
      setBlood(bloods);
    });
  }
  function locationHandle(e, value) {
    e.preventDefault();
    axios.get(`${Backend_URL}/${user}/`).then((response) => {
      const responseData = response.data;
      const filteredData = responseData.filter(
        (item) => item.district === value
      );
      const districts = filteredData.map((item) => item.district);
      const names = filteredData.map((item) => item.name);
      const telephones = filteredData.map((item) => item.telephone);
      const locations = filteredData.map((item) => item.address);

      setName(names);
      setTelephone(telephones);
      setLocation(locations);
      setdistrict(districts);
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
  const handleSubmit = (index, name, NIC) => {
    const startIndex = index * 4;
    const rowValues = inputValueArray.slice(startIndex, startIndex + 4);

    const formValues = {
      date: rowValues[0] || "",
      type: rowValues[1] || "",
      pints: rowValues[2] || "",
      reward: rowValues[3] || "",
      name,
      NIC,
      donationUsername,
      donationLocation,
      donationTelephone,
    };
    console.log("//////" + donationLocation, donationUsername);
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
      axios
        .post(`${Backend_URL}/donation/add`, formValues)
        .then(() => {
          alert("donation added to the database");
          console.log(
            "done " + formValues,
            name,
            donationUsername,
            donationLocation,
            donationTelephone
          );
        })
        .catch((err) => {
          alert(err);
        });
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
    handleChange,
    handleSubmit,
    errors,
    NIC,
    name,
    telephone,
    location,
    district,
    type,
    pint,
    date,
    pbloodbank,
    pHospitals,
    Hospitals,
    BloodBanks,
    blood,
    selectedblood,
    username,
    searchInput,
    setSearchInput
  );
  function handleSearchInputChange(e, value) {
    e.preventDefault();
    setSearchInput(value);
    axios.get(`${Backend_URL}/Donor/`).then((response) => {
      const responseData = response.data;
      const filteredData = responseData.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      const NICs = filteredData.map((item) => item.NIC);
      const names = filteredData.map((item) => item.name);
      const telephones = filteredData.map((item) => item.telephone);
      setNIC(NICs);
      setName(names);
      setTelephone(telephones);
    });
  }
  // const [searchValue,setsearchValue] = useState("");
  return (
    <div>
      <h2 className="tablename">{tableName}</h2>

      <div className="tablecover">
        {tableName === TableNames.DONORSEARCH && (
          <input
            type="text"
            className="search"
            value={searchInput}
            onChange={(e) => handleSearchInputChange(e, e.target.value)}
            placeholder="Please type a donor name..."
          />
        )}
        {tableName === TableNames.BLOODBANKSEARCH && ( //// Blood bank search //
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
            <button className="submit3" onClick={(e) => bankSearch(e)}>
              Submit
            </button>
          </div>
        )}
        {tableName === TableNames.DONORLOCATION && ( // location search //
          <div className="row-container">
            <div className="dropdown3">
              <Dropdown
                dropdown={DropDown.DISTRICTDROPDOWN}
                value={dropdownValues.districtdropdown}
                onChange={(event) =>
                  handleDropdownChange(event, DropDown.DISTRICTDROPDOWN)
                }
              />
            </div>
            <div>
              <button
                className="submit2"
                onClick={(e) => locationHandle(e, value)}
              >
                Submit
              </button>
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
                      <td key={cellindex}>
                        <div className="multiline-cell">{cell}</div>
                      </td>
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
  handleChange,
  handleSubmit,
  errors,
  NIC,
  name,
  telephone,
  location,
  district,
  type,
  pint,
  date,
  pbloodbank,
  pHospitals,
  Hospitals,
  BloodBanks,
  blood,
  selectedblood,
  username,
  searchInput,
  setSearchInput
) {
  const rows = [];
  let check = 0;
  // const filteredData = username.filter((username) =>
  //   username.toLowerCase().includes(name.toLowerCase())
  // );

  if (tableName === TableNames.DONORHISTORY) {
    //////// Donation History  ///////////
    const numRows = type.length;
    for (let i = 0; i < numRows; i++) {
      const row = {
        "DATE OF DONATION": date[i],
        "BLOOD TYPE": type[i],
        "QUANTITY OF BLOOD DONATED IN PINTS": pint[i],
        "NAME OF BLOOD BANK": username[i],
        "LOCATION OF BLOOD BANK": location[i],
        "CONTACT DETAILS": telephone[i],
      };
      rows.push(row);
    }
  } else if (tableName === TableNames.DONORLOCATION) {
    /////// blood bank locations /////////
    const numRows = name.length;
    for (let i = 0; i < numRows; i++) {
      const row = {
        "NAME OF BLOOD BANK": name[i],
        "CONTACT DETAILS": telephone[i],
        DISTRICT: district[i],
        ADDRESS: location[i],
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
            onClick={() => handleSubmit(i, name[i], NIC[i])}
            type="submit"
          >
            Submit
          </button>
        ),
      };
      rows.push(row);
    }
  } else if (tableName === TableNames.BLOODBANKSEARCH) {
    /////////  Blood bank search  /////////
    const numberofrows = name.length;
    for (let i = 0; i < numberofrows; i++) {
      const row = {
        "BLOOD BANK NAME": name[i],
        "BLOOD TYPE": selectedblood,
        "AMOUNT OF BLOOD": blood[i],
        LOCATION: district[i],
        "CONTACT DETAILS": telephone[i],
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
    const declinebtn_b = (
      <button className="declineBtn" onClick={() => {}}>
        DECLINE
      </button>
    );
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
        window.location.reload();
      } else {
        console.log("Unsuccessful");
      }
    });
}
export default Table;
