import './Styles/Dropdown.css';
import React, { useState } from "react";

const DropDown = {
  DISTRICTDROPDOWN: "districtdropdown",
  BLOODTYPEDROPDOWN: "bloodtypedropdown",
};

function Dropdown(props) {
  const { value, onChange } = props;
  const [selectedOption, setSelectedOption] = useState(value);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onChange(event);
  };

    if (props.dropdown === DropDown.DISTRICTDROPDOWN) {
      return (
        <div>
          <select value={selectedOption} onChange={handleSelectChange} className='dropdown' >
          <option hidden value="" className="default">
           Select a district
          </option> 
          <option value="1">Ampara</option>
          <option value="2">Anuradhapura</option>
          <option value="3">Badulla</option>
          <option value="4">Batticaloa</option>
          <option value="5">Colombo</option>
          <option value="6">Galle</option>
          <option value="7">Gampaha</option>
          <option value="8">Hambantota</option>
          <option value="9">Jaffna</option>
          <option value="10">Kalutara</option>
          <option value="11">Kandy</option>
          <option value="12">Kegalla</option>
          <option value="13">Kilinochchi</option>
          <option value="14">Kurunegala</option>
          <option value="15">Mannar</option>
          <option value="16">Matale</option>
          <option value="17">Matara</option>
          <option value="18">Moneragala</option>
          <option value="19">Mullaitivu</option>
          <option value="20">Nuwara Eliya</option>
          <option value="21">Polonnaruwa</option>
          <option value="22">Puttalam</option>
          <option value="23">Ratnapura</option>
          <option value="24">Trincomalee</option>
          <option value="25">Vavuniya</option>
        </select>
        </div>
      );
    }

    if (props.dropdown === DropDown.BLOODTYPEDROPDOWN) {

      return (
        <div>
        <select value={selectedOption} onChange={handleSelectChange} className='dropdown'>
        <option hidden value="" className="default">
           Select a blood type
        </option>   
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
      </select>
        </div>
      );
    
  };


  }

export default Dropdown;