import { Index, Router } from "simply-react-router";

import "./index.css";
import Home from "./Home.tsx";
import App from "./App.tsx";

const root = document.getElementById("root");

Index.Set(root, <Home />);

Router.Render(
  root,
  Router.Routes({
    "/app": <App />,
  })
);
