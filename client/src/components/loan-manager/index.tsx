import Button from "../base-components/button";
import Table from "../base-components/table";
import React, { useEffect, useState } from "react";
import Modal from "../base-components/modal";
import CreateLoanModal from "./create-loan-modal";
import { Loan } from "../../types/loan";
import { sendAPIRequest } from "../../clients/http-client";
import ActionCable from "actioncable";
import DeleteLoanModal from "./delete-loan-modal";

const LoanManager: React.FC = () => {
  const [showCreateLoan, setShowCreateLoan] = useState(false);
  const [showDeleteLoan, setShowDeleteLoan] = useState(false);
  const [loanIdToDelete, setShowLoanIdToDelete] = useState(0);
  const [loans, setLoans] = useState([] as Loan[]);

  useEffect(() => {
    sendAPIRequest<Loan[]>("/loans").then((res) => {
      setLoans(res.data);
    });
  }, []);

  useEffect(() => {
    const channel = ActionCable.createConsumer("ws://localhost:8080/cable");
    channel.subscriptions.create("LoansChannel", {
      received: (data) => setLoans(data),
    });
  }, []);

  const deleteLoan = (id: number) => {
    sendAPIRequest(`/loans/${id}`, "DELETE").catch();
  };

  return (
    <>
      <Modal
        active={showDeleteLoan}
        setActive={setShowDeleteLoan}
        children={
          <DeleteLoanModal
            setShowModal={setShowDeleteLoan}
            onDelete={() => deleteLoan(loanIdToDelete)}
          />
        }
      />
      <Modal
        active={showCreateLoan}
        setActive={setShowCreateLoan}
        children={<CreateLoanModal setShowModal={setShowCreateLoan} />}
      />
      <div className="container m-auto">
        <Button
          text="New Loan"
          className="mb-5 max-w-[10rem] ml-auto"
          onClick={() => setShowCreateLoan(!showCreateLoan)}
        />
        <Table
          data={loans.length > 0 ? loans : []}
          onDelete={(id) => {
            setShowDeleteLoan(true);
            setShowLoanIdToDelete(id);
          }}
        />
      </div>
    </>
  );
};

export default LoanManager;
