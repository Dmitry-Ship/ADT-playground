import { IMaybe, Maybe, Nothing } from "./maybe";

export type IEither<L, R> = {
  map: <V>(f: (val: R) => V) => IEither<L, V>;
  flatMap: <V>(F: (val: R) => IEither<L, V>) => IEither<L, V>;
  cata: <A, B>(obj: { onLeft: (arg: L) => A; onRight: (arg: R) => B }) => A | B;
  mapLeft: <F>(f: (leftVal: L) => F) => IEither<F, R>;
  getOrElse: <V>(onLeft: (leftVal: L) => V) => V | R;
  fromTry: <A, B>(f: CallableFunction) => IEither<A, B>;
  toMaybe: () => IMaybe<R>;
  type: "left" | "right";
};

export const Right = <L, R>(value: R): IEither<L, R> => ({
  flatMap: (f) => f(value),
  map: (f) => Right(f(value)),
  mapLeft: () => Right(value),
  cata: (obj) => obj.onRight(value),
  getOrElse: () => value,
  toMaybe: () => Maybe(value),
  fromTry: (f) => {
    try {
      return Right(f());
    } catch (e) {
      return Left(e);
    }
  },
  type: "right",
});

export const Left = <L, R>(value: L): IEither<L, R> => ({
  flatMap: () => Left(value),
  map: () => Left(value),
  mapLeft: (f) => Left(f(value)),
  cata: (obj) => obj.onLeft(value),
  getOrElse: (onLeft) => onLeft(value),
  toMaybe: () => Nothing(),
  fromTry: (f) => Left(f()),
  type: "left",
});
