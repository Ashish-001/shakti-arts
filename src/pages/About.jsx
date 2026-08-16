import { Link } from "react-router-dom";
import {
  DOMESTIC_LEADERS,
  INTERNATIONAL_ASSOCIATIONS,
  PILLARS,
  ADVANTAGES,
  ENGINE_STEPS,
} from "../data/partners";

export default function About() {
  return (
    <div>
      {/* Intro */}
      <section className="bg-navy-800 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-copper-300">
            Established 2005 · Noida, Uttar Pradesh, India
          </p>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">
            Trend-Forward Apparel, Global Craftsmanship
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-navy-200">
            Backed by advanced infrastructure, skilled professionals, and ethical manufacturing
            practices, Shakti Arts consistently delivers collections that align with global
            fashion trends — precision, durability, comfort, and modern style.
          </p>
        </div>
      </section>

      {/* Trusted brands */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-copper-500">
            Global Trust, Delivered Consistently
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-navy-800 sm:text-3xl">
            Brands We Manufacture For
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-navy-500">
            Our long-standing relationships with reputed brands reflect our commitment to
            superior product quality, timely delivery, and customer satisfaction.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-wide text-navy-600 sm:text-left">
              Domestic Leaders
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {DOMESTIC_LEADERS.map((brand) => (
                <div
                  key={brand}
                  className="flex items-center justify-center rounded-lg border border-navy-100 bg-white px-4 py-6 text-center font-display text-lg font-medium text-navy-800 shadow-sm"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-wide text-navy-600 sm:text-left">
              International Associations
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {INTERNATIONAL_ASSOCIATIONS.map((brand) => (
                <div
                  key={brand}
                  className="flex items-center justify-center rounded-lg border border-navy-100 bg-white px-4 py-6 text-center font-display text-lg font-medium text-navy-800 shadow-sm"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars */}
      <section className="bg-navy-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-semibold text-navy-800 sm:text-3xl">
            The 4 Pillars of Excellence
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => (
              <div key={p.title} className="rounded-lg border border-navy-100 bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-navy-800">{p.title}</h3>
                <p className="text-sm leading-relaxed text-navy-500">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concept to carton */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-2 text-center text-2xl font-semibold text-navy-800 sm:text-3xl">
          The Engine: Concept-to-Carton Infrastructure
        </h2>
        <p className="mb-10 text-center text-navy-500">
          Where concepts come to life: blending aesthetics, functionality, and your brand vision
          under one roof.
        </p>
        <div className="grid gap-4 sm:grid-cols-5">
          {ENGINE_STEPS.map((step, i) => (
            <div key={step.title} className="relative rounded-lg border border-navy-100 bg-white p-5 text-center shadow-sm">
              <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-copper-500 text-sm font-semibold text-white">
                {i + 1}
              </div>
              <h3 className="mb-1 text-sm font-semibold text-navy-800">{step.title}</h3>
              <p className="text-xs leading-relaxed text-navy-500">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Advantage */}
      <section className="bg-navy-800 py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 text-center text-2xl font-semibold sm:text-3xl">The Shakti Advantage</h2>
          <p className="mb-8 text-center text-navy-300">
            We do not simply manufacture garments — we build fashion solutions that help brands
            grow with confidence.
          </p>
          <ul className="divide-y divide-navy-700 overflow-hidden rounded-lg border border-navy-700">
            {ADVANTAGES.map((a) => (
              <li key={a} className="flex items-center gap-3 bg-navy-900/40 px-5 py-3.5 text-sm">
                <span className="text-copper-400">✓</span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-navy-800 sm:text-3xl">Let's Build a Successful Partnership</h2>
        <p className="mt-3 text-navy-500">
          Interested in sourcing from Shakti Arts, or shopping the collection? We'd love to hear
          from you.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="btn btn-primary">
            Contact Us
          </Link>
          <Link to="/catalog" className="btn btn-outline">
            Shop the Catalog
          </Link>
        </div>
      </section>
    </div>
  );
}
