import React, { useEffect, useState } from "react";
import Table from "../base-components/table";
import { sendAPIRequest } from "../../clients/http-client";
import Stats from "../../types/stats";

const Dashboard: React.FC = () => {
  const [createdStats, setCreatedStats] = useState([] as Stats[]);
  const [deletedStats, setDeletedStats] = useState([] as Stats[]);

  useEffect(() => {
    sendAPIRequest<[]>("/loans/created").then((res) =>
      setCreatedStats(res.data)
    );
    sendAPIRequest<[]>("/loans/deleted").then((res) =>
      setDeletedStats(res.data)
    );
  }, []);

  return (
    <div className="px-40 grid grid-cols-3 gap-6">
      <Table title="Loans Created" data={createdStats} allowDelete={false} />
      <Table title="Loans Deleted" data={deletedStats} allowDelete={false} />
    </div>
  );
};

export default Dashboard;
