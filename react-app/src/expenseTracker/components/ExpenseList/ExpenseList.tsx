import { Expense } from "../../../App";

interface ExpenseListProps {
  expenseList: Expense[];
  handleDelete: (id: number) => void;
}

const ExpenseList = ({ expenseList, handleDelete }: ExpenseListProps) => {
  if (expenseList.length == 0) return null;

  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th> </th>
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
                  onClick={() => handleDelete(expense.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>
              $
              {expenseList
                .map((expense) => expense.amount)
                .reduce(
                  (accumulator, currentValue) => accumulator + currentValue
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
