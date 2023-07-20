import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./page/Main";
import InvitedPage, { loader as invitedLoader } from "./page/Invited";
import ErrorPage from "./page/Error";
import Modal from "./component/Modal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:id",
    element: <InvitedPage />,
    loader: invitedLoader,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <div id="page">
      <RouterProvider router={router} />
      <Modal />
    </div>
  );
}

export default App;
