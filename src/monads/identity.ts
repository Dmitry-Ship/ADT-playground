type IIdentity<T> = {
  flatMap: <R>(f: (value: T) => R) => R;
  map: <R>(f: (value: T) => R) => IIdentity<R>;
};

export const Identity = <T>(value: T): IIdentity<T> => ({
  flatMap: (f) => f(value),
  map: (f) => Identity(f(value)),
});
