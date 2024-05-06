import { StaticDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Card } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  setDateFilter,
  setInspectionsFetchData,
} from "../inspectionsFetchSlice";
import { splitInspectionWithStatus } from "../../splitInspectionWithStatus";

const InspectionDateSelector = () => {
  const dispatch = useDispatch();

  const handleDateChange = async (value: Dayjs) => {
    dispatch(setDateFilter(value.toISOString()));
    const inspectionFetchRes = await fetch("/api/roomReport/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: value.toISOString(),
      }),
    });
    const inspectionFetch = await inspectionFetchRes.json();
    const { inspected, notInspected } =
      splitInspectionWithStatus(inspectionFetch);
    dispatch(
      setInspectionsFetchData({
        inspected: inspected,
        notInspected: notInspected,
      })
    );
  };

  return (
    <Card>
      <StaticDatePicker
        defaultValue={dayjs()}
        onChange={handleDateChange}
        slotProps={{
          actionBar: {
            actions: ["today"],
          },
        }}
        sx={{
          ".MuiPickersToolbar-root": {
            display: "none",
          },
          ".MuiPickersCalendarHeader-label": {
            fontWeight: "bold",
          },
        }}
      />
    </Card>
  );
};
export default InspectionDateSelector;
