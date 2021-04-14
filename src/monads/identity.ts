type IIdentity<T> = {
  flatMap: <V>(f: (value: T) => V) => V;
  map: <V>(f: (value: T) => V) => IIdentity<V>;
};

export const Identity = <T>(value: T): IIdentity<T> => ({
  flatMap: (f) => f(value),
  map: (f) => Identity(f(value)),
});
