import React from "react";
import { Expense } from "../../../App";

interface ExpenseLitProp {
  expenseList: Expense[];
  handleDeleteClick: (id: number) => void;
}

const ExpenseList = ({ expenseList, handleDeleteClick }: ExpenseLitProp) => {
  return (
    <>
      {/* table>thead>tr>th*4 */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenseList.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>{expense.category}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDeleteClick(expense.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total </td>
            <td>
              $
              {expenseList
                .reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.amount,
                  0
                )
                .toFixed(2)}
            </td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default ExpenseList;
