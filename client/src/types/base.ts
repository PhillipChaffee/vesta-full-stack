import { recursiveJsonStringify } from "../utils";

export default class Base {
  id?: number;

  toJSON(): object {
    return recursiveJsonStringify(this);
  }
}
