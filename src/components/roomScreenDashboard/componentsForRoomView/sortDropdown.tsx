import React, { useState } from "react";

interface sortDropdownProps {
  onSortChange: (value: string) => void;
}

const SortDropdown: React.FC<sortDropdownProps> = ({ onSortChange }) => {

  const [sortOption, setSortOption] = useState("default");

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOption = event.target.value;
    setSortOption(newSortOption);
    onSortChange(newSortOption);
  };

  return (
    <div>
      <select
        style={{ fontSize: 25 }}
        onChange={handleSort}
        value={sortOption}
      >
        <option value="default">All</option>
        <option value="PERSONAL_ROOM">Personal Room</option>
        <option value="COMMON_AREA">Common Area</option>
      </select>  
    
    </div>
  );
};

export default SortDropdown;