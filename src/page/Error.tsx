import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

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
      <h1>{errorTitle}</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
}
