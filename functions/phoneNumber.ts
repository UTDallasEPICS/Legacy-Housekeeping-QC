export interface PhoneNumber {
  country_code: string;
  state_code: string;
  phone_number: string;
}

export function stripPhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/[^0-9+]/g, "");
}

export function formatPhoneNumberForDisplay(
  country_code: string,
  state_code: string,
  phone_number: string
) {
  if (!country_code || !state_code || !phone_number) {
    return null;
  }
  return `${country_code} (${state_code}) ${phone_number}`;
}

export function formatPhoneNumberForApi(phoneNumber: string): PhoneNumber {
  if (!phoneNumber) {
    return {
      country_code: null,
      state_code: null,
      phone_number: null,
    };
  }
  // Split into country code, state code, and phone number
  const phoneParts = stripPhoneNumber(phoneNumber).match(
    /^(\+\d{1,3})(\d{3})(\d{3})(\d{4})$/
  );
  return {
    country_code: phoneParts[1],
    state_code: phoneParts[2],
    phone_number: phoneParts[3] + "-" + phoneParts[4],
  };
}

export const PHONE_NUMBER_REG_EX = new RegExp(/^(\+|d)[0-9]{7,16}$/);
