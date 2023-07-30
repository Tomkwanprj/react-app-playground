import { useRef, FormEvent } from "react";

const Form = () => {
  // Current property of ref object references a DOM node.
  // Initially, when we create a ref object, we dont have access to the DOM node
  // because the DOM is created after react renders our componenets
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const person = { name: "", age: 0 };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (nameRef.current !== null) person.name = nameRef.current.value;
    if (ageRef.current !== null) person.age = parseInt(ageRef.current.value);
    console.log(person);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* div.mb-3>label.form-label+input.form-control */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input ref={nameRef} id="name" type="text" className="form-control" />
        </div>

        {/* div.mb-3>label.form-label+input[type=number].form-control */}
        <div className="mp3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input ref={ageRef} id="age" type="number" className="form-control" />
        </div>
        <br />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
