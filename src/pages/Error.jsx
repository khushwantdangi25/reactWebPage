import { useRouteError, NavLink, useNavigate } from "react-router-dom";
import "./Error.css";

export const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <section className="error-section">
      <div className="error-container">
        <h1 className="error-code">{error?.status || "404"}</h1>
        <h2 className="error-title">
          {error?.status === 404 ? "Page Not Found" : "Oops! Something Went Wrong"}
        </h2>
        <p className="error-description">
          {error?.data || error?.message || "The page you are looking for does not exist or has been moved."}
        </p>

        <div className="error-actions">
          <NavLink to="/" className="btn btn-primary">
            Go Back Home
          </NavLink>
          <button onClick={() => navigate(-1)} className="btn btn-secondary">
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
};