import Base from "./base";

export class Borrower extends Base {
  constructor(firstName: string, lastName: string, phoneNumber: number) {
    super();

    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
  }

  firstName: string;
  lastName: string;
  phoneNumber: number;
}
