// Array of invalid characters
let invalids = [
  "#", // Having a # in a building name causes an error.
];


export default function formBuildingValidation(
  buildingName: string,
  floorsAmount: number,
) {
  let returnarray: any = {};
  returnarray["name"]= "";
  returnarray["invalid"]= "";
  returnarray["flooramount"]= "";
  let errorCount = 0;

  let invalidChar = false; // Name Contains invalid character(s)

  invalids.forEach(element => {
    if(buildingName.includes(element)){
      invalidChar = true;
      errorCount++;
    }
  });
  
  if (buildingName==""){
    returnarray["name"]= "Please provide a Building Name.\n";
    errorCount++;
  }

  if (invalidChar) {
    returnarray["invalid"] += "Invalid Characters: [";
    for (let index = 0; index < invalids.length; index++) {
      const element = invalids[index];
      if(index>0){
        returnarray["invalid"]+=", "
      }
      returnarray["invalid"] += (element);
    }
    returnarray["invalid"] += "]\n";
  }

  if(floorsAmount<=0){
    returnarray["flooramount"] = "Floors Amount must be greater than zero.";
    errorCount++;
  }
  if (errorCount<=0){
    return 0;
  }
  else{
    return returnarray;
  }

}
