import React from "react";

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
        <option value="Groceries">Groceries</option>
        <option value="Utilities">Utilities</option>
        <option value="Entertainment">Entertainment</option>
      </select>
    </>
  );
};

export default ExpenseFilter;
