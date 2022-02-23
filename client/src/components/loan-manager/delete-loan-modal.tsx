import React, { useState } from "react";
import Input from "../base-components/input";
import Button from "../base-components/button";

interface DeleteLoanModalProps {
  onDelete: Function;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteLoanModal: React.FC<DeleteLoanModalProps> = (props) => {
  const [loanOfficer, setLoanOfficer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { onDelete, setShowModal } = props;

  return (
    <div className="bg-white mb-5">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 pt-6 pb-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <span className="text-xl font-bold pl-6">Delete Loan</span>
          </div>
        </div>
        <div className="mt-10 sm:mt-0">
          <div className="py-4">Are you sure you want to delete this loan?</div>
          <Input
            label="Loan Officer"
            state={loanOfficer}
            setState={setLoanOfficer}
            validate={(value) => typeof value === "string" && value.length > 0}
          />
          {errorMessage.length > 0 && (
            <span className="text-red-500">{errorMessage}</span>
          )}
          <div className="py-5 text-right sm:pr-80 col-span-2">
            <Button
              className=""
              text="Delete"
              onClick={() => {
                if (loanOfficer.length < 1) {
                  setErrorMessage("Please enter Loan Officer Name.");
                  return;
                }
                onDelete();
                setErrorMessage("");
                setShowModal(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteLoanModal;
