import { createRootRoute, createRoute, Router } from "@tanstack/react-router";
import App from "../App";
import { SingleProd, Index } from "./main";

export const routerConfigs = [
  {
    path: "/",
    label: "Home",
    component: Index,
  },
  {
    path: "/SingleProd/:id",
    label: "SingleProd",
    component: SingleProd,
  },
];

const rootRoute = createRootRoute({
  component: () => <App />,
});

const childRoutes = routerConfigs.map((cfg) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path: cfg.path,
    component: cfg.component,
  })
);

export const router = new Router({
  routeTree: rootRoute.addChildren(childRoutes),
});
