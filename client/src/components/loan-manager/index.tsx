import Button from "../base-components/button";
import Table from "../base-components/table";
import React, { useState } from "react";
import { Loan } from "../../types/loan";
import Modal from "../base-components/modal";
import CreateLoanModal from "./create-loan-modal";

const LoanManager: React.FC = () => {
  const [showCreateLoan, setShowCreateLoan] = useState(false);
  const data: Loan[] = [
    {
      id: 1,
      loanOfficerName: "Phillip",
      borrowerCount: 2,
      propertyAddress: "123",
    } as Loan,
  ];

  return (
    <>
      <Modal
        active={showCreateLoan}
        setActive={setShowCreateLoan}
        children={<CreateLoanModal />}
      />
      <div className="container m-auto">
        <Button
          text="New Loan"
          className="mb-5 max-w-[10rem] ml-auto"
          onClick={() => setShowCreateLoan(!showCreateLoan)}
        />
        <Table data={data} />
      </div>
    </>
  );
};

export default LoanManager;
