import { IEither, Left, Right } from "./monads/either";
import { makeAPICall } from "./utils/api";
export {};

type User = {
  name: string;
  email: string;
  password: string;
};

const isEmailValid = (email: string): boolean =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );

const validateUser = (user: User): IEither<string, User> => {
  if (!isEmailValid(user.email)) {
    return Left("invalid email");
  }

  if (user.name.length < 2) {
    return Left("invalid name");
  }

  if (user.password.length < 10) {
    return Left("invalid password");
  }

  return Right(user);
};
const john: User = {
  name: "John",
  email: "vooxil@gmail.com",
  password: "qwerty",
};

const result = validateUser(john);

result.map((u) => u.name.toUpperCase());
