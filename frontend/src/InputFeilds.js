import { InputType ,InputFieldName } from "./utils/Enums";
  
  export const NICField =  
     { name: InputFieldName.NIC, 
       type: InputType.TEXT, 
       label: "NIC",  
       placeholder: "Enter NIC"
     };
  export const fullNameField = 
     { name: InputFieldName.FULLNAME, 
       type: InputType.TEXT, 
       label: "Full Name",  
       placeholder: "Enter Full Name" 
     };
  export const hospitalNameField = 
     { name: InputFieldName.HOSPITALNAME,
       type: InputType.TEXT, 
       label: "Name Of Hospital",
       placeholder: "Enter Name Of Hospital"
     };
  export const bloodBankNameField = 
    { name: InputFieldName.BLOODBANKNAME ,
      type: InputType.TEXT, 
      label: "Name Of Blood Bank",
      placeholder: "Enter Name Of Blood Bank"
    };
  export const userNameField = 
    { name: InputFieldName.USERNAME , 
      type: InputType.TEXT, label: "Username",
      placeholder: "Enter Username"
    };
  // export const genderField = 
  //   { name: InputFieldName.GENDER,
  //     type: InputType.RADIO,
  //     label: "Gender", 
  //     placeholder: "Gender",
  //     options: ["Male", "Female"],
  //   };
  export const birthDateField = 
    { name: InputFieldName.BIRTHDATE, 
      type: InputType.DATE, 
     label: "Date Of Birth",
    };
  export const bloodTypeField =  
  { name: InputFieldName.BLOODTYPE, 
    type: InputType.DROPDOWN, 
    label: "Blood Type",
    placeholder: "Blood Type"} ;
  export const telephoneField =
  { name: InputFieldName.TELEPHONE, 
    type: InputType.TEXT, 
    label: "Telephone Number",
    placeholder: "Enter Telephone Number"
  };
  // export const donorAddressField = 
  // { name: InputFieldName.DONORADDRESS,
  //   type: InputType.TEXTAREA, 
  //   label: "Address",  
  //   placeholder: "Enter Address"
  // };
  export const addressField = 
  { name: InputFieldName.ADDRESS, 
    type: InputType.TEXTAREA, 
    label: "Address",  
    placeholder: "Enter Address"
  };
  export const districtField = 
  { name: InputFieldName.DISTRICT, 
    type: InputType.DROPDOWN, 
    label: "District Located In" 
  };
  export const passwordField = 
  { name: InputFieldName.PASSWORD, 
    type: InputType.PASSWORD, 
    label: "Password", 
    placeholder: "Enter Password" 
  };
  export const loginPasswordField = 
  { name: InputFieldName.LOGINPASSWORD, 
    type: InputType.PASSWORD, 
    label: "Password", 
    placeholder: "Enter Password" 
  };
