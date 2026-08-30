import co from "../api/countery.json";
import "./About.css";

export const About = () => {
  return (
    <section className="about-container">
      <div className="about-header">
        <span className="about-subtitle">EXPLORE THE GLOBE</span>
        <h1 className="about-title">Here are the Interesting Facts We're Proud Of</h1>
        <p className="about-description">
          Discover fascinating insights, demographics, and cultural icons from countries around the world.
        </p>
      </div>

      <div className="gradient-cards">
        {co.map((country) => {
          const { id, country: countryName, populationRank, population, fact, famousPlace, famousThing } = country;
          return (
            <div className="card" key={id}>
              <div className="container-card">
                <div className="card-top">
                  <h2 className="card-title">{countryName}</h2>
                  <span className="rank-badge">Rank #{populationRank}</span>
                </div>
                
                <div className="card-body">
                  <p className="card-info">
                    <span className="card-description">Population:</span>{" "}
                    <span className="highlight-val">{population ? population.toLocaleString() : "N/A"}</span>
                  </p>

                  <div className="card-info">
                    <span className="card-description">Fact:</span>
                    <span className="fact-text">{fact}</span>
                  </div>

                  <div className="card-highlights">
                    <div className="highlight-item">
                      <span className="card-description">Famous Place:</span>
                      <span className="badge-tag">{famousPlace}</span>
                    </div>

                    <div className="highlight-item">
                      <span className="card-description">Famous Thing:</span>
                      <span className="badge-tag">{famousThing}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};