import "./Country.css";

const posters = [
  { id: 1, titleW: "70%", metaW: "42%" },
  { id: 2, titleW: "78%", metaW: "50%" },
  { id: 3, titleW: "64%", metaW: "38%" },
  { id: 4, titleW: "82%", metaW: "55%" },
  { id: 5, titleW: "68%", metaW: "44%" },
  { id: 6, titleW: "74%", metaW: "48%" },
  { id: 7, titleW: "60%", metaW: "36%" },
  { id: 8, titleW: "76%", metaW: "52%" },
  { id: 9, titleW: "72%", metaW: "40%" },
  { id: 10, titleW: "66%", metaW: "46%" },
  { id: 11, titleW: "80%", metaW: "54%" },
  { id: 12, titleW: "58%", metaW: "34%" },
];

export const Country = () => {
  return (
    <main className="country-page">
      <div className="country-header">
        <div className="country-header-text">
          <h1>Countries</h1>
          <p>Browse places from around the world. Content coming soon.</p>
        </div>
        <div className="country-toolbar">
          <div className="country-search" aria-hidden="true">
            <span className="country-search-icon" />
            <span className="country-search-bar" />
          </div>
          <span className="country-count">{posters.length} posters</span>
        </div>
      </div>

      <div className="poster-grid">
        {posters.map((poster, index) => (
          <article
            key={poster.id}
            className="poster"
            style={{ "--delay": `${index * 40}ms` }}
            aria-label={`Empty poster ${poster.id}`}
          >
            <div className="poster-media">
              <span className="poster-placeholder" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </span>
            </div>
            <div className="poster-body">
              <div
                className="poster-line poster-line--title"
                style={{ width: poster.titleW }}
              />
              <div
                className="poster-line poster-line--meta"
                style={{ width: poster.metaW }}
              />
              <div className="poster-action" />
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};
