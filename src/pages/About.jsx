import co from "../api/countery.json";
import "./About.css";

export const About = () => {
  return (
    <section className="about-card">
      <div className="about-heading">
        <h1>Interesting Facts About World</h1>
      </div>

      {co.map((country) => {
        return (
          <div className="about-attribute" key={country.id}>
            <p>
              Country: <span className="country">{country.country}</span>
            </p>

            <p>
              Ranking: <span className="ranking">{country.populationRank}</span>
            </p>

            <p>
              Population:{" "}
              <span className="population">{country.population}</span>
            </p>

            <p>
              Fact: <span className="fact">{country.fact}</span>
            </p>

            <p>
              Famous Place:{" "}
              <span className="famous">{country.famousPlace}</span>
            </p>

            <p>
              Famous Thing:{" "}
              <span className="famous">{country.famousThing}</span>
            </p>
          </div>
        );
      })}
    </section>
  );
};