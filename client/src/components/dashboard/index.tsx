import React, { useEffect, useState } from "react";
import Table from "../base-components/table";
import { sendAPIRequest } from "../../clients/http-client";
import Stats from "../../types/stats";

const Dashboard: React.FC = () => {
  const [createdStats, setCreatedStats] = useState([] as Stats[]);
  const [deletedStats, setDeletedStats] = useState([] as Stats[]);

  useEffect(() => {
    sendAPIRequest<{ createdStats: Stats[]; deletedStats: Stats[] }>(
      "/loans/stats"
    ).then((res) => {
      setCreatedStats(res.data.createdStats);
      setDeletedStats(res.data.deletedStats);
    });
  }, []);

  return (
    <div className="px-40 grid grid-cols-3 gap-6">
      <Table
        title="Loans Created"
        keys={["Loan Officer", "Count"]}
        data={createdStats}
        allowDelete={false}
      />
      <Table
        title="Loans Deleted"
        keys={["Loan Officer", "Count"]}
        data={deletedStats}
        allowDelete={false}
      />
    </div>
  );
};

export default Dashboard;
