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

/* 
  Props                        State
  input passed to a component, Data managed by a component
  Similar to function args   , Similar to local variables
  Immutable                  , Mutable
  Re-render the component    , Re-render the component
  Update the dom             , Update the dom
*/

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

  const [drink, setDrink] = useState({
    title: "Tom",
    price: 5,
  });

  const handleDrinkClick = () => {
    setDrink({ ...drink, price: drink.price + 1 });
  };

  const [person, setPerson] = useState({
    name: "Tom",
    address: {
      city: "San Francisco",
      zipCode: 94111,
    },
  });

  const handlePersonClick = () => {
    setPerson({ ...person, address: { ...person.address, zipCode: 23123 } });
  };

  const [tags, setTags] = useState(["happy", "cheerful"]);

  const handleTagsClick = () => {
    setTags([...tags]);
  };

  const [bugs, setBugs] = useState([
    { id: 1, title: "Bug 1", fixed: false },
    { id: 2, title: "Bug 2", fixed: false },
  ]);

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

  const [cartItems, setCartItems] = useState(["Product1", "Product2"]);

  const handleClear = () => {
    setCartItems([]);
  };

  return (
    <>
      <BsFillCalendarCheckFill color="red" size={40}></BsFillCalendarCheckFill>

      <ListGroup
        items={items}
        heading="Oh My List"
        onSelectItem={handleSelectItem}
      />

      {isVisible ? (
        <Alert onClose={() => updateVisibility(false)}>
          <span>Hello World</span>
        </Alert>
      ) : null}

      <Like onLikeClicked={handleLikeItem}></Like>

      <div>
        {bugs.map((bug) => (
          <p key={bug.id}>{bug.title + ": " + bug.fixed}</p>
        ))}
        <Button
          children="Hello World"
          color="primary"
          onButtonClicked={handleBugsClick}
        ></Button>
      </div>

      <div>
        <NavBar cartItemsCount={cartItems.length}></NavBar>
        <Cart cartItems={cartItems} onClear={handleClear}></Cart>
      </div>
    </>
  );
}

export default App;
