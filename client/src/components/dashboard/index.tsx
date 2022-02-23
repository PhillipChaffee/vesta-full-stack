import React, { useEffect, useState } from "react";
import Table from "../base-components/table";
import { sendAPIRequest } from "../../clients/http-client";
import { AllStats, GenericStats, LoanStats } from "../../types/stats";
import ActionCable from "actioncable";

const Dashboard: React.FC = () => {
  const [createdStats, setCreatedStats] = useState([] as LoanStats[]);
  const [deletedStats, setDeletedStats] = useState([] as LoanStats[]);
  const [genericStats, setGenericStats] = useState({} as GenericStats);

  const setStats = (stats: AllStats) => {
    setCreatedStats(stats.createdStats);
    setDeletedStats(stats.deletedStats);
    setGenericStats(stats.genericStats);
  };

  useEffect(() => {
    sendAPIRequest<AllStats>("/loans/stats").then((res) => {
      setStats(res.data);
    });
  }, []);

  useEffect(() => {
    const channel = ActionCable.createConsumer("ws://localhost:8080/cable");
    channel.subscriptions.create("StatsChannel", {
      received: (data: AllStats) => setStats(data),
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
