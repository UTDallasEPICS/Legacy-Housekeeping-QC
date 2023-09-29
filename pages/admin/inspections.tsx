import { Card } from "@mui/material";
import { InspectionGrid, Navbar, InspectionCheckBox, ReportComponent} from "../../src/components";
import { report } from "process";


const inspections = () => {
  
  const inspectionsData = [
    {
      team_member: {
        first_name: "FirstName",
        last_name: "LastName",
        email: "test@gmail.com",
        country_code: 1,
        state_code: 1,
        phone_number: 1234567890,
        address_line: "1234 Test Street",
        zipcode: 12345,
        city: "Test City",
        state: "Test State",
      },
      room: {
        room_number: 123,
        building_number: 456,
        is_clean: true,
        is_active: true,
        type_of_room: "Bathroom",
      },
      room_id: 456,
      date: "2021-10-10",
      cleaned: true,
      comments: "Cleaned",
      total_points: 100,
    },
  ];

  return (
    <>
      <Navbar></Navbar>
      <main>
        <InspectionGrid reports={inspectionsData}></InspectionGrid>
        
        {/*<ReportComponent report={inspectionsData[0]}></ReportComponent>*/}

        {/*<InspectionCheckBox></InspectionCheckBox>*/}

      </main>
    </>
  );
};

export default inspections;
