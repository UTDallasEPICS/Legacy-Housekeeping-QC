import React, { useState } from "react";

const ReportForm = () => {
  const [report, setReport] = useState({
    team_member_id: "",
    room_id: "",
    cleaned: false,
    comments: "test",
    score: 100,
    // Add more fields as necessary
  });

  const handleChange = (event) => {
    setReport({
      ...report,
      [event.target.name]: event.target.value,
    });
  };

  function handleCheckboxChange(e) {
    const value = e.target.checked;
    const name = e.target.name;

    setReport((prevReport) => ({
      ...prevReport,
      [name]: value,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send a POST request to the API to add the new report
    const response = await fetch("/api/roomReport/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(report),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response data: ", data);

    // Clear the form
    event.target.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
        margin: "0 auto",
      }}
    >
      <input
        type="text"
        name="team_member_id"
        value={report.team_member_id}
        onChange={handleChange}
        placeholder="Team Member ID"
        style={{ margin: "10px 0", padding: "5px" }}
      />
      <input
        type="text"
        name="room_id"
        value={report.room_id}
        onChange={handleChange}
        placeholder="Room ID"
        style={{ margin: "0px 0", padding: "5px" }}
      />
      <div style={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
        <label htmlFor="cleaned" style={{ margin: "0px 0" }}>
          Cleaned?
        </label>
        <input
          type="checkbox"
          id="cleaned"
          name="cleaned"
          checked={report.cleaned}
          onChange={handleCheckboxChange}
        />
      </div>
      <button
        type="submit"
        style={{
          padding: "10px",
          backgroundColor: "#141c3b",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "5px",
        }}
      >
        Add Report
      </button>
    </form>
  );
};

export default ReportForm;
