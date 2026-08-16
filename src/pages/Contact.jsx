import { useState } from "react";
import { useLocation } from "react-router-dom";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

export default function Contact() {
  const location = useLocation();
  const prefill = location.state?.prefill ?? "";

  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!FORMSPREE_ID) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-semibold text-navy-800">Get in Touch</h1>
        <p className="mt-2 text-navy-500">
          Questions about a product, sizing, or a bulk order? Send us a message.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-3">
          {status === "sent" ? (
            <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
              <p className="font-medium text-green-700">Thanks — your message has been sent!</p>
              <p className="mt-1 text-sm text-green-600">We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-navy-700">Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    className="w-full rounded-md border border-navy-200 px-3.5 py-2.5 text-sm focus:border-copper-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-navy-700">Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    className="w-full rounded-md border border-navy-200 px-3.5 py-2.5 text-sm focus:border-copper-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-navy-700">Message</label>
                <textarea
                  required
                  name="message"
                  rows={6}
                  defaultValue={prefill}
                  className="w-full rounded-md border border-navy-200 px-3.5 py-2.5 text-sm focus:border-copper-400 focus:outline-none"
                />
              </div>

              {!FORMSPREE_ID && (
                <p className="rounded-md bg-yellow-50 px-3.5 py-2.5 text-xs text-yellow-800">
                  Contact form isn't fully set up yet — VITE_FORMSPREE_ID is missing. See the README
                  for setup steps.
                </p>
              )}
              {status === "error" && FORMSPREE_ID && (
                <p className="text-sm text-red-600">Something went wrong sending your message. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn btn-primary w-full sm:w-auto"
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>

        <div className="md:col-span-2">
          <div className="rounded-lg bg-navy-800 p-6 text-navy-100">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-copper-300">
              Shakti Arts
            </h2>
            <ul className="space-y-4 text-sm">
              <li>
                <p className="font-medium text-white">Address</p>
                <p className="mt-0.5 text-navy-200">
                  C-112, Sector 63, Gautam Buddh Nagar,
                  <br />
                  Noida, Uttar Pradesh, 201301, India
                </p>
              </li>
              <li>
                <p className="font-medium text-white">Phone</p>
                <a href="tel:+919811230091" className="mt-0.5 block text-navy-200 hover:text-copper-300">
                  +91 98112 30091
                </a>
              </li>
              <li>
                <p className="font-medium text-white">Email</p>
                <a href="mailto:shivamdhingra03@gmail.com" className="mt-0.5 block text-navy-200 hover:text-copper-300">
                  shivamdhingra03@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
