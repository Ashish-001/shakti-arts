import { Link } from "react-router-dom";
import { useMemo } from "react";
import heroImg from "../assets/hero-denim.jpg";
import ProductCard from "../components/ProductCard";
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

export default function Home() {
  const { products, loading } = useProducts();

  const hotDeals = useMemo(() => products.filter((p) => p.isHotDeal).slice(0, 8), [products]);

  return (
    <div>
      {/* Hero — full-bleed editorial */}
      <section className="relative min-h-[82vh] overflow-hidden bg-navy-900">
        <img
          src={heroImg}
          alt="Shakti Arts embroidered wide-leg denim"
          className="absolute inset-0 h-full w-full object-cover object-top opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/85 via-navy-900/45 to-transparent" />

        <div className="relative mx-auto flex min-h-[82vh] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl py-24">
            <p className="eyebrow mb-5 !text-copper-300">Since 2005 · Noida, India</p>
            <h1 className="text-5xl font-semibold leading-[1.08] text-white sm:text-6xl lg:text-7xl">
              Fashion, Crafted
              <br />
              <em className="text-copper-300">to Perfection</em>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-navy-100/90">
              Two decades of trend-forward fashion — from premium denim to
              complete wardrobe essentials, engineered with global
              craftsmanship.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/catalog" className="btn btn-primary">
                Shop the Catalog
              </Link>
              <Link to="/catalog?deal=hot" className="btn btn-outline-light">
                Hot Deals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="border-b border-navy-100 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-navy-400">
            Trusted by Leading Brands
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[...DOMESTIC_LEADERS, ...INTERNATIONAL_ASSOCIATIONS].map((brand) => (
              <span key={brand} className="font-display text-xl font-medium italic text-navy-400">
                {brand}
              </span>
            ))}
          </div>
          <Link
            to="/about"
            className="mt-5 inline-block text-xs font-semibold uppercase tracking-[0.14em] text-copper-500 hover:text-copper-600"
          >
            Our Partnerships →
          </Link>
        </div>
      </section>

      {/* Hot Deals */}
      {(loading || hotDeals.length > 0) && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="eyebrow mb-2">Limited Time</p>
              <h2 className="text-3xl font-semibold text-navy-900 sm:text-4xl">Hot Deals</h2>
            </div>
            <Link
              to="/catalog?deal=hot"
              className="text-xs font-semibold uppercase tracking-[0.14em] text-navy-600 hover:text-copper-500"
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] animate-pulse bg-navy-100" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
              {hotDeals.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Category collage */}
      <section className="bg-cream-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="eyebrow mb-2">Collections</p>
            <h2 className="text-3xl font-semibold text-navy-900 sm:text-4xl">Shop by Collection</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to={`/catalog?category=${c.slug}`}
                className="group relative aspect-[4/5] overflow-hidden bg-navy-100"
              >
                <img
                  src={CATEGORY_IMAGES[c.slug]}
                  alt={c.label}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/75 via-navy-900/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="block text-lg font-semibold text-white">{c.label}</span>
                  <span className="mt-1 inline-block text-[11px] font-semibold uppercase tracking-[0.18em] text-copper-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Shop Now →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="eyebrow mb-3">Our Story</p>
        <h2 className="text-3xl font-semibold leading-snug text-navy-900 sm:text-4xl">
          Shaping the Future of Fashion
          <br />
          <em>Since 2005</em>
        </h2>
        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-navy-500">
          From our roots in premium denim to a complete apparel range — backed
          by advanced infrastructure, skilled professionals, and SEDEX
          4-Pillar ethical manufacturing practices, Shakti Arts delivers
          precision, durability, comfort, and modern style, trusted by
          leading domestic and international fashion brands.
        </p>
        <div className="mt-9 flex justify-center gap-4">
          <Link to="/about" className="btn btn-dark">
            About Us
          </Link>
          <Link to="/contact" className="btn btn-outline">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
