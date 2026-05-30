import React from "react";
import ReactDOM from "react-dom/client";
// @ts-ignore: importing CSS for side effects
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { AppProvider } from "./core/AppProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);

reportWebVitals();
