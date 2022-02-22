import React, { useState } from "react";
import Select from "../base-components/select";
import { Borrower } from "../../types/borrower";
import { getMapKeys } from "../../utils";
import AddBorrower from "./add-borrower";

interface BorrowerInputProps {
  label: string;
  allBorrowers: Map<string, Borrower>;
  selectedBorrower: Borrower;
  setSelectedBorrower: (prevBorrower: Borrower, newBorrower: Borrower) => void;
}

const BorrowerInput: React.FC<BorrowerInputProps> = (props) => {
  const [addNewBorrower, setAddNewBorrower] = useState(false);
  const { label, allBorrowers, selectedBorrower, setSelectedBorrower } = props;

  const optionString =
    selectedBorrower.firstName + " " + selectedBorrower.lastName;
  const options = [...getMapKeys(allBorrowers), "New Borrower"];

  return (
    <>
      {addNewBorrower ? (
        <AddBorrower
          onSave={(newBorrower) => {
            setSelectedBorrower(selectedBorrower, newBorrower);
            setAddNewBorrower(false);
          }}
        />
      ) : (
        <Select
          label={label}
          selected={optionString}
          onSetSelected={(selected) => {
            if (selected === "New Borrower") {
              setAddNewBorrower(true);
            } else {
              setSelectedBorrower(
                selectedBorrower,
                allBorrowers.get(selected) as Borrower
              );
            }
          }}
          options={options}
        />
      )}
    </>
  );
};

export default BorrowerInput;
