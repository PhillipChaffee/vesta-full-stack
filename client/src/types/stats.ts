import Base from "./base";

export default class LoanStats extends Base {
  loanOfficer?: string;
  count?: number;
}

export class GenericStats extends Base {
  medianBorrowerCount?: number;
  meanLoanAmount?: number;
}
