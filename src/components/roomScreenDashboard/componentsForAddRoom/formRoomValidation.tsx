export default function formRoomValidation(
  building: string,
  roomNum: string,
  type: string
) {
  if (!building && !roomNum && !type) {
    return "Please fill out all the fields";
  }
}
