type MaybeBase<T> = {
  flatMap: <V>(f: (value: T) => IMaybe<V>) => IMaybe<V>;
  map: <V>(f: (value: T) => V) => IMaybe<V>;
  getOrElse: <V>(fallback: V) => V | T;
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
