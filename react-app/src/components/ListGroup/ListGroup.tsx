import { useState } from "react";
import styles from "./ListGroup.module.css";

// {items: [], heading: string}
// take it as a parameter of the component
interface ListGroupProps {
  items: string[];
  heading: string;
  //function (item: string) => void
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: ListGroupProps) {
  // Hook: state hook can tell react it has data and its state
  // arr[0] = variable
  // arr[1] = updater function
  // const [name, setName] = useState();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 ? <p>No item found</p> : null}
      <ul className={[styles.ListGroup, styles.container].join("")}>
        {/*SyntheticBaseEvent is a wrapper of wrapping different event objects in different browser*/}
        {/*handleClick() function would not be called, just want to pass a reference to React, it would be called in runtime*/}
        {items.map((item, index) => (
          <li
            key={item}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
