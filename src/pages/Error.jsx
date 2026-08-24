import { NavLink, useRouteError } from "react-router-dom";
import "./Error.css";

export const Error = () => {
  const error = useRouteError();

  const status = error?.status || 404;
  const statusText = error?.statusText || "Page Not Found";
  const message =
    error?.data ||
    error?.message ||
    "The page you are looking for does not exist or something went wrong.";

  return (
    <main className="error-page">
      <div className="error-content">
        <p className="error-code">{status}</p>
        <h1>Oops! Something went wrong</h1>
        <h2>{statusText}</h2>
        <p className="error-message">{message}</p>
        <NavLink to="/" className="error-home-btn">
          Go Home
        </NavLink>
      </div>
    </main>
  );
};
