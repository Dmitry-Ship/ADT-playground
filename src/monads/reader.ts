export type IReader<K, O> = {
  run: (e: K) => O;
  flatMap: <V>(f: (value: O) => IReader<K, V>) => IReader<K, V>;
  map: <V>(f: (value: O) => V) => IReader<K, V>;
};

export const Reader = <K, O>(k: (value: K) => O): IReader<K, O> => ({
  run: (e) => k(e),
  map: (f) => Reader((e) => f(k(e))),
  flatMap: (f) => Reader((e) => f(k(e)).run(e)),
});
