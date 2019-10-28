import React from "react";
import ReactDOM from "react-dom";
import { drizzleReactHooks } from "drizzle-react";

import App from "./components/App";
import { initializeDrizzle } from "./drizzleInit";

const drizzle = initializeDrizzle();

ReactDOM.render(
  <drizzleReactHooks.DrizzleProvider drizzle={drizzle}>
    <drizzleReactHooks.Initializer>
      <App />
    </drizzleReactHooks.Initializer>
  </drizzleReactHooks.DrizzleProvider>,
  document.getElementById("root")
);
