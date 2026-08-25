import { useState } from "react";
import "./Contect.css";

export const Contect = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="contect-page">
      <div className="contect-header">
        <h1>Contact</h1>
        <p>Have a question or idea? Drop a message and we will get back to you.</p>
      </div>

      <div className="contect-layout">
        <aside className="contect-info">
          <div className="contect-info-card">
            <h2>Get in touch</h2>
            <p>We are here to help with anything related to World.</p>

            <ul className="contect-details">
              <li>
                <span className="contect-label">Email</span>
                <span>info@world.com</span>
              </li>
              <li>
                <span className="contect-label">Phone</span>
                <span>+1 234 567 890</span>
              </li>
              <li>
                <span className="contect-label">Location</span>
                <span>Worldwide</span>
              </li>
            </ul>
          </div>
        </aside>

        <form className="contect-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Write your message..."
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="contect-submit">
            Send message
          </button>
        </form>
      </div>
    </main>
  );
};
