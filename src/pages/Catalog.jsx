import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import CategoryPills from "../components/CategoryPills";
import { useProducts } from "../context/ProductsContext";

const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function Catalog() {
  const { products, loading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const category = searchParams.get("category") ?? "all";
  const onlyHotDeals = searchParams.get("deal") === "hot";
  const sort = searchParams.get("sort") ?? "newest";

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    setSearchParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (onlyHotDeals) list = list.filter((p) => p.isHotDeal);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (sort === "price-asc") {
      list.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price));
    } else if (sort === "price-desc") {
      list.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price));
    }
    return list;
  }, [products, category, onlyHotDeals, search, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-navy-800">
          {onlyHotDeals ? "Hot Deals" : "Full Catalog"}
        </h1>
        <p className="mt-1 text-navy-500">
          {onlyHotDeals
            ? "Limited-time offers across our denim collections."
            : "Browse the complete Shakti Arts denim collection."}
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CategoryPills active={category} onChange={(slug) => setParam("category", slug)} />

        <div className="flex gap-3">
          <input
            type="search"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-navy-200 bg-white px-4 py-2 text-sm focus:border-navy-800 focus:outline-none sm:w-56"
          />
          <select
            value={sort}
            onChange={(e) => setParam("sort", e.target.value)}
            className="border border-navy-200 bg-white px-3 py-2 text-sm focus:border-navy-800 focus:outline-none"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {onlyHotDeals && (
        <button
          onClick={() => setParam("deal", null)}
          className="mb-6 text-sm font-medium text-copper-500 hover:underline"
        >
          × Clear Hot Deals filter
        </button>
      )}

      {loading ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] animate-pulse bg-navy-100" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="border border-dashed border-navy-200 py-20 text-center text-navy-500">
          No products found. Try a different filter or search term.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
