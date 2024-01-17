import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import { allSettled, fork } from "effector";
import { Provider } from "effector-react";
import { RouterProvider } from "atomic-router-react";
import { router } from "@/shared/routing";
import { appStarted } from "@/shared/init";

const scope = fork();

allSettled(appStarted, { scope }).catch(() =>
  console.warn("error occured while loading app")
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider value={scope}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
