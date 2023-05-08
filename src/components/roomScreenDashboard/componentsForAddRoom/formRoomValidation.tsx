export default function formRoomValidation(
  building: string,
  type: string,
  roomNum: string,
  roomName: string,
  floor: string
) {
  if (!building || !type || !roomNum || !roomName || !floor) {
    return "Please fill out all the fields";
  }
}
