import { FormEvent, useEffect, useRef, useState } from "react";
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
import categoryList from "./expenseTracker/categories";
import ExpenseList from "./expenseTracker/components/ExpenseList/ExpenseList";
import ExpenseFilter from "./expenseTracker/components/ExpenseFilter/ExpenseFilter";
import ExpenseForm from "./expenseTracker/components/ExpenseForm/ExpenseForm";
import { FieldValues } from "react-hook-form";
import UserList from "./components/UserList";
import axios from "axios";

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

/*
  If none of the action is affecting the rendering state,
  we can use useEffect();
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
    //Immer
    // setCart(
    //   produce((draft) => {
    //     const item = draft.items.find((item) => (item.id = 1));
    //     if (item) item.quantity = 2;
    //   })
    // );
    //Immutable way
    setCart({
      ...cart,
      items: [
        ...cart.items.map((item) =>
          item.id == 1 ? { ...item, quantity: 2 } : item
        ),
      ],
    });
  };

  const [game, setGame] = useState({
    id: 1,
    player: {
      name: "John",
    },
  });

  const handleGameClick = () => {
    //Immer
    // setGame(
    //   produce((draft) => {
    //     draft.player.name = "Bob";
    //   })
    // );

    //Immutable way
    setGame({ ...game, player: { ...game.player, name: "Bob" } });
  };

  const [pizza, setPizza] = useState({
    name: "Spicy Pepperoni",
    toppings: ["Mushroom"],
  });

  const handlePizzaClick = () => {
    //Immer
    // setPizza(
    //   produce((draft) => {
    //     draft.toppings.push("Tomato");
    //   })
    // );
    //Immutable way
    // const temp = pizza;
    // temp.toppings.push("Tomato");
    // setPizza({ ...temp });

    setPizza({ ...pizza, toppings: [...pizza.toppings, "Tomato"] });
  };

  //ExpenseTracker Section
  const [expenseList, setExpenseList] = useState<Expense[]>([
    { id: 1, description: "Milk", amount: 5.0, category: "Groceries" },
    { id: 2, description: "Eggs", amount: 10.0, category: "Groceries" },
    { id: 3, description: "Game", amount: 100.0, category: "Entertainment" },
    { id: 4, description: "Towel", amount: 40.0, category: "Utilities" },
  ]);

  const [selectedCategory, setselectedCategory] = useState<string>("All");

  const handleDeleteClick = (id: number) => {
    setExpenseList(
      produce((draft) => {
        const index = draft.findIndex((expense) => expense.id == id);
        draft.splice(index, 1);
      })
    );
  };

  const visibleExpenses = selectedCategory
    ? expenseList.filter(
        (expense) =>
          expense.category == selectedCategory || selectedCategory == "All"
      )
    : expenseList;

  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameRef.current) nameRef.current.focus();
  });

  useEffect(() => {
    document.title = "My App";
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(nameRef.current?.value);
  };

  const [category, setCategory] = useState<string>("");

  return (
    <>
      <div>
        <select
          className="form-select"
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value=""></option>
          <option value="Clothing">Clothing</option>
          <option value="Household">Household</option>
        </select>
        <UserList category={category}></UserList>
      </div>

      {/* <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input ref={nameRef} id="name" type="text" className="form-control" />
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>

      <div className="mb-3">
        <ExpenseForm
          handleAddClick={(newExpense) =>
            setExpenseList([
              ...expenseList,
              {
                id: expenseList.length + 1,
                ...newExpense,
              },
            ])
          }
        ></ExpenseForm>
      </div>

      <div className="mb-3">
        <ExpenseFilter
          handleSelect={(category) => setselectedCategory(category)}
        ></ExpenseFilter>
      </div>

      <div className="mb-3">
        <ExpenseList
          expenseList={visibleExpenses}
          handleDeleteClick={handleDeleteClick}
        ></ExpenseList>
      </div> */}

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

      {/* <div className={`${game.id}`}> {game.player.name} </div>
      <button onClick={handleGameClick}>Click me</button> */}

      {/* <div>
        {pizza.name}
        {pizza.toppings.map((topping) => (
          <div>{topping}</div>
        ))}
      </div>
      <button onClick={handlePizzaClick}>Click me</button> */}

      {/* <ol>
        {cart.items.map((item) => (
          <li>
            {item.id} {item.title} : {item.quantity}
          </li>
        ))}
      </ol>
      <button onClick={handleCartClick}>Click me</button> */}
    </>
  );
}

export default App;
