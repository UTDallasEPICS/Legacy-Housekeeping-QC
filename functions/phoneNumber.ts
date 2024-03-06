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
  const phoneParts = phoneNumber.split(/-| /);
  return {
    country_code: phoneParts[0],
    state_code: phoneParts[1],
    phone_number: phoneParts[2] + "-" + phoneParts[3],
  };
}
