import React, { useState } from "react";
import Input from "../base-components/input";
import Button from "../base-components/button";
import { Borrower } from "../../types/borrower";

interface AddBorrowerProps {
  onSave: (borrower: Borrower) => void;
}

const AddBorrower: React.FC<AddBorrowerProps> = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(1234567890);
  const { onSave } = props;

  return (
    <>
      <Input
        key="First Name"
        label="First Name"
        state={firstName}
        setState={setFirstName}
      />
      <Input
        key="Last Name"
        label="Last Name"
        state={lastName}
        setState={setLastName}
      />
      <Input
        key="Phone Number"
        label="Phone Number"
        state={phoneNumber}
        setState={setPhoneNumber}
      />
      <Button
        className=""
        text="Save Borrower"
        onClick={() =>
          onSave({
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
          })
        }
      />
    </>
  );
};

export default AddBorrower;
