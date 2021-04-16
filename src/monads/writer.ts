type IWriter<T> = {
  flatMap: <V>(f: (value: T) => IWriter<V>) => IWriter<V>;
  map: <V>(f: (value: T) => V) => IWriter<V>;
  writable: <V>(log: string, f: (arg: T) => V) => IWriter<V>;
  getFirst: () => string;
  getSecond: () => T;
};

export const Writer = <T>(log: string, value: T): IWriter<T> => ({
  flatMap: (f) => {
    const writer = f(value);
    return Writer(log.concat("->", writer.getFirst()), writer.getSecond());
  },
  map: (f) => Writer(log, f(value)),
  writable: (log, f) => Writer(log, f(value)),
  getFirst: () => log,
  getSecond: () => value,
});
