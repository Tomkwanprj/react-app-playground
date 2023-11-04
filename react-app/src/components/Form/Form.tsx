import { useState, useRef, FormEvent } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  age: z
    .number({ invalid_type_error: "Age field is required" })
    .positive({ message: "Age must be positive" })
    .min(18, { message: "Age must be at least 18 years old" }),
});

// interface FormData {
//   name: string;
//   age: string;
// }

type FormData = z.infer<typeof schema>;

const Form = () => {
  // React ref hook
  // Current property of ref object references a DOM node.
  // Initially, when we create a ref object, we dont have access to the DOM node
  // because the DOM is created after react renders our componenets

  //  const nameRef = useRef<HTMLInputElement>(null);
  //  const ageRef = useRef<HTMLInputElement>(null);
  //  const person = { name: "", age: 0 };

  //   const handleSubmit = (event: FormEvent) => {
  //     event.preventDefault();
  //     // if (nameRef.current !== null) person.name = nameRef.current.value;
  //     // if (ageRef.current !== null) person.age = parseInt(ageRef.current.value);
  //     console.log(person);
  //   };

  // Using react state hook will render our compoenet every time when user change the input field,
  // it might cause performance issue.
  // Also, input fields have their own state and we have react state called person. It is possible that
  // these sources get out of sync. We should maintain the single source of truth and singleton.

  // React state hook
  // const [person, setPerson] = useState({
  //   name: "",
  //   age: 0,
  // });

  // <input
  //   type="text"
  //   value={person.name} !Important
  //   onChange={(event) => setPerson({ ...person, name: event.target.value })}
  // ></input>;

  // <input
  //   type="number"
  //   value={person.age}
  //   onChange={(event) =>
  //     setPerson({ ...person, age: parseInt(event.target.value) })
  //   }
  // ></input>;

  console.log(useForm<FormData>());

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

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
          {errors.name ? (
            <p className="text-danger">{errors.name.message}</p>
          ) : null}

          {/* {errors.name?.type === "required" ? (
          <p className="text-danger">The name field is required</p>
        ) : null} */}
        </div>

        {/* div.mb-3>label.form-label+input[type=number].form-control */}
        <div className="mp3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            {...register("age", { valueAsNumber: true })}
            id="age"
            type="number"
            className="form-control"
          />
          {errors.age ? (
            <p className="text-danger">{errors.age.message}</p>
          ) : null}
        </div>
        <br />
        <button disabled={!isValid} className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
