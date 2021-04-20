import { IEither, Left, Right } from "./monads/either";
import { main, Parcel } from "./parcel FP";
export {};

const isEmailValid = (email: string): boolean =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );

const validateEmail = (email: string): IEither<string, string> =>
  isEmailValid(email) ? Right(email) : Left("invalid email");

const p: Parcel = {
  parcelType: "special",
  weight: 0,
  size: "M",
  description: "",
};

const email = validateEmail("bob@.com")
  .map((e) => `📧  ${e}`)
  .getOrElse((val) => val);

console.log("email", email);

main(p);

// const writable = <T>(log: string, f: (arg: T) => T) => (value: T) =>
//   Writer(log, f(value));
// const increment = (value: number): number => value + 1;

// const val = Writer("started with 5", 5)
//   .map(increment)
//   .flatMap((value) => Writer("continues with", increment(value)))
//   .flatMap(writable("continues with", increment))
//   .writable("continues with", increment);

// console.log("log", val.getFirst());
// console.log("val", val.getSecond());
