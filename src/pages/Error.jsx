import { useState } from "react";
import { NavLink, useNavigate, useRouteError } from "react-router-dom";
import {
  FaHome,
  FaArrowLeft,
  FaRotateRight,
  FaCompass,
  FaEarthAmericas,
  FaCircleInfo,
  FaEnvelope,
  FaChevronDown,
  FaChevronUp,
  FaMagnifyingGlass,
  FaBug,
  FaCopy,
  FaCheck
} from "react-icons/fa6";
import "./Error.css";

export const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  
  const [showDetails, setShowDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const status = error?.status || 404;
  const statusText = error?.statusText || (status === 404 ? "Page Not Found" : "Unexpected Error");
  const message =
    error?.data ||
    error?.message ||
    "The page you are looking for might have been removed, renamed, or is temporarily unavailable.";

  const quickLinks = [
    {
      title: "Home Page",
      path: "/",
      icon: FaHome,
      desc: "Return to the primary dashboard & hero section",
      color: "#6366f1"
    },
    {
      title: "Explore Countries",
      path: "/country",
      icon: FaEarthAmericas,
      desc: "Search, filter & view world country data",
      color: "#38bdf8"
    },
    {
      title: "About Us",
      path: "/about",
      icon: FaCircleInfo,
      desc: "Learn more about our project & facts",
      color: "#a855f7"
    },
    {
      title: "Contact Support",
      path: "/contect",
      icon: FaEnvelope,
      desc: "Send us a message or get help",
      color: "#f43f5e"
    }
  ];

  const filteredLinks = searchQuery.trim()
    ? quickLinks.filter(
        (link) =>
          link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          link.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : quickLinks;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    const matched = quickLinks.find(
      (link) =>
        link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.path.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matched) {
      navigate(matched.path);
    } else {
      // Default to country search if not matching other pages
      navigate(`/country`);
    }
  };

  const handleCopyError = () => {
    const errorDetails = `Status: ${status}\nStatus Text: ${statusText}\nMessage: ${message}`;
    navigator.clipboard.writeText(errorDetails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="error-page-wrapper">
      {/* Background Ambient Glowing Orbs */}
      <div className="ambient-orb orb-1"></div>
      <div className="ambient-orb orb-2"></div>
      <div className="ambient-orb orb-3"></div>

      <div className="error-card">
        {/* Header Illustration & Badge */}
        <div className="error-header">
          <div className="status-badge">
            <span className="badge-dot"></span>
            <span>{status === 404 ? "HTTP 404 - LOST IN SPACE" : `HTTP ${status} - ERROR`}</span>
          </div>

          <div className="error-code-container">
            <span className="error-code-bg">{status}</span>
            <div className="compass-icon-wrapper" title="Lost Orientation">
              <FaCompass className="compass-icon" />
            </div>
          </div>

          <h1 className="error-title">
            {status === 404 ? "Oops! Page Out of Bounds" : "Something Went Wrong"}
          </h1>
          <p className="error-subtitle">{statusText}</p>
          <p className="error-description">{message}</p>
        </div>

        {/* Action Buttons */}
        <div className="error-actions">
          <NavLink to="/" className="btn btn-primary">
            <FaHome className="btn-icon" />
            <span>Back to Safety</span>
          </NavLink>

          <button onClick={() => navigate(-1)} className="btn btn-secondary">
            <FaArrowLeft className="btn-icon" />
            <span>Go Back</span>
          </button>

          <button onClick={() => window.location.reload()} className="btn btn-ghost" title="Refresh Page">
            <FaRotateRight className="btn-icon" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Quick Search Bar */}
        <form onSubmit={handleSearchSubmit} className="error-search-form">
          <div className="search-input-wrapper">
            <FaMagnifyingGlass className="search-icon" />
            <input
              type="text"
              placeholder="Search for a page or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="error-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>
        </form>

        {/* Quick Shortcuts Section */}
        <div className="quick-shortcuts">
          <h2 className="shortcuts-heading">Popular Destinations</h2>
          <div className="shortcuts-grid">
            {filteredLinks.length > 0 ? (
              filteredLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <NavLink key={link.path} to={link.path} className="shortcut-card">
                    <div className="shortcut-icon-box" style={{ color: link.color, background: `${link.color}15` }}>
                      <IconComponent />
                    </div>
                    <div className="shortcut-info">
                      <h3>{link.title}</h3>
                      <p>{link.desc}</p>
                    </div>
                  </NavLink>
                );
              })
            ) : (
              <div className="no-shortcuts">
                <p>No matching page found. Try searching for "Country", "About", or "Home".</p>
              </div>
            )}
          </div>
        </div>

        {/* Technical Diagnostics Accordion */}
        <div className="error-diagnostics">
          <button
            type="button"
            className="diagnostics-toggle"
            onClick={() => setShowDetails(!showDetails)}
          >
            <span className="toggle-left">
              <FaBug className="bug-icon" />
              <span>Technical Diagnostics</span>
            </span>
            {showDetails ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          {showDetails && (
            <div className="diagnostics-content">
              <div className="diagnostics-header">
                <span>Error Log Summary</span>
                <button onClick={handleCopyError} className="copy-btn">
                  {copied ? <FaCheck className="copy-icon green" /> : <FaCopy className="copy-icon" />}
                  <span>{copied ? "Copied!" : "Copy Details"}</span>
                </button>
              </div>
              <pre className="diagnostics-code">
                {JSON.stringify(
                  {
                    status: status,
                    statusText: statusText,
                    message: message,
                    timestamp: new Date().toISOString(),
                    path: window.location.pathname
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Error;
