"use client";

import { useState } from "react";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formEl = e.currentTarget;
    const form = new FormData(formEl);

    setLoading(true);

    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      subject: form.get("subject"),
      message: form.get("message"),
      honeypot: form.get("honeypot"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setSent(true);
        formEl.reset();
      } else {
        setError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <h2 className="fw-bold mb-4 text-center">Contact Ariel Solutions</h2>

          {sent && (
            <div className="alert alert-success">
              Message sent successfully. We'll get back to you soon.
            </div>
          )}

          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="card shadow-sm p-4 border-0">

            {/* Honeypot — hidden from real users, bots will fill it */}
            <input
              name="honeypot"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="mb-3">
              <label className="form-label">Name</label>
              <input name="name" className="form-control" required maxLength={100} />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input name="email" type="email" className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Subject</label>
              <input name="subject" className="form-control" required maxLength={150} />
            </div>

            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea name="message" rows={5} className="form-control" required maxLength={5000} />
            </div>

            <button className="btn btn-primary w-100" disabled={loading || sent}>
              {loading ? "Sending..." : sent ? "Sent ✓" : "Send Message"}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}
