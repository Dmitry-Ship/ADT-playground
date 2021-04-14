import { IEither, Left, Right } from "./either";

export type IMaybe<T> = {
  flatMap: <V>(f: (value: T) => IMaybe<V>) => IMaybe<V>;
  map: <V>(f: (value: T) => V) => IMaybe<V>;
  getOrElse: <V>(fallback: V) => V | T;
  cata: <A, B>(onJust: (arg: T) => A, onNothing: () => B) => A | B;
  toEither: <V>(leftVal: V) => IEither<V, T>;
  type: "just" | "nothing";
};

export const Just = <T>(value: T): IMaybe<T> => ({
  type: "just",
  flatMap: (f) => f(value),
  map: (f) => Maybe(f(value)),
  getOrElse: () => value,
  toEither: () => Right(value),
  cata: (onJust) => onJust(value),
});

export const Nothing = <T>(): IMaybe<T> => ({
  type: "nothing",
  flatMap: () => Nothing(),
  map: () => Nothing(),
  getOrElse: (fallback) => fallback,
  toEither: (leftVal) => Left(leftVal),
  cata: (_, onNothing) => onNothing(),
});

export const Maybe = <T>(value: T | null | undefined): IMaybe<T> =>
  value === null || typeof value === "undefined"
    ? Nothing<T>()
    : Just<T>(value);
