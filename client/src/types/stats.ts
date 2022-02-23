import Base from "./base";

export type AllStats = {
  createdStats: LoanStats[];
  deletedStats: LoanStats[];
  genericStats: GenericStats;
};

export class LoanStats extends Base {
  loanOfficer?: string;
  count?: number;
}

export class GenericStats extends Base {
  medianBorrowerCount?: number;
  meanLoanAmount?: number;
}
