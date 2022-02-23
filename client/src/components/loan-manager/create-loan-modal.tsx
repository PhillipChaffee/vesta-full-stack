import React, { useEffect, useState } from "react";
import Input from "../base-components/input";
import BorrowerInput from "./borrower-input";
import { Borrower } from "../../types/borrower";
import Button from "../base-components/button";
import { getUpdatedStateArray } from "../../utils";
import { sendAPIRequest } from "../../clients/http-client";
import { Loan } from "../../types/loan";

interface CreateLoanModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateLoanModal: React.FC<CreateLoanModalProps> = (props) => {
  const [loanOfficer, setLoanOfficer] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [loanAmount, setLoanAmount] = useState(0);
  const [allBorrowers, setAllBorrowers] = useState(new Map<string, Borrower>());
  const [newBorrowers, setNewBorrowers] = useState(true);
  const [loanBorrowers, setLoanBorrowers] = useState([] as Borrower[]);
  const [errorMessage, setErrorMessage] = useState("");

  const { setShowModal } = props;

  const borrowerKey = (borrower: Borrower) =>
    borrower.firstName + " " + borrower.lastName;

  useEffect(() => {
    if (!newBorrowers) {
      return;
    }
    const fetchBorrowers = async () => {
      const response = await sendAPIRequest<Borrower[]>("/borrowers");
      setAllBorrowers(
        new Map<string, Borrower>(
          response.data.map((borrower) => [borrowerKey(borrower), borrower])
        )
      );
    };
    fetchBorrowers()
      .catch((reason) => reason) // IRL I would log this to a log system
      .then(() => setNewBorrowers(false));
  }, [newBorrowers]);

  const saveLoan = () => {
    if (
      !loanOfficer ||
      !propertyAddress ||
      !parseInt(loanAmount.toString()) ||
      loanAmount < 1 ||
      loanBorrowers.length < 1
    ) {
      setErrorMessage("Please fill out all fields");
      return;
    }
    const loan = new Loan(
      loanOfficer,
      propertyAddress,
      loanAmount,
      loanBorrowers.length,
      loanBorrowers.map((lb) => lb.id as number)
    );
    sendAPIRequest("/loans", "POST", { loan: loan }).then(() => {
      setLoanOfficer("");
      setPropertyAddress("");
      setLoanAmount(0);
      setLoanBorrowers([]);
      setErrorMessage("");
      setShowModal(false);
    });
  };

  return (
    <div className="bg-white mb-5">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 pt-6 pb-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <span className="text-xl font-bold pl-6">Create Loan</span>
          </div>
        </div>
        <div className="mt-10 sm:mt-0">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <Input
                      label="Loan Officer"
                      state={loanOfficer}
                      setState={setLoanOfficer}
                      validate={(value) =>
                        typeof value === "string" && value.length > 0
                      }
                    />
                    <Input
                      label="Property Address"
                      state={propertyAddress}
                      setState={setPropertyAddress}
                      validate={(value) =>
                        typeof value === "string" && value.length > 0
                      }
                    />
                    <Input
                      label="Loan Amount"
                      state={loanAmount}
                      setState={setLoanAmount}
                      validate={(value) => !!parseInt(value)}
                    />
                    {loanBorrowers.map((borrower, i) => (
                      <BorrowerInput
                        key={borrower.phoneNumber}
                        allBorrowers={allBorrowers}
                        label={"Borrower " + (i + 1)}
                        selectedBorrower={borrower}
                        setSelectedBorrower={(prevBorrower, newBorrower) => {
                          if (!allBorrowers.has(borrowerKey(newBorrower))) {
                            setNewBorrowers(true);
                          }
                          setLoanBorrowers((prevState) =>
                            getUpdatedStateArray(
                              prevBorrower,
                              newBorrower,
                              prevState,
                              "phoneNumber"
                            )
                          );
                        }}
                      />
                    ))}
                    {loanBorrowers.length < 3 && (
                      <div className="col-span-2">
                        <Button
                          className=""
                          text="Add Borrower"
                          onClick={() => {
                            if (loanBorrowers.length > 2) {
                              return;
                            }
                            setLoanBorrowers([
                              ...loanBorrowers,
                              new Borrower("-", "", 123456798),
                            ]);
                          }}
                        />
                      </div>
                    )}
                    {errorMessage.length > 0 && (
                      <span className="text-red-500">{errorMessage}</span>
                    )}
                    <div className="py-5 text-right sm:pr-80 col-span-2">
                      <Button
                        className=""
                        text="Save"
                        onClick={() => saveLoan()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLoanModal;
