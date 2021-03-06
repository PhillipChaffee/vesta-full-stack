import React, { useState } from "react";

interface SelectProps {
  label: string;
  selected: string;
  onSetSelected: (selected: string) => void;
  options: string[];
}

const Select: React.FC<SelectProps> = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { label, selected, onSetSelected, options } = props;

  return (
    <div className="col-span-1 sm:col-span-1">
      <label
        id="listbox-label"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1 relative">
        <button
          type="button"
          className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span className="flex items-center">
            <span className="ml-3 block truncate">{selected}</span>
          </span>
          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        {showDropdown && (
          <ul
            className={
              "absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm" +
              showDropdown
                ? " opacity-100"
                : " transition ease-in duration-100 opacity-0"
            }
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant={selected}
          >
            {options.map((option) => {
              const optionSelected = option === selected;
              return (
                <li
                  key={option}
                  className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
                  id={option}
                  role="option"
                  aria-selected={optionSelected}
                  onClick={() => {
                    setShowDropdown(false);
                    onSetSelected(option);
                  }}
                >
                  <div className="flex items-center">
                    <span className="font-normal ml-3 block truncate">
                      {option}
                    </span>
                  </div>

                  {optionSelected && (
                    <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;
