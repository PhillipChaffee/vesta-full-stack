import Button from "../base-components/button";
import Table from "../base-components/table";
import React, { useEffect, useState } from "react";
import Modal from "../base-components/modal";
import CreateLoanModal from "./create-loan-modal";
import { Loan } from "../../types/loan";
import { sendAPIRequest } from "../../clients/http-client";

const LoanManager: React.FC = () => {
  const [showCreateLoan, setShowCreateLoan] = useState(false);
  const [loans, setLoans] = useState([] as Loan[]);

  useEffect(() => {
    sendAPIRequest<Loan[]>("/loans").then((res) => {
      setLoans(res.data);
    });
  });
  if (loans.length === 0) {
    return <></>;
  }
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
        <Table data={loans} />
      </div>
    </>
  );
};

export default LoanManager;
