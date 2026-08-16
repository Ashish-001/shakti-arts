import { CATEGORIES } from "../data/categories";

export default function CategoryPills({ active, onChange }) {
  const pills = [{ slug: "all", label: "All" }, ...CATEGORIES];

  return (
    <div className="flex flex-wrap gap-2">
      {pills.map((c) => (
        <button
          key={c.slug}
          type="button"
          onClick={() => onChange(c.slug)}
          className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
            active === c.slug
              ? "border-navy-800 bg-navy-800 text-white"
              : "border-navy-200 bg-white text-navy-700 hover:border-navy-800"
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
