
import { createBrowserRouter } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { SelectionPage } from "./pages/SelectionPage";
import { ResultsPage } from "./pages/ResultsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/home",
    Component: HomePage,
  },
  {
    path: "/selection/:type",
    Component: SelectionPage,
  },
  {
    path: "/results",
    Component: ResultsPage,
  }
]);
