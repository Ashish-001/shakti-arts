import { Link } from "react-router-dom";
import { categoryLabel } from "../data/categories";

function formatPrice(value) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

export default function ProductCard({ product }) {
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPct = hasDiscount
    ? Math.round(100 - (product.discountPrice / product.price) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-navy-50">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-navy-300">No Image</div>
        )}

        {product.isHotDeal && (
          <span className="absolute left-0 top-3 bg-copper-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
            Hot Deal
          </span>
        )}
        {hasDiscount && (
          <span className="absolute right-3 top-3 bg-navy-900/85 px-2 py-1 text-[11px] font-semibold text-white">
            −{discountPct}%
          </span>
        )}
      </div>

      <div className="pt-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-400">
          {categoryLabel(product.category)}
        </p>
        <h3 className="mt-1 line-clamp-2 text-sm text-navy-800 transition-colors group-hover:text-copper-600">
          {product.name}
        </h3>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className={`text-sm font-semibold ${hasDiscount ? "text-copper-600" : "text-navy-900"}`}>
            {formatPrice(product.discountPrice ?? product.price)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-navy-400 line-through">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
