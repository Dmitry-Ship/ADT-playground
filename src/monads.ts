type IIdentity<T> = {
  flatMap: <R>(f: (value: T) => R) => R;
  map: <R>(f: (value: T) => R) => IIdentity<R>;
};

export const Identity = <T>(value: T): IIdentity<T> => ({
  flatMap: (f) => f(value),
  map: (f) => Identity(f(value)),
});

type MaybeBase<T> = {
  flatMap: <R>(f: (value: T) => IMaybe<R>) => IMaybe<R>;
  map: <R>(f: (value: T) => R) => IMaybe<R>;
  getOrElse: <R>(fallback: R) => R | T;
  cata: <B, C>(onJust: (arg: T) => B, onNothing: () => C) => B | C;
};

type INothing<T> = { type: "nothing" } & MaybeBase<T>;
type IJust<T> = { type: "just" } & MaybeBase<T>;
type IMaybe<T> = INothing<T> | IJust<T>;

const Just = <T>(value: T): IJust<T> => ({
  type: "just",
  flatMap: (f) => f(value),
  map: (f) => Maybe(f(value)),
  getOrElse: (fallback) => value,
  cata: (onJust, onNothing) => onJust(value),
});

const Nothing = <T>(): INothing<T> => ({
  type: "nothing",
  flatMap: () => Nothing(),
  map: () => Nothing(),
  getOrElse: (fallback) => fallback,
  cata: (onJust, onNothing) => onNothing(),
});

export const Maybe = <T>(value: T | null | undefined): IMaybe<T> =>
  value === null || typeof value === "undefined"
    ? Nothing<T>()
    : Just<T>(value);

type ILeft<T> = {
  flatMap: <R>(f: (value: T) => IEither<R, never>) => IEither<R, never>;
  map: <R>(f: (value: T) => R) => IEither<R, T>;
  type: "left";
};

type IRight<T> = {
  flatMap: <R>(f: (value: T) => IEither<never, R>) => IEither<never, R>;
  map: <R>(f: (value: T) => R) => IEither<never, R>;
  type: "right";
};

export type IEither<L, R> = IRight<R> | ILeft<L>;

export const Right = <T>(value: T): IRight<T> => ({
  flatMap: (f) => f(value),
  map: <R>(f: (value: T) => R) => Right<R>(f(value)),
  type: "right",
});

export const Left = <T>(value: T): ILeft<T> => ({
  flatMap: (f) => f(value),
  map: <R>(f: (value: T) => R) => Left<R>(f(value)),
  type: "left",
});

// export const Reader = <T>(k: (value: T) => T) => ({
//   run: (e: T) => k(e),
//   flatMap: (f: (value: T) => T) => Reader((e: any) => f(k(e))).run(e),
//   map: (f: (value: T) => T) => Reader((e: any) => f(k(e))),
// });
