export default function formRoomValidation(
  building: string,
  type: string,
  roomNum: string,
  roomName: string,
  floor: string
) {
  let returnstring={};
  if(building==""){
    returnstring += "Please provide a building.\n"
  }
  if(type=="" || type =="selectType"){
    returnstring += "Please provide a room type.\n"
  }
  if(roomNum==""){
    returnstring += "Please provide a room number.\n"
  }
  if(roomName==""){
    returnstring += "Please provide a room name.\n"
  }
  if(floor==""){
    returnstring += "Please provide a floor number.\n"
  }
  return returnstring;
}
