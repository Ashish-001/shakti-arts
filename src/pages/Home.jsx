import { Link } from "react-router-dom";
import { useMemo } from "react";
import heroImg from "../assets/hero-denim.jpg";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import { useProducts } from "../context/ProductsContext";
import { CATEGORIES } from "../data/categories";
import { DOMESTIC_LEADERS, INTERNATIONAL_ASSOCIATIONS } from "../data/partners";

import embroideredWideLeg from "../assets/products/embroidered-wide-leg.jpg";
import metallicWashWideLeg from "../assets/products/metallic-wash-wide-leg.jpg";
import classicFlared from "../assets/products/classic-flared.jpg";
import ruffleHemSkirt from "../assets/products/ruffle-hem-skirt.jpg";
import distressedWideLeg from "../assets/products/distressed-wide-leg.jpg";
import asymmetricWrapTrouser from "../assets/products/asymmetric-wrap-trouser.jpg";

// Placeholder collage images until real category photos are uploaded
const CATEGORY_IMAGES = {
  jeans: embroideredWideLeg,
  trousers: asymmetricWrapTrouser,
  skirts: ruffleHemSkirt,
  tops: metallicWashWideLeg,
  jackets: distressedWideLeg,
  accessories: classicFlared,
};

const MARQUEE_ITEMS = [
  "Premium Craftsmanship",
  "Since 2005",
  "Ethically Made",
  "Global Fashion",
  "SEDEX Certified",
  "Trend-Forward Design",
];

