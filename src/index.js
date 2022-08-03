import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {GithubProvider} from "./context/context";
import {Auth0Provider} from "@auth0/auth0-react";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GithubProvider>
    <App />
  </GithubProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals();