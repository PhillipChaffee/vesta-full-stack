import React, { useEffect, useState } from "react";
import Table from "../base-components/table";
import { sendAPIRequest } from "../../clients/http-client";
import Stats, { GenericStats } from "../../types/stats";

const Dashboard: React.FC = () => {
  const [createdStats, setCreatedStats] = useState([] as Stats[]);
  const [deletedStats, setDeletedStats] = useState([] as Stats[]);
  const [genericStats, setGenericStats] = useState({} as GenericStats);

  useEffect(() => {
    sendAPIRequest<{
      createdStats: Stats[];
      deletedStats: Stats[];
      genericStats: GenericStats;
    }>("/loans/stats").then((res) => {
      setCreatedStats(res.data.createdStats);
      setDeletedStats(res.data.deletedStats);
      setGenericStats(res.data.genericStats);
    });
  }, []);

  return (
    <div className="px-40 grid grid-cols-3 gap-6">
      <Table
        title="Loans Created"
        keys={["loanOfficer", "count"]}
        data={createdStats}
        allowDelete={false}
      />
      <Table
        title="Loans Deleted"
        keys={["loanOfficer", "count"]}
        data={deletedStats}
        allowDelete={false}
      />
      <Table
        title="Stats"
        keys={["medianBorrowerCount", "meanLoanAmount"]}
        data={[genericStats]}
        allowDelete={false}
      />
    </div>
  );
};

export default Dashboard;
