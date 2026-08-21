import { NavLink } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  return (
    <main className="hero">
      <div className="hero__scrim" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__brand">World</p>
        <h1 className="hero__quote">
          Don’t just dream about the world—go out and discover it, one adventure
          at a time.
        </h1>
        <p className="hero__support">
          Leave the map open. The next place is waiting.
        </p>
        <NavLink className="hero__cta" to="/country">
          Start Exploring
        </NavLink>
      </div>
    </main>
  );
};
