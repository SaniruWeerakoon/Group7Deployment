import React, { useState, useEffect } from "react";
import "./Table.css";
import Dropdown from "./Dropdown";
import { TableNames, Routes } from "./utils/Enums";
import { DropDown } from "./utils/Enums";
import { validateForm, validateField } from "./Validation";
import axios from "axios";
import { Backend_URL } from "./App";

function Table({ tableName }) {
  const [value, setValue] = useState("");
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
  console.log("test " + name);
  console.log("test2 " + type, date, pint);

  ///////
  const [inputValueArray, setInputValueArray] = useState([]);
  const [errors, setErrors] = useState({});
  const [dropdownValues, setDropdownValues] = useState({
    bloodtypedropdown: "",
    districtdropdown: "",
  });
  const handleDropdownChange = (event, dropdownName) => {
    const selectedValue = event.target.value;
    setDropdownValues((prevState) => ({
      ...prevState,
      [dropdownName]: value,
    }));
    setValue(selectedValue);
  };

  function locationHandle(e, value) {
    e.preventDefault();
    console.log("district " + value);
    axios.get(`http://localhost:8070/${user}/`).then((response) => {
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
      console.log(name, formValues);
      axios
        .post("http://localhost:8070/donation/add", formValues)
        .then(() => {
          alert("donation added to the database");
          console.log("done " + formValues, name);
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
    // setInputValueArray,
    handleChange,
    handleSubmit,
    errors,
    NIC,
    name,
    telephone,
    location,
    // password,
    district,
    // username,
    // id,
    type,
    pint,
    date,
    pbloodbank,
    pHospitals,
    Hospitals,
    BloodBanks,
    searchInput,
    setSearchInput
  );
  function handleSearchInputChange(e, value) {
    e.preventDefault();
    console.log("val " + value);
    setSearchInput(value);
    axios.get(`http://localhost:8070/Donor/`).then((response) => {
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
  // setInputValueArray,
  handleChange,
  handleSubmit,
  errors,
  NIC,
  name,
  telephone,
  location,
  // acceptbtn,
  // password,
  district,
  // username,
  // id,
  // deletebtn,
  type,
  pint,
  date,
  pbloodbank,
  pHospitals,
  Hospitals,
  BloodBanks,
  searchInput,
  setSearchInput
) {
  console.log(pbloodbank.length, pHospitals, Hospitals, BloodBanks);
  const rows = [];
  let check = 0;
  // const filteredData = username.filter((username) =>
  //   username.toLowerCase().includes(name.toLowerCase())
  // );

  if (tableName === TableNames.DONORHISTORY) {
    //////// Donation History  ///////////
    const location = [""];
    const nameofbloodbank = [""];
    const contactdetails = [""];
    const numRows = type.length;
    console.log("test 3 " + date, type, pint);
    for (let i = 0; i < numRows; i++) {
      const row = {
        "DATE OF DONATION": date[i],
        "BLOOD TYPE": type[i],
        "QUANTITY OF BLOOD DONATED IN PINTS": pint[i],
        "NAME OF BLOOD BANK": nameofbloodbank[i],
        "LOCATION OF BLOOD BANK": location[i],
        "CONTACT DETAILS": contactdetails[i],
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
    const bloodtype = ["a"];
    const quantity = [1, 2, 3, 3];
    const numberofrows = name.length;
    for (let i = 0; i < numberofrows; i++) {
      const row = {
        "BLOOD BANK NAME": name[i],
        "BLOOD TYPE": bloodtype[i],
        "AMOUNT OF BLOOD": quantity[i],
        LOCATION: location[i],
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
    // const name_b = ["bloodbank1", "bloodbank2", "bloodbank3"];
    // const telephone_b = ["1212121212", "2323232323", "1212121212"];
    // const location_b = ["location1", "location2", "location3"];
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
    .post("http://localhost:8070/admin/AcceptOrDecline", {
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
