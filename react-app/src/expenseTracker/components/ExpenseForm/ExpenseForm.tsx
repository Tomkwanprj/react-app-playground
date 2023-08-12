import React from "react";

const ExpenseTracker = () => {
  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input type="text" className="form-control" />
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input type="number" className="form-control" />
        </div>
      </form>
    </>
  );
};

export default ExpenseTracker;
