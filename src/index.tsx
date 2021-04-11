import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Maybe } from "./monads";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

type PetToy = {
  type: string;
};

type Pet = {
  name: string;
  toy: PetToy;
};

type Person = {
  name: string;
  pet?: Pet;
};

const john: Person = {
  name: "John",
  pet: {
    name: "Spark",
    toy: {
      type: "chewtoy",
    },
  },
};

const result = Maybe(john)
  .map((person) => person.pet?.toy.type.toUpperCase())
  .getOrElse("NONE!");

console.log("result", result);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// const greeting = 'hello'
//   |> doubleSay
//   |> capitalize
//   |> exclaim
