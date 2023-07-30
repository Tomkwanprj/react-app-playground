import { useState, useRef, FormEvent } from "react";
import { useForm, FieldValues } from "react-hook-form";

const Form = () => {
  // React ref hook
  // Current property of ref object references a DOM node.
  // Initially, when we create a ref object, we dont have access to the DOM node
  // because the DOM is created after react renders our componenets

  //  const nameRef = useRef<HTMLInputElement>(null);
  //  const ageRef = useRef<HTMLInputElement>(null);
  //  const person = { name: "", age: 0 };

  // Using react state hook will render our compoenet every time when user change the input field,
  // it might cause performance issue.
  // Also, input fields have their own state and we have react state called person. It is possible that
  // these sources get out of sync. We should maintain the single source of truth and singleton.

  // React state hook
  //   const [person, setPerson] = useState({
  //     name: "",
  //     age: "",
  //   });

  //   const handleSubmit = (event: FormEvent) => {
  //     event.preventDefault();
  //     // if (nameRef.current !== null) person.name = nameRef.current.value;
  //     // if (ageRef.current !== null) person.age = parseInt(ageRef.current.value);
  //     console.log(person);
  //   };

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* div.mb-3>label.form-label+input.form-control */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            className="form-control"
          />
        </div>

        {/* div.mb-3>label.form-label+input[type=number].form-control */}
        <div className="mp3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            {...register("age")}
            id="age"
            type="number"
            className="form-control"
          />
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
