import { useState } from "react";
import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

interface ListItemProps {
  active: boolean;
}

const ListItem = styled.li<ListItemProps>`
  padding: 5px 0;
  background: ${(prop) => (prop.active ? "blue" : "none")};
`;

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
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 ? <p>No item found</p> : null}
      <List>
        {/*SyntheticBaseEvent is a wrapper of wrapping different event objects in different browser*/}
        {/*handleClick() function would not be called, just want to pass a reference to React, it would be called in runtime*/}
        {items.map((item, index) => (
          <ListItem
            active={index === selectedIndex}
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default ListGroup;
