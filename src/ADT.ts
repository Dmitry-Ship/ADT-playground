export type Nothing = { type: "nothing" };
export type Just<T> = { type: "just"; value: T };
export type Maybe<T> = Nothing | Just<T>;

export const nothing: Nothing = { type: "nothing" };
export const just = <T>(value: T): Maybe<T> => ({ type: "just", value });
export const maybe = <T, R>(
  fa: Maybe<T>,
  onNothing: () => R,
  onJust: (a: T) => R
): R => (fa.type === "nothing" ? onNothing() : onJust(fa.value));

export type Either<L, R> =
  | { type: "left"; value: L }
  | { type: "right"; value: R };

export const left = <T>(value: T): Either<T, never> => ({
  type: "left",
  value,
});
export const right = <T>(value: T): Either<never, T> => ({
  type: "right",
  value,
});

export const either = <T, L, R>(
  fa: Either<L, R>,
  onLeft: (_: L) => T,
  onRight: (_: R) => T
): T => (fa.type === "left" ? onLeft(fa.value) : onRight(fa.value));

const map = <T>(f: (arg: T) => void) => (input: Maybe<T>): Maybe<any> => {
  switch (input.type) {
    case "just":
      return just(f(input.value));
    case "nothing":
      return nothing;
    default: {
      const _exhaustiveCheck: never = input;
      return _exhaustiveCheck;
    }
  }
};

const bind = <L, R>(f: (arg: R | L) => void) => (
  input: Either<L, R>
): Either<any, any> => {
  switch (input.type) {
    case "right":
      return right(f(input.value));
    case "left":
      return left(f(input.value));
    default: {
      const _exhaustiveCheck: never = input;
      return _exhaustiveCheck;
    }
  }
};
