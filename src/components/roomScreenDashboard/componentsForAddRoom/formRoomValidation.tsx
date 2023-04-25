export default function formRoomValidation(
  building: string,
  type: string,
  roomNum: string
) {
  if (!building || !type || !roomNum) {
    return "Please fill out all the fields";
  }
}
