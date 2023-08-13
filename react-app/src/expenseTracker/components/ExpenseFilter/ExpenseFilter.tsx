import React from "react";
import categoryList from "../../categories";

interface ExpenseFilterProps {
  handleSelect: (value: string) => void;
}

const ExpenseFilter = ({ handleSelect }: ExpenseFilterProps) => {
  return (
    <>
      <select
        className="form-select"
        onChange={(event) => handleSelect(event.target.value)}
      >
        <option value="All">All categories</option>
        {categoryList.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </>
  );
};

export default ExpenseFilter;
