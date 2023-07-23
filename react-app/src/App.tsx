import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button/Button";
import ListGroup from "./components/ListGroup";
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

      <Button
        children="Hello World"
        color="primary"
        onButtonClicked={handleButtonClickItem}
      ></Button>
    </>
  );
}

export default App;
