import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { IEither, Left, Right } from "./monads/either";
import { Maybe } from "./monads/maybe";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

type MyJSON = {
  foo: boolean;
};

const parseJSON = (json: string) => () => JSON.parse(json);

const parseMy = parseJSON('{"foo":true}');

const parsed = Right(null)
  .fromTry<string, MyJSON>(parseMy)
  .flatMap((value) => Right({ ...value, bar: true }))
  .map((value) => ({ ...value, foo: !value.foo }))
  .cata({
    onLeft: (x) => x,
    onRight: (x) => x,
  });

// const parsed = parseJSON<MYJSON>('"foo": "bar"').flatMapLeft((value) => value);
// .flatMap((value) => Left(value));

console.log("parsed", parsed);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// const greeting = 'hello'
//   |> doubleSay
//   |> capitalize
//   |> exclaim
