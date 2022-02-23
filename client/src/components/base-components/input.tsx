import React, { useState } from "react";

type InputValue = string | number | readonly string[] | undefined;

interface InputProps<T extends InputValue> {
  label: string;
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
  validate: (value: any) => boolean;
}

const Input = <T extends InputValue>(props: InputProps<T>) => {
  const [stateChanged, setStateChanged] = useState(false);
  const { label, state, setState, validate } = props;

  const name = label.replace(" ", "-").toLowerCase();
  const valid = !stateChanged || validate(state);
  return (
    <div className="col-span-2 sm:col-span-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        className={
          "mt-1 focus:ring-indigo-500 block w-full shadow-sm sm:text-sm rounded-md border" +
          (valid
            ? " border-gray-300 focus:border-indigo-500"
            : " border-red-500 focus:border-indigo-500")
        }
        value={state}
        onChange={(event) => {
          setStateChanged(true);
          setState(event.target.value as T);
        }}
      />
    </div>
  );
};

export default Input;
