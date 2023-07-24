import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button/Button";
import ListGroup from "./components/ListGroup";
import Like from "./components/Like";
import "./App.css";
import { BsFillCalendarCheckFill } from "react-icons/bs";

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
    setPerson({ ...person, address: { ...person.address, zipCode: 123123 } });
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

      {person.address.zipCode}
      <Button
        children="Hello World"
        color="primary"
        onButtonClicked={handlePersonClick}
      ></Button>
    </>
  );
}

export default App;
