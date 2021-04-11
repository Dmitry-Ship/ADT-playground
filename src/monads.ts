type IIdentity<T> = {
  flatMap: <R>(f: (value: T) => R) => R;
  map: <R>(f: (value: T) => R) => IIdentity<R>;
};

export const Identity = <T>(value: T): IIdentity<T> => ({
  flatMap: (f) => f(value),
  map: (f) => Identity(f(value)),
});

export const Reader = <T>(k: (value: T) => T) => ({
  run: (e: T) => k(e),
  // flatMap: (f: (value: T) => T) => Reader((e: any) => f(k(e))).run(e),
  map: (f: (value: T) => T) => Reader((e: any) => f(k(e))),
});

type INothing<T> = {
  type: "nothing";
  flatMap: <R>(f: (value: T) => IMaybe<R>) => IMaybe<R>;
  map: <R>(f: (value: T) => R) => IMaybe<R>;
  getOrElse: <R>(fallback: R) => R;
  cata: <B, C>(onJust: (arg: T) => B, onNothing: () => C) => B | C;
};

type IJust<T extends NonNullable<{}>> = {
  type: "just";
  flatMap: (f: (value: T) => IMaybe<T>) => IMaybe<T>;
  map: <R>(f: (value: T) => R) => IMaybe<R>;
  getOrElse: <R>(fallback: R) => T;
  cata: <B, C>(onJust: (arg: T) => B, onNothing: () => C) => B | C;
};

type IMaybe<T> = INothing<T> | IJust<T>;

const Just = <T>(value: T): IJust<T> => ({
  flatMap: (f) => f(value),
  map: <R>(f: (value: T) => R) => Maybe<R>(f(value)),
  getOrElse: <R>(fallback: R) => value,
  cata: (onJust, onNothing) => onJust(value),
  type: "just",
});
const Nothing = <T>(): INothing<T> => ({
  flatMap: <R>() => Nothing<R>(),
  map: <R>() => Nothing<R>(),
  getOrElse: <R>(fallback: R) => fallback,
  cata: (onJust, onNothing) => onNothing(),
  type: "nothing",
});

export const Maybe = <T>(value: T | null | undefined): IMaybe<T> =>
  value === null || typeof value === "undefined"
    ? Nothing<T>()
    : Just<T>(value);

// type ILeft<T> = {
//   flatMap: <R>(f: (value: T) => IEither<R, never>) => IEither<R, never>;
//   map: <R>(f: (value: T) => R) => IEither<R, T>;
//   type: "left";
// };

// type IRight<T> = {
//   flatMap: <R>(f: (value: T) => IEither<never, R>) => IEither<never, R>;
//   map: <R>(f: (value: T) => R) => IEither<never, R>;
//   type: "right";
// };

// type IEither<L, R> = IRight<R> | ILeft<L>;

// const Right = <T>(value: T): IRight<T> => ({
//   flatMap: (f) => f(value),
//   map: <R>(f: (value: T) => R) => Right<R>(f(value)),
//   type: "right",
// });

// const Left = <T>(value: T): ILeft<T> => ({
//   flatMap: (f) => f(value),
//   map: <R>(f: (value: T) => R) => Left<R>(f(value)),
//   type: "left",
// });

// export const Either = <L, R>(value: L | R): IEither<L, R> =>
//   value  ? Right<R>(value) : Left<L>(value);