function MarqueeStrip() {
  const row = (key) => (
    <div key={key} className="flex shrink-0 items-center">
      {MARQUEE_ITEMS.map((item) => (
        <span key={`${key}-${item}`} className="flex items-center">
          <span className="px-8 font-display text-lg italic text-copper-200/90">{item}</span>
          <span className="h-1.5 w-1.5 rotate-45 bg-copper-400/70" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden border-y border-navy-700 bg-navy-900 py-3.5">
      <div className="marquee-track">{[row("a"), row("b")]}</div>
    </div>
  );
}

export default function Home() {
  const { products, loading } = useProducts();

  const hotDeals = useMemo(() => products.filter((p) => p.isHotDeal).slice(0, 8), [products]);

  return (
    <div>
      {/* ——— Hero ——— */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-navy-900">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroImg}
            alt="Shakti Arts signature embroidered denim"
            className="animate-slow-zoom h-full w-full object-cover object-top opacity-90"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/50 to-navy-900/10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-900/80 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl py-28">
            <p className="animate-fade-up eyebrow mb-6 !text-copper-300">
              Est. 2005 — Noida, India
            </p>
            <h1 className="animate-fade-up delay-1 text-6xl font-medium leading-[1.02] tracking-tight text-white sm:text-7xl lg:text-8xl">
              Fashion,
              <br />
              crafted <em className="font-display text-copper-300">to</em>
              <br />
              <em className="font-display text-copper-300">perfection.</em>
            </h1>
            <p className="animate-fade-up delay-2 mt-8 max-w-md text-base font-light leading-relaxed text-navy-100/85">
              Two decades of trend-forward fashion — from signature denim to
              complete wardrobe essentials, engineered with uncompromising
              craftsmanship.
            </p>
            <div className="animate-fade-up delay-3 mt-11 flex flex-wrap items-center gap-6">
              <Link to="/catalog" className="btn btn-primary">
                Explore the Collection
              </Link>
              <Link
                to="/catalog?deal=hot"
                className="group text-xs font-semibold uppercase tracking-[0.18em] text-white"
              >
                Hot Deals
                <span className="mt-1 block h-px w-full origin-left scale-x-100 bg-copper-300 transition-transform duration-300 group-hover:scale-x-50" />
              </Link>
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-navy-200/70 md:flex">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Scroll</span>
          <span className="h-10 w-px animate-pulse bg-gradient-to-b from-navy-200/70 to-transparent" />
        </div>
      </section>

      {/* ——— Marquee ——— */}
      <MarqueeStrip />

      {/* ——— Trusted by ——— */}
      <section className="border-b border-navy-100/70 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-navy-400">
              Trusted by Leading Brands
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
              {[...DOMESTIC_LEADERS, ...INTERNATIONAL_ASSOCIATIONS].map((brand) => (
                <span
                  key={brand}
                  className="font-display text-xl font-medium italic text-navy-300 transition-colors hover:text-copper-500"
                >
                  {brand}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— Hot Deals ——— */}
      {(loading || hotDeals.length > 0) && (
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-12 flex items-end justify-between">
              <div>
                <p className="eyebrow mb-3">Limited Time Only</p>
                <h2 className="text-4xl font-medium text-navy-900 sm:text-5xl">
                  Hot <em className="text-copper-500">Deals</em>
                </h2>
              </div>
              <Link
                to="/catalog?deal=hot"
                className="group hidden text-xs font-semibold uppercase tracking-[0.18em] text-navy-700 sm:block"
              >
                View All
                <span className="mt-1 block h-px w-full origin-left bg-navy-300 transition-colors group-hover:bg-copper-500" />
              </Link>
            </div>
          </Reveal>

          {loading ? (
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] animate-pulse bg-navy-100" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
              {hotDeals.map((p, i) => (
                <Reveal key={p.id} delay={i * 90}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ——— Editorial split: The Craft ——— */}
      <section className="bg-navy-900 text-white">
        <div className="mx-auto grid max-w-7xl items-stretch md:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden md:min-h-[560px]">
            <img
              src={metallicWashWideLeg}
              alt="Metallic wash craftsmanship"
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1.6s] ease-out hover:scale-[1.04]"
            />
          </div>
          <div className="flex items-center px-6 py-20 sm:px-12 lg:px-16">
            <Reveal>
              <p className="eyebrow mb-5 !text-copper-300">The Craft</p>
              <h2 className="text-4xl font-medium leading-tight sm:text-5xl">
                Every stitch,
                <br />
                <em className="text-copper-300">considered.</em>
              </h2>
              <p className="mt-7 max-w-md font-light leading-relaxed text-navy-100/80">
                From in-house design studios to precision stitching, specialized
                washes, and uncompromising quality assurance — every piece moves
                through five stages of obsessive refinement before it reaches
                you.
              </p>
              <Link to="/about" className="btn btn-outline-light mt-10">
                Our Story
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Collections — asymmetric editorial grid ——— */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="eyebrow mb-3">Collections</p>
            <h2 className="text-4xl font-medium text-navy-900 sm:text-5xl">
              Shop the <em className="text-copper-500">Edit</em>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
          {CATEGORIES.map((c, i) => {
            const featured = i === 0 || i === 3;
            return (
              <Reveal
                key={c.slug}
                delay={i * 70}
                className={featured ? "md:col-span-2 md:row-span-1" : ""}
              >
                <Link
                  to={`/catalog?category=${c.slug}`}
                  className={`group relative block overflow-hidden bg-navy-100 ${
                    featured ? "aspect-[4/5] md:aspect-[8/5]" : "aspect-[4/5]"
                  }`}
                >
                  <img
                    src={CATEGORY_IMAGES[c.slug]}
                    alt={c.label}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/15 to-transparent transition-opacity duration-500 group-hover:from-navy-900/90" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                    <div>
                      <span className="block font-display text-2xl font-medium text-white">
                        {c.label}
                      </span>
                      <span className="mt-1.5 inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-copper-200 opacity-0 transition-all duration-300 group-hover:opacity-100">
                        Shop Now →
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ——— Stats band ——— */}
      <section className="border-y border-navy-100 bg-cream-100 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-4 text-center sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            { value: "20+", label: "Years of Craft" },
            { value: "8", label: "Global Brand Partners" },
            { value: "5", label: "Stages of Refinement" },
            { value: "SEDEX", label: "4-Pillar Certified" },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90}>
              <p className="font-display text-5xl font-medium text-navy-900">
                {stat.value}
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-400">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ——— Closing CTA ——— */}
      <section className="relative overflow-hidden bg-navy-900 py-28 text-center text-white">
        <div className="pointer-events-none absolute -left-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-copper-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-copper-500/10 blur-3xl" />
        <Reveal className="relative mx-auto max-w-2xl px-4">
          <p className="eyebrow mb-5 !text-copper-300">Shakti Arts</p>
          <h2 className="text-4xl font-medium leading-tight sm:text-5xl">
            Wear the craft.
            <br />
            <em className="text-copper-300">Feel the difference.</em>
          </h2>
          <div className="mt-11 flex flex-wrap justify-center gap-5">
            <Link to="/catalog" className="btn btn-primary">
              Shop the Collection
            </Link>
            <Link to="/contact" className="btn btn-outline-light">
              Get in Touch
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
