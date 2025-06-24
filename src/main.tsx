import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { router } from "../src/routes/routes"
import './index.css'; 
import './App.css';

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
      { process.env.BUILD === "DEV" && <TanStackRouterDevtools initialIsOpen={false} router={router} position="bottom-right" /> }
    </StrictMode>
  );
}
