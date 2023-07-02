import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>main</div>,
  },
  {
    path: "/:id",
    element: <div>id</div>,
  },
]);

function App() {
  return (
    <div id="page">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
