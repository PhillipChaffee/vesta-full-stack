import React from "react";

type InputValue = string | number | readonly string[] | undefined;

interface InputProps<T extends InputValue> {
  label: string;
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
}

const Input = <T extends InputValue>(props: InputProps<T>) => {
  const { label, state, setState } = props;

  const name = label.replace(" ", "-").toLowerCase();
  return (
    <div className="col-span-2 sm:col-span-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        value={state}
        onChange={(event) => setState(event.target.value as T)}
      />
    </div>
  );
};

export default Input;
