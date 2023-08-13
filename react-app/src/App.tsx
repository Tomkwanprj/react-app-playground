import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button/Button";
import ListGroup from "./components/ListGroup";
import Like from "./components/Like";
import "./App.css";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import produce from "immer";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import ExpandableText from "./components/ExpandableText";
import Form from "./components/Form/Form";
import ExpenseTracker from "./expenseTracker/components/ExpenseForm/ExpenseForm";
import ExpenseList from "./expenseTracker/components/ExpenseList/ExpenseList";
import ExpenseFilter from "./expenseTracker/components/ExpenseFilter/ExpenseFilter";
import ExpenseForm from "./expenseTracker/components/ExpenseForm/ExpenseForm";

/* 
  Props                        State
  input passed to a component, Data managed by a component
  Similar to function args   , Similar to local variables
  Immutable                  , Mutable
  Re-render the component    , Re-render the component
  Update the dom             , Update the dom
*/

/*
  Do not create another new state variable when you
  can compute the value of it by using the existing
  one
*/

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

function App() {
  let items = ["New York", "San Fransico", "Tokyo", "London", "Paris"];

  const [isVisible, updateVisibility] = useState(false);

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const handleButtonClickItem = (text: string) => {
    updateVisibility(true);
  };

  const handleLikeItem = () => {
    console.log("Like is clicked");
  };

  const [bugs, setBugs] = useState([
    { id: 1, title: "Bug 1", fixed: false },
    { id: 2, title: "Bug 2", fixed: false },
  ]);

  //Immer example
  const handleBugsClick = () => {
    // setBugs([...bugs, { id: 3, title: "Bug 3", fixed: false }]);
    // setBugs(bugs.map((e) => (e.id == 1 ? { ...e, fixed: true } : e)));
    // use immer

    setBugs(
      produce((draft) => {
        const bug = draft.find((bug) => bug.id === 1);
        if (bug) bug.fixed = true;
      })
    );
  };

  const [cart, setCart] = useState({
    discount: 0.1,
    items: [
      { id: 1, title: "Product 1", quantity: 1 },
      { id: 2, title: "Product 2", quantity: 1 },
    ],
  });

  //how to handle a object with array in it
  const handleCartClick = () => {
    setCart({
      ...cart,
      items: cart.items.map((item) =>
        item.id === 1 ? { ...item, quantity: 2 } : item
      ),
    });
  };

  //ExpenseTracker Section
  const [expenseList, setExpenseList] = useState<Expense[]>([
    { id: 1, description: "Milk", amount: 5, category: "Groceries" },
    { id: 2, description: "Eggs", amount: 10, category: "Groceries" },
    { id: 3, description: "Game", amount: 100, category: "Entertainment" },
    { id: 4, description: "Towel", amount: 40, category: "Utilities" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const handleDeleteExpense = (id: number) => {
    setExpenseList(
      produce((draft) => {
        const index = draft.findIndex((expense) => expense.id == id);
        if (index !== -1) draft.splice(index, 1);
      })
    );
  };

  const handleSelect = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <>
      {/* <div>
        <ExpandableText maxChar={20}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          bibendum aliquam justo. Donec placerat molestie volutpat. Sed interdum
          convallis nisl quis porta. Donec ut rutrum eros. Quisque vulputate
        </ExpandableText>
      </div>

      <BsFillCalendarCheckFill color="red" size={40}></BsFillCalendarCheckFill>

      <ListGroup
        items={items}
        heading={"Oh My List"}
        onSelectItem={handleSelectItem}
      />

      {isVisible ? (
        <Alert onClose={() => updateVisibility(false)}>
          <span>Hello World</span>
        </Alert>
      ) : null}

      <Like onLikeClicked={handleLikeItem}></Like>

      <div>
        {cart.items.map((item) => (
          <div>{item.id + ": " + item.quantity}</div>
        ))}
        <Button color="primary" onButtonClicked={handleCartClick}>
          "Hello World"
        </Button>
      </div> */}

      {/* <Form></Form> */}

      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenseList(
              produce((draft) => {
                draft.push({
                  id: draft.length + 1,
                  ...expense,
                });
              })
            )
          }
        ></ExpenseForm>
      </div>

      <div className="mb-3">
        <ExpenseFilter handleSelect={handleSelect}></ExpenseFilter>
      </div>

      <ExpenseList
        expenseList={expenseList.filter(
          (expense) =>
            expense.category == selectedCategory || selectedCategory == "All"
        )}
        handleDelete={handleDeleteExpense}
      ></ExpenseList>
    </>
  );
}

export default App;
