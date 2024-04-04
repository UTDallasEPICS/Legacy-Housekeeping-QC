export default function formValidation(
  email: String,
  emailRegEx,
  firstName: String,
  lastName: String,
  phoneNumber: String
) {
  if (
    !emailRegEx.test(email) &&
    !firstName &&
    !lastName &&
    !phoneNumber
  ) {
    return "Fill out all fields.";
  }

  if (
    !firstName &&
    !lastName &&
    !phoneNumber
  ) {
    return "Enter the first/last name, address, city, state, and ZIP code.";
  }

  if (
    !emailRegEx.test(email) &&
    !firstName &&
    !lastName
  ) {
    return "Enter a valid email, and first/last name";
  }

  if (
    !lastName &&
    !phoneNumber
  ) {
    return "Enter the last name, address, city, state, and ZIP code.";
  }

  if (
    !emailRegEx.test(email) &&
    !firstName &&
    !lastName
  ) {
    return "Enter a valid email, first/last name, address, city, and state.";
  }

  if (!phoneNumber) {
    return ""
  }

  if (
    !emailRegEx.test(email) &&
    !firstName &&
    !lastName
  ) {
    return "Enter a valid email and first/last name.";
  }

  if (!emailRegEx.test(email) && !firstName && !lastName) {
    return "Enter a valid email, first/last name, and address.";
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
