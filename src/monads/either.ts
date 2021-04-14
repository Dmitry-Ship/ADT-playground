export type ILeft<L, R> = {
  //   flatMapLeft: <V>(f: (value: L) => IEither<V, R>) => IEither<V, R>;
  flatMap: <V>(f: (value: R) => IEither<L, V>) => ILeft<L, V>;
  map: <V>(f: (value: R) => V) => ILeft<L, R>;
  mapLeft: <V>(f: (value: L) => V) => IEither<V, R>;
  cata: <A, B>(obj: { onLeft: (arg: L) => A; onRight: (arg: R) => B }) => A | B;
  type: "left";
};

export type IRight<L, R> = {
  //   flatMapLeft: <V>(f: (value: L) => IEither<V, R>) => IRight<V, R>;
  flatMap: <V>(f: (value: R) => IEither<L, V>) => IEither<L, V>;
  map: <V>(f: (value: R) => V) => IEither<L, V>;
  mapLeft: <V>(f: (value: L) => V) => IRight<L, R>;
  cata: <A, B>(obj: { onLeft: (arg: L) => A; onRight: (arg: R) => B }) => A | B;
  fromTry: <A, B>(fn: Function) => IEither<A, B>;
  type: "right";
};

export type IEither<L, R> = ILeft<L, R> | IRight<L, R>;

export const Right = <T>(value: T): IRight<never, T> => ({
  flatMap: (f) => f(value),
  //   flatMapLeft: () => Right(value),
  map: (f) => Right(f(value)),
  mapLeft: () => Right(value),
  cata: (obj) => obj.onRight(value),
  fromTry: (fn) => {
    try {
      return Right(fn());
    } catch (e) {
      return Left(e);
    }
  },
  type: "right",
});

export const Left = <T>(value: T): ILeft<T, never> => ({
  flatMap: () => Left(value),
  //   flatMapLeft: (f) => f(value),
  map: () => Left(value),
  mapLeft: (f) => Left(f(value)),
  cata: (obj) => obj.onLeft(value),
  type: "left",
});

// export const Either = <T, E>(value: T): ILeft<T, never> => ({
//   flatMap: () => Left(value),
//   //   flatMapLeft: (f) => f(value),
//   map: () => Left(value),
//   mapLeft: (f) => Left(f(value)),
//   cata: (obj) => obj.onLeft(value),
//   type: "left",
// });
