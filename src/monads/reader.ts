export const Reader = <T>(k: (value: T) => T) => ({
  run: (e: T) => k(e),
  //   flatMap: (f: (value: T) => T) => Veader((e: any) => f(k(e))).run(e),
  map: (f: (value: T) => T) => Reader((e: any) => f(k(e))),
});
