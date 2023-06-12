import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Navigation from "./Navigation";
import Dropdown from "./Dropdown";
import "./LoginAndSignUp.css";
import { DropDown, FormNames, InputType, InputFieldName } from "./utils/Enums";
import { validateForm, validateField } from "./Validation";
import {
  NICField,
  fullNameField,
  userNameField,
  hospitalNameField,
  bloodBankNameField,
  bloodTypeField,
  birthDateField,
  addressField,
  passwordField,
  loginPasswordField,
  districtField,
  telephoneField,
} from "./InputFeilds";

import { Backend_URL } from "./App";


export default function Test(props) {
  const history = useHistory();


  const loginCommon = [userNameField, loginPasswordField];
  const loginReqCommon = [userNameField.name, loginPasswordField.name];
  const H_BB_Common = [
    districtField,
    telephoneField,
    addressField,
    passwordField,
  ];
  const H_BB_ReqCommon = [
    userNameField.name,
    districtField.name,
    telephoneField.name,
    addressField.name,
    passwordField.name,
  ];

  const forms = [
    {
      formName: FormNames.DONOR_SIGNUP,
      requiredFields: [
        NICField.name,
        fullNameField.name,
        birthDateField.name,
        telephoneField.name,
        // donorAddressField.name,
        passwordField.name,
      ],
      fields: [
        NICField,
        fullNameField,
        // genderField,
        birthDateField,
        bloodTypeField,
        telephoneField,
        // donorAddressField,
        passwordField,
      ],
    },
    {
      formName: FormNames.BLOODBANK_SIGNUP,
      requiredFields: [bloodBankNameField.name, ...H_BB_ReqCommon],
      fields: [userNameField, bloodBankNameField, ...H_BB_Common],
    },
    {
      formName: FormNames.HOSPITAL_SIGNUP,
      requiredFields: [hospitalNameField.name, ...H_BB_ReqCommon],
      fields: [userNameField, hospitalNameField, ...H_BB_Common],
    },
    {
      formName: FormNames.ADMIN_SIGNUP,
      requiredFields: [userNameField.name, passwordField.name],
      fields: [userNameField, passwordField],
    },
    {
      formName: FormNames.DONOR_LOGIN,
      requiredFields: [NICField.name, loginPasswordField.name],
      fields: [NICField, loginPasswordField],
    },
    {
      formName: FormNames.HOSPITAL_LOGIN,
      requiredFields: [...loginReqCommon],
      fields: [...loginCommon],
    },
    {
      formName: FormNames.BLOODBANK_LOGIN,
      requiredFields: [...loginReqCommon],
      fields: [...loginCommon],
    },
    {
      formName: FormNames.ADMIN_LOGIN,
      requiredFields: [...loginReqCommon],
      fields: [...loginCommon],
    },
  ];

  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputChange = (fieldName, value) => {
    const newFormValues = {
      ...formValues,
      [fieldName]: value,
    };
    setFormValues(newFormValues);

    const error = validateField(fieldName, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const formSubmitted = async (formValues, formName) => {
    if (formName === FormNames.DONOR_SIGNUP) {
      console.log("Donor Signup form submitted");
      const dobString = formValues[InputFieldName.BIRTHDATE].toString().slice(0, 10);

      const newDonor = {
        NIC: formValues[InputFieldName.NIC],
        password: formValues[InputFieldName.PASSWORD],
        dob: dobString,
        name: formValues[InputFieldName.FULLNAME],
        bloodtype: formValues[InputFieldName.BLOODTYPE],
        telephone: Number(formValues[InputFieldName.TELEPHONE]),
      };
      try {
        const { data } = await axios.post(
          `${Backend_URL}/Donor/add`,
          newDonor,
          {
            withCredentials: true,
          }
        );
        const { success, message } = data;
        if (success) {
          alert(message);
          setTimeout(() => {
            history.push("/donorLoginPage");
          }, 2000);
        } else {
          alert(message);
        }
      } catch (error) {
        console.log(error);
      }
      return;
    } else if (formName === FormNames.DONOR_LOGIN) {
      console.log("Donor Login form submitted");
      // console.log(formValues[InputFieldName.NIC]);
      // console.log(formValues[InputFieldName.LOGINPASSWORD]);

      const donor = {
        NIC: formValues[InputFieldName.NIC],
        password: formValues[InputFieldName.PASSWORD],
      };

      try {
        const { data } = await axios.post(
          `${Backend_URL}/Donor/login`,
          donor,
          {
            withCredentials: true,
          }
        );
        const { success, message } = data;
        if (success) {
          alert(message);
          setTimeout(() => {
            history.push("/donorDashboard");
          }, 2000);
        } else {
          alert(message);
        }
      } catch (error) {
        console.log(error);
      }
      return;
    } else if (formName === FormNames.ADMIN_SIGNUP) {
      console.log("Admin Signup form submitted");
      const newadmin = {
        username: formValues[InputFieldName.USERNAME],
        password: formValues[InputFieldName.PASSWORD],
      };
      console.log(newadmin);
      try {
        const { data } = await axios.post(
          `${Backend_URL}/admin/add`,
          newadmin,
          {
            withCredentials: true,
          }
        );
        const { success, message } = data;
        if (success) {
          alert(message);
          setTimeout(() => {
            history.push("/adminLoginPage");
          }, 2000);
        } else {
          alert(message);
        }
      } catch (error) {
        console.log(error);
      }

      return;
    } else if (formName === FormNames.ADMIN_LOGIN) {
      const Admin = {
        username: formValues[InputFieldName.USERNAME],
        password: formValues[InputFieldName.PASSWORD],
      };
      try {
        const { data } = await axios.post(
          `${Backend_URL}/admin/login`,
          Admin,
          {
            withCredentials: true,
          }
        );
        const { success, message } = data;
        if (success) {
          alert(message);
          setTimeout(() => {
            history.push("/adminDashboard");
          }, 2000);
        } else {
          alert(message);
        }
      } catch (error) {
        console.log(error);
      }
      return;
    } else if (formName === FormNames.HOSPITAL_SIGNUP) {
      const newhospital = {
        username: formValues[InputFieldName.USERNAME],
        password: formValues[InputFieldName.PASSWORD],
        name: formValues[InputFieldName.HOSPITALNAME],
        district: formValues[InputFieldName.DISTRICT],
        telephone: Number(formValues[InputFieldName.TELEPHONE]),
        address: formValues[InputFieldName.ADDRESS],
      };
      console.log(newhospital);
      try {
        const { data } = await axios.post(
          `${Backend_URL}/hospital/add`,
          newhospital,
          {
            withCredentials: true,
          }
        );
        const { success, message } = data;
        if (success) {
          alert(message);
          setTimeout(() => {
            history.push("/hospitalLoginPage");
          }, 2000);
        } else {
          alert(message);
        }
      } catch (error) {
        console.log(error);
      }
      return;
    } else if (formName === FormNames.HOSPITAL_LOGIN) {
      console.log("Hospital Login form submitted");
      const Hospital = {
        username: formValues[InputFieldName.USERNAME],
        password: formValues[InputFieldName.PASSWORD],
      };
      try {
        const { data } = await axios.post(
          `${Backend_URL}/hospital/login`,
          Hospital,
          {
            withCredentials: true,
          }
        );
        const { success, message } = data;
        if (success) {
          alert(message);
          setTimeout(() => {
            history.push("/hospitalDashboard");
          }, 2000);
        } else {
          alert(message);
        }
      } catch (error) {
        console.log(error);
      }
      return;
    } else if (formName === FormNames.BLOODBANK_SIGNUP) {
      console.log("Bloodbank Signup form submitted");
      const newbloodBank = {
        username: formValues[InputFieldName.USERNAME],
        password: formValues[InputFieldName.PASSWORD],
        name: formValues[InputFieldName.BLOODBANKNAME],
        district: formValues[InputFieldName.DISTRICT],
        telephone: Number(formValues[InputFieldName.TELEPHONE]),
        address: formValues[InputFieldName.ADDRESS],
      };
      console.log(newbloodBank);
      try {
        const { data } = await axios.post(
          `${Backend_URL}/bloodBank/add`,
          newbloodBank,
          {
            withCredentials: true,
          }
        );
        const { success, message } = data;
        if (success) {
          alert(message);
          setTimeout(() => {
            history.push("/bloodBankLoginPage");
          }, 2000);
        } else {
          alert(message);
        }
      } catch (error) {
        console.log(error);
      }
      return;
    } else if (formName === FormNames.BLOODBANK_LOGIN) {
      console.log("BLOODBANK Login form submitted");
      const BloodBank = {
        username: formValues[InputFieldName.USERNAME],
        password: formValues[InputFieldName.PASSWORD],
      };
      try {
        const { data } = await axios.post(
          `${Backend_URL}/bloodBank/login`,
          BloodBank,
          {
            withCredentials: true,
          }
        );
        const { success, message } = data;
        if (success) {
          alert(message);
          setTimeout(() => {
            history.push("/bloodBankDashboard");
          }, 2000);
        } else {
          alert(message);
        }
      } catch (error) {
        console.log(error);
      }
      return;
    }
  };

  let currentPage = props.page;

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateForm(forms, currentPage, formValues);

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      formSubmitted(formValues, props.page);
      console.log(formValues);
    }
  };

  const currentForm = forms.find((form) => form.formName === props.page);
  let page = props.page;
  let typeOfForm = "";
  let submitText = " ";

  if (page.includes("SIGNUP")) {
    if (page.includes("ADMIN")) {
      typeOfForm = "login";
    } else {
      typeOfForm = "signup";
    }
  } else if (page.includes("LOGIN")) {
    typeOfForm = "login";
  }

  submitText = typeOfForm.replace(/([A-Z])/g, " $1").toUpperCase();
  return (
    <div className="loginAndSingupContainer">
      <div className="loginAndSignupSide">
        <Navigation user="home" />
      </div>
      <div className={`${typeOfForm}Container`}>
        <h2 className="loginandsingupheading">{props.page}</h2>
        <hr className="loginAndSingUpLine"></hr>
        <form onSubmit={handleSubmit} className={`${typeOfForm}Form`}>
          {currentForm.fields.map((field) => (
            <div key={field.name} className={`${typeOfForm}formRows`}>
              <div className="formLabel">
                <label htmlFor={field.name}>{`${field.label} :`}</label>
              </div>
              <div className="errorContainer">
                {errors[field.name] && (
                  <span className="error">
                    {errors[field.name]}
                    <br />
                  </span>
                )}
              </div>
              {(field.type === InputType.TEXT ||
                field.type === InputType.PASSWORD ||
                field.type === InputType.DATE) && (
                <input
                  className="formInputBox"
                  placeholder={field.placeholder}
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formValues[field.name] || ""}
                  onChange={(e) =>
                    handleInputChange(field.name, e.target.value)
                  }
                />
              )}
              {field.type === InputType.DROPDOWN &&
                ((field.name === InputFieldName.BLOODTYPE && (
                  <Dropdown
                    dropdown={DropDown.BLOODTYPEDROPDOWN}
                    value={formValues[field.name] || ""}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    className="formInputBox"
                  />
                )) ||
                  (field.name === InputFieldName.DISTRICT && (
                    <Dropdown
                      dropdown={DropDown.DISTRICTDROPDOWN}
                      value={formValues[field.name] || ""}
                      onChange={(e) =>
                        handleInputChange(field.name, e.target.value)
                      }
                      className="formInputBox"
                    />
                  )))}
              {/* {field.type === InputType.RADIO && (
                <div className="genderContainer">
                  {field.options.map((option) => (
                    <div key={option}>
                      <label className="genderLabel" htmlFor={option}>
                        {option}
                      </label>
                      <input
                        type="radio"
                        id={option}
                        name={field.name}
                        value={option}
                        checked={formValues[field.name] === option}
                        onChange={(e) =>
                          handleInputChange(field.name, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              )} */}
              {field.type === InputType.TEXTAREA && (
                <textarea
                  className="formInputBox"
                  placeholder={field.placeholder}
                  id={field.name}
                  name={field.name}
                  value={formValues[field.name] || ""}
                  onChange={(e) =>
                    handleInputChange(field.name, e.target.value)
                  }
                />
              )}
            </div>
          ))}
          <button className={`${typeOfForm}Btn`} type="submit">
            {submitText}
          </button>
        </form>
      </div>
    </div>
  );
}
