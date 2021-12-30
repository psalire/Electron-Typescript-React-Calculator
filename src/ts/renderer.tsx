
import "../scss/main.scss";
import React from "react";
import ReactDOM from "react-dom";
import Calculator from "./react-components/Calculator";

console.log("👋 This message is being logged by \"renderer.js\", included via webpack");

ReactDOM.render(
    <Calculator />,
    document.querySelector("#main-container")
);

ReactDOM.render(
    <div>Footer</div>,
    document.querySelector("#footer-container")
)
