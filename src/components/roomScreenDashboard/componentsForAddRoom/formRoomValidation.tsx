export default function formRoomValidation(
  building: string,
  type: string,
  roomName: string,
  floor: number,
) {
  let returnarray: any ={};
  let errorCount = 0;

  if(building == ""){
    returnarray["building"] = "Please provide a building."
    errorCount++;
  }
  if(type == "" || type == "selectType"){
    returnarray["type"] = "Please provide a room type."
    errorCount++;
  }
  if(roomName == ""){
    returnarray["name"] = "Please provide a room name."
    errorCount++;
  }
  if(floor == 0){
    returnarray["floor"] = "Please provide a floor number."
    errorCount++;
  }
  if (errorCount <= 0){
    return 0;
  }
  else{
    return returnarray;
  }
  
}
