import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues } from "react-hook-form";
import { Expense } from "../../../App";
import categoryList from "../../categories";

interface ExpenseFormProps {
  handleAddClick: (values: ExpenseFormData) => void;
}

const schema = z.object({
  description: z.string().min(3, { message: "Description is required" }),
  amount: z
    .number({ invalid_type_error: "Amount field is required" })
    .positive({ message: "Amount must be positive" })
    .min(0, { message: "Amount must be at least 0" }),
  //enum use case and the list must be read only list, so we need to set it const
  category: z.enum(categoryList, {
    errorMap: () => ({ message: "Category is required" }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;

const ExpenseForm = ({ handleAddClick }: ExpenseFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: ExpenseFormData) => {
    handleAddClick(values);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            {...register("description")}
            id="description"
            type="text"
            className="form-control"
          ></input>
          {errors.description ? (
            <p className="text-danger">{errors.description.message}</p>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            id="amount"
            type="number"
            className="form-control"
          ></input>
          {errors.amount ? (
            <p className="text-danger">{errors.amount.message}</p>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select className="form-select" {...register("category")}>
            <option></option>
            {/* <option value="Gorceries">Gorceries</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option> */}
            {categoryList.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category ? (
            <p className="text-danger">{errors.category.message}</p>
          ) : null}
        </div>

        <button disabled={!isValid} className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default ExpenseForm;
