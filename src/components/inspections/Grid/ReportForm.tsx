import React, { useState } from 'react';

const ReportForm = () => {
  const [report, setReport] = useState({
    team_member_id: '',
          room_id: '',
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
  
    setReport(prevReport => ({
      ...prevReport,
      [name]: value
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send a POST request to the API to add the new report
    const response = await fetch('http://localhost:3000/api/roomReport/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="team_member_id"
        value={report.team_member_id}
        onChange={handleChange}
        placeholder="Team Member ID"
      />
      <input
        type="text"
        name="room_id"
        value={report.room_id}
        onChange={handleChange}
        placeholder="Room ID"
      />
      <input
        type="checkbox"
        name="cleaned"
        checked={report.cleaned}
        onChange={handleCheckboxChange}
      />
      <button type="submit">Add Report</button>
    </form>
  );
};

export default ReportForm;