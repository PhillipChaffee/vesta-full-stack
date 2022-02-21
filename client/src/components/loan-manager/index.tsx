import Button from "../base-components/button";
import Table from "../base-components/table";
import React from "react";
import { Loan } from "../../types/loan";

const LoanManager: React.FC = () => {
  const data: Loan[] = [
    {
      loanOfficerName: "Phillip",
      borrowerCount: 2,
      propertyAddress: "123",
    } as Loan,
  ];

  return (
    <>
      <div className="container m-auto">
        <Button text="New Loan" className="mb-5 max-w-[10rem] ml-auto" />
        <Table data={data} />
      </div>
    </>
  );
};

export default LoanManager;
