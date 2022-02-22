import React, { useState } from "react";
import Input from "../base-components/input";
import Button from "../base-components/button";
import { Borrower } from "../../types/borrower";
import { sendAPIRequest } from "../../clients/http-client";

interface AddBorrowerProps {
  onSave: (borrower: Borrower) => void;
}

const AddBorrower: React.FC<AddBorrowerProps> = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(1234567890);
  const { onSave } = props;

  const persistNewBorrower = (borrower: Borrower) => {
    return sendAPIRequest<Borrower>("/borrowers", "POST", {
      borrower: borrower,
    });
  };

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
        onClick={() => {
          const newBorrower = new Borrower(firstName, lastName, phoneNumber);
          persistNewBorrower(newBorrower).then((res) => onSave(res.data));
        }}
      />
    </>
  );
};

export default AddBorrower;
