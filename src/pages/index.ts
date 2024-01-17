import { RouteRecord, createRoutesView } from "atomic-router-react";

const pages = import.meta.glob<
  true,
  string,
  { default: RouteRecord<object, object> }
>("./**/index.ts", { eager: true });

const routes = Object.values(pages)
  .map((page) => page.default)
  .filter(Boolean); // TODO remove filter

console.log("routes", routes);
export const Pages = createRoutesView({ routes });
