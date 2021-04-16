import { Left, Right } from "./monads/either";
import { Identity } from "./monads/identity";
import { Writer } from "./monads/writer";
export {};

const isEmailValid = (email: string): boolean =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );

const validateUserEmail = (user: User) =>
  isEmailValid(user.email) ? Right(user) : Left("email is invalid");

type Pet = {
  name: string;
  kind: "dog" | "cat";
};

type User = {
  name: string;
  age: number;
  email: string;
};
const setAge = (age: number) => <T extends {}>(value: T) => ({ ...value, age });
const setEmail = (email: string) => <T extends {}>(value: T) => ({
  ...value,
  email,
});
const setPet = (pet: Pet) => <T extends {}>(value: T) => ({
  ...value,
  pet,
});

const user = { name: "John", age: 23, email: "vooxil@gmail.com" };

const parsed = Identity<User>(user)
  .map(setAge(100))
  .map(setEmail("hello@gmail.com"))
  .map(setPet({ name: "Spike", kind: "dog" }))
  .get();

console.log("parsed", parsed);

const writable = <T>(log: string, f: (arg: T) => T) => (value: T) =>
  Writer(log, f(value));
const increment = (value: number): number => value + 1;

const val = Writer("started with 5", 5)
  .map(increment)
  .flatMap((value) => Writer("continues with", increment(value)))
  .flatMap(writable("continues with", increment))
  .writable("continues with", increment);

console.log("log", val.getFirst());
console.log("val", val.getSecond());
