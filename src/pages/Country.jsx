import "./Country.css";

const posters = Array.from({ length: 8 }, (_, i) => i + 1);

export const Country = () => {
  return (
    <main className="country-page">
      <div className="country-header">
        <h1>Countries</h1>
        <p>Browse places from around the world. Content coming soon.</p>
      </div>

      <div className="poster-grid">
        {posters.map((id) => (
          <article key={id} className="poster" aria-label={`Poster ${id}`}>
            <div className="poster-media" />
            <div className="poster-body">
              <div className="poster-line poster-line--title" />
              <div className="poster-line poster-line--meta" />
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};
