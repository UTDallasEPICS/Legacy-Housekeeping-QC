export default function formValidation(
  email: String,
  emailRegEx,
  firstName: String,
  lastName: String,
  addressLine: String,
  city: String,
  state: String,
  zipcode: String,
  phoneNumber: String
) {
  if (
    !emailRegEx.test(email) &&
    !firstName &&
    !lastName &&
    !addressLine &&
    !city &&
    !state &&
    !zipcode &&
    !phoneNumber
  ) {
    return "Fill out all fields.";
  }

  if (
    !firstName &&
    !lastName &&
    !addressLine &&
    !city &&
    !state &&
    !zipcode &&
    !phoneNumber
  ) {
    return "Enter the first/last name, address, city, state, and ZIP code.";
  }

  if (
    !emailRegEx.test(email) &&
    !firstName &&
    !lastName &&
    !addressLine &&
    !city &&
    !state &&
    !zipcode
  ) {
    return "Enter a valid email, first/last name, address, city, state, and ZIP code.";
  }

  if (
    !lastName &&
    !addressLine &&
    !city &&
    !state &&
    !zipcode &&
    !phoneNumber
  ) {
    return "Enter the last name, address, city, state, and ZIP code.";
  }

  if (
    !emailRegEx.test(email) &&
    !firstName &&
    !lastName &&
    !addressLine &&
    !city &&
    !state
  ) {
    return "Enter a valid email, first/last name, address, city, and state.";
  }

  if (!addressLine && !city && !state && !zipcode && !phoneNumber) {
    return "Enter the address, city, state, and ZIP code.";
  }

  if (
    !emailRegEx.test(email) &&
    !firstName &&
    !lastName &&
    !addressLine &&
    !city
  ) {
    return "Enter a valid email, first/last name, address, and city.";
  }

  if (!emailRegEx.test(email) && !firstName && !lastName && !addressLine) {
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
