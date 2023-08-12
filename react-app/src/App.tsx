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

/* 
  Props                        State
  input passed to a component, Data managed by a component
  Similar to function args   , Similar to local variables
  Immutable                  , Mutable
  Re-render the component    , Re-render the component
  Update the dom             , Update the dom
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

  const [expenseList, setExpenseList] = useState<Expense[]>([
    { id: 1, description: "Milk", amount: 5, category: "Groceries" },
    { id: 2, description: "Eggs", amount: 10, category: "Groceries" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("Groceries");

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
          convallis nisl quis porta. Donec ut rutrum eros. Quisque vulputate,
          dui ut mollis sollicitudin, ligula purus faucibus augue, sit amet
          rutrum odio erat sed ipsum. Suspendisse ex quam, tristique ac eleifend
          sit amet, semper vitae diam. Vivamus laoreet arcu sit amet neque
          gravida condimentum. Vestibulum maximus leo felis, ac dignissim erat
          dictum quis. Donec commodo sed quam in rhoncus. Nam vitae commodo leo.
          Nullam nisi elit, aliquet non vestibulum vel, auctor a turpis. Aliquam
          sed magna libero. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Pellentesque sodales congue velit id fermentum. Donec euismod
          iaculis sagittis. Ut quam turpis, vestibulum et ex non, hendrerit
          rhoncus eros. Nam at tempus sapien. Donec bibendum quam sed ligula
          consectetur, in consectetur neque consectetur. Pellentesque vitae leo
          nunc. Curabitur accumsan turpis vestibulum, suscipit ipsum eget,
          tincidunt justo. Suspendisse auctor scelerisque urna et sagittis.
          Donec tempor ornare diam, vel feugiat nibh pretium vel. Vivamus
          facilisis urna non lectus consectetur malesuada. Nam sed metus non
          nunc commodo tempus. Donec eget enim orci. Proin convallis et tellus
          auctor auctor. Praesent sed malesuada risus, et venenatis dolor.
          Aliquam vehicula vulputate nibh, eget porta tortor facilisis at.
          Integer felis odio, maximus eu commodo a, dignissim vitae risus. In
          sodales ut ante ut ullamcorper. Maecenas faucibus mollis sapien, quis
          finibus quam pharetra vitae. Nullam purus orci, fermentum at
          sollicitudin vel, maximus in leo. Nam nec facilisis ante, sit amet
          imperdiet purus. Sed laoreet venenatis libero, et dictum neque
          tristique ac. Donec posuere gravida sollicitudin. Suspendisse in felis
          lectus. Aenean tristique egestas nibh, auctor feugiat est dignissim a.
          Nullam quis lacus vitae purus mollis vestibulum. Integer maximus velit
          nec faucibus ultricies. Proin quis blandit nisi. Phasellus venenatis
          quam justo. Mauris tristique posuere est. Integer non vestibulum
          lorem, quis rutrum massa. Suspendisse potenti. Donec varius molestie
          felis, a auctor dolor commodo eget. In varius eros sit amet suscipit
          rhoncus. Mauris quis faucibus neque. Sed rutrum accumsan lorem, non
          sodales justo porta at. Duis gravida laoreet eros, viverra elementum
          urna maximus eu. Nunc aliquet placerat consectetur. Etiam varius mi
          tortor. Suspendisse id faucibus risus. Nam a magna viverra, consequat
          felis vel, ullamcorper enim. Nullam fringilla egestas ligula, vitae
          lobortis neque tincidunt id. Nam euismod id justo eu tincidunt. Cras
          sollicitudin ullamcorper sagittis. Phasellus faucibus risus sem, id
          faucibus nunc cursus eu. Ut feugiat efficitur feugiat. Cras non
          dignissim elit, non scelerisque ligula. Cras eleifend egestas arcu,
          quis consequat ex ultrices id.
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

      <ExpenseFilter handleSelect={handleSelect}></ExpenseFilter>

      <ExpenseList
        expenseList={expenseList}
        handleDelete={handleDeleteExpense}
        catagory={selectedCategory}
      ></ExpenseList>
    </>
  );
}

export default App;
