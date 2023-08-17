import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Modal from "./component/Modal";
import ErrorPage from "./page/Error";
import InvitedPage, { loader as invitedLoader } from "./page/Invited";
import MainPage from "./page/Main";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

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
