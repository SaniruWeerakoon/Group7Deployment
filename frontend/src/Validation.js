import React from 'react'
import { InputFieldName} from "./utils/Enums";

export function validateField(fieldName, value) {
    if (!value  ||value.trim() === "") {
      if (fieldName === InputFieldName.LOGINPASSWORD) {
        return "Password is required.";
      }else {
        return `${fieldName} is required.`;
      }
    }
    if (fieldName === InputFieldName.NIC && (value.length !== 12 || !/^\d+$/.test(value))) {
      return "NIC should be a 12-digit number.";
    }
    if (
      fieldName === InputFieldName.TELEPHONE &&
      (value.length !== 10 || !/^\d+$/.test(value))
    ) {
      return "telephone number should be a 10-digit number.";
    }
    if (fieldName === InputFieldName.BIRTHDATE) {
      const currentDate = new Date();
      const dob = new Date(value);
  
      if (currentDate.getFullYear() - dob.getFullYear() < 18) {
        return "You must be at least 18 years old to sign up.";
      }
    }
    
    if (
      fieldName === InputFieldName.PASSWORD &&
      (value.length < 8 ||
        !/[a-z]/.test(value) ||
        !/[A-Z]/.test(value) ||
        !/\d/.test(value) ||
        !/[!@#$%^&*()]/.test(value))
       
    ) {
      return "password should be at least 8 characters long and contain a mix of uppercase, lowercase, digits, and symbols.";
    }
    if (
      fieldName === InputFieldName.PASSWORD &&
      (value.length > 16 ||
        !/[a-z]/.test(value) ||
        !/[A-Z]/.test(value) ||
        !/\d/.test(value) ||
        !/[!@#$%^&*()]/.test(value))
       
    ) {
      return "password should have a maximum of 16 characters.";
    }
  
    return "";
  }


export function validateForm(forms, currentPage, formValues) {
    const currentForm = forms.find((form) => form.formName === currentPage);
    const requiredFields = currentForm.requiredFields;
    const newErrors = {};
  
    requiredFields.forEach((field) => {
      const error = validateField(field, formValues[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
  
    return newErrors;
  }