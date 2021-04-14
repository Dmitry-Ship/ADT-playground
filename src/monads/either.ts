type ILeft<T> = {
  flatMap: <R>(f: (value: T) => ILeft<R>) => ILeft<R>;
  map: <R>(f: (value: T) => R) => ILeft<R>;
  type: "left";
};

type IRight<T> = {
  flatMap: <R>(f: (value: T) => IEither<R, T>) => IEither<R, T>;
  map: <R>(f: (value: T) => R) => IRight<R>;
  type: "right";
};

export type IEither<L, R> = ILeft<L> | IRight<R>;

export const Right = <T>(value: T): IRight<T> => ({
  flatMap: (f) => f(value),
  map: (f) => Right(f(value)),
  type: "right",
});

export const Left = <T>(value: T): ILeft<T> => ({
  flatMap: (f) => f(value),
  map: (f) => Left(f(value)),
  type: "left",
});
