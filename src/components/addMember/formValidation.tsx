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
    return "Fill out all fields";
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
    return "Enter first/last name, address line, city, state, and ZIP";
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
    return "Enter valid email, first/last name, address line, city, state, and ZIP";
  }

  if (
    !lastName &&
    !addressLine &&
    !city &&
    !state &&
    !zipcode &&
    !phoneNumber
  ) {
    return "Enter last name, address line, city, state, and ZIP";
  }

  if (
    !emailRegEx.test(email) &&
    !firstName &&
    !lastName &&
    !addressLine &&
    !city &&
    !state
  ) {
    return "Enter valid email, first/last name, address line, city, and state";
  }

  if (!addressLine && !city && !state && !zipcode && !phoneNumber) {
    return "Enter address line, city, state, and ZIP";
  }

  if (
    !emailRegEx.test(email) &&
    !firstName &&
    !lastName &&
    !addressLine &&
    !city
  ) {
    return "Enter valid email, first/last name, address line, and city";
  }

  if (!emailRegEx.test(email) && !firstName && !lastName && !addressLine) {
    return "Enter valid email, first/last name, and address line";
  }

  if (!emailRegEx.test(email) && !firstName && !lastName) {
    return "Enter valid email and first/last name";
  }

  if (!emailRegEx.test(email) && !firstName) {
    return "Enter valid email and first name";
  }

  if (!emailRegEx.test(email) && !lastName) {
    return "Enter valid email and last name";
  }

  if (!emailRegEx.test(email)) {
    return "Enter valid email";
  }
}
