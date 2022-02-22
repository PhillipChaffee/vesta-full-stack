import Base from "./base";

export class Loan extends Base {
  constructor(
    loanOfficerName: string,
    propertyAddress: string,
    amount: number,
    borrowerCount: number,
    borrowerIds?: number[]
  ) {
    super();

    this.loanOfficerName = loanOfficerName;
    this.propertyAddress = propertyAddress;
    this.amount = amount;
    this.borrowerCount = borrowerCount;
    this.borrowerIds = borrowerIds;
  }

  loanOfficerName: string;
  propertyAddress: string;
  amount: number;
  borrowerCount: number;
  borrowerIds?: number[];
}
