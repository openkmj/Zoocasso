import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Logo from "../asset/Logo.png";

export default function ErrorPage() {
  const error = useRouteError();
  let errorTitle = "400 Internal Error";
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorTitle = `${error.status} - ${error.statusText}`;
    errorMessage = error.error?.message || error?.data;
  } else if (error instanceof Error) {
    errorTitle = `400 - ${error.name}`;
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <div id="error-page">
      <img src={Logo} alt="logo" />
      <h1>Oops,</h1>
      <h1>Where is Zoocasso?</h1>
      <p>
        <i>{errorTitle}</i>
      </p>
      <p>
        <i>{errorMessage}</i>
      </p>
      <button
        onClick={() => {
          location.href = "/";
        }}
      >
        Back to main
      </button>
    </div>
  );
}
