import { stripPhoneNumber } from "../../../../functions/phoneNumber";

export default function formValidation(
  email: string,
  emailRegEx: RegExp,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  phoneNumberRegEx: RegExp
) {
  if (!phoneNumber || !phoneNumberRegEx.test(stripPhoneNumber(phoneNumber))) {
    return "Enter a valid phone number.";
  }

  if (!emailRegEx.test(email) && !firstName && !lastName && !phoneNumber) {
    return "Fill out all fields.";
  }

  if (!firstName && !lastName && !phoneNumber) {
    return "Enter the first/last name and phone number.";
  }

  if (!emailRegEx.test(email) && !firstName && !lastName) {
    return "Enter a valid email, first/last name.";
  }

  if (!emailRegEx.test(email) && !firstName && !lastName) {
    return "Enter a valid email, first/last name, address, city, and state.";
  }

  if (!phoneNumber) {
    return "Enter the address, city, state, and ZIP code.";
  }

  if (!emailRegEx.test(email) && !firstName && !lastName) {
    return "Enter a valid email, first/last name, address, and city.";
  }

  if (!emailRegEx.test(email) && !firstName && !lastName) {
    return "Enter a valid email, first/last name, and address.";
  }

  if (!emailRegEx.test(email) && !firstName && !lastName) {
    return "Enter a valid email and first/last name.";
  }

  if (!emailRegEx.test(email) && !firstName) {
    return "Enter a valid email and first name.";
  }

  if (!emailRegEx.test(email) && !lastName) {
    return "Enter a valid email and last name.";
  }

  if (!emailRegEx.test(email)) {
    return "Enter a valid email.";
  }
}
