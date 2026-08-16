import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import { categoryLabel } from "../data/categories";

function formatPrice(value) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  const product = useMemo(() => products.find((p) => p.id === id), [products, id]);
  const related = useMemo(
    () =>
      product
        ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
        : [],
    [products, product]
  );

  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (loading) {
    return <div className="mx-auto max-w-7xl px-4 py-20 text-center text-navy-500">Loading…</div>;
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold text-navy-800">Product not found</h1>
        <button onClick={() => navigate("/catalog")} className="mt-4 text-copper-500 hover:underline">
          ← Back to catalog
        </button>
      </div>
    );
  }

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const images = product.images?.length ? product.images : [null];

  const handleAddToCart = () => {
    addToCart(product, { size, color, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-navy-500">
        <Link to="/catalog" className="hover:text-copper-500">Catalog</Link>
        <span className="mx-2">/</span>
        <Link to={`/catalog?category=${product.category}`} className="hover:text-copper-500">
          {categoryLabel(product.category)}
        </Link>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <div className="aspect-[3/4] overflow-hidden rounded-lg bg-navy-50">
            {images[activeImage] ? (
              <img src={images[activeImage]} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-navy-300">No Image</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-16 w-16 overflow-hidden rounded border-2 ${
                    activeImage === i ? "border-copper-500" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {product.isHotDeal && (
            <span className="mb-3 inline-block rounded-full bg-copper-500 px-3 py-1 text-xs font-semibold text-white">
              Hot Deal
            </span>
          )}
          <p className="text-xs font-medium uppercase tracking-wide text-copper-500">
            {categoryLabel(product.category)}
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-navy-800 sm:text-3xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-xl font-semibold text-navy-900">
              {formatPrice(product.discountPrice ?? product.price)}
            </span>
            {hasDiscount && (
              <span className="text-base text-navy-400 line-through">{formatPrice(product.price)}</span>
            )}
          </div>

          {product.description && (
            <p className="mt-5 leading-relaxed text-navy-600">{product.description}</p>
          )}

          {product.sizes?.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold text-navy-800">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`border px-4 py-2 text-sm font-medium transition-colors ${
                      size === s
                        ? "border-navy-800 bg-navy-800 text-white"
                        : "border-navy-200 text-navy-700 hover:border-navy-800"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.colors?.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 text-sm font-semibold text-navy-800">Color</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`border px-4 py-2 text-sm font-medium transition-colors ${
                      color === c
                        ? "border-navy-800 bg-navy-800 text-white"
                        : "border-navy-200 text-navy-700 hover:border-navy-800"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-navy-200">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-navy-700 hover:text-copper-500"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-2 text-navy-700 hover:text-copper-500"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button onClick={handleAddToCart} className="btn btn-primary flex-1">
              {added ? "Added to Cart ✓" : "Buy"}
            </button>
          </div>
          <p className="mt-3 text-xs text-navy-400">
            Adding to cart does not charge you. We'll follow up via the contact form to confirm your order.
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-semibold text-navy-800">You May Also Like</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
