import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function formatPrice(value) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

export default function Cart() {
  const { items, removeFromCart, updateQty, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold text-navy-800">Your cart is empty</h1>
        <p className="mt-2 text-navy-500">Browse the catalog and add pieces you love.</p>
        <Link
          to="/catalog"
          className="btn btn-primary mt-6"
        >
          Shop the Catalog
        </Link>
      </div>
    );
  }

  const enquiryLines = items
    .map((i) => `• ${i.name}${i.size ? ` (Size ${i.size})` : ""}${i.color ? ` (${i.color})` : ""} × ${i.qty}`)
    .join("\n");

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-semibold text-navy-800">Your Cart</h1>

      <div className="divide-y divide-navy-100 rounded-lg border border-navy-100 bg-white">
        {items.map((item) => (
          <div key={`${item.productId}-${item.size}-${item.color}`} className="flex items-center gap-4 p-4">
            <div className="h-20 w-16 flex-shrink-0 overflow-hidden rounded bg-navy-50">
              {item.image ? (
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              ) : null}
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-navy-800">{item.name}</p>
              <p className="text-xs text-navy-500">
                {[item.size && `Size ${item.size}`, item.color].filter(Boolean).join(" · ")}
              </p>
              <p className="mt-1 text-sm font-semibold text-navy-900">{formatPrice(item.price)}</p>
            </div>

            <div className="flex items-center rounded-md border border-navy-200">
              <button
                onClick={() => updateQty(item.productId, item.size, item.color, item.qty - 1)}
                className="px-2.5 py-1.5 text-navy-700 hover:text-copper-500"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-7 text-center text-sm">{item.qty}</span>
              <button
                onClick={() => updateQty(item.productId, item.size, item.color, item.qty + 1)}
                className="px-2.5 py-1.5 text-navy-700 hover:text-copper-500"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item.productId, item.size, item.color)}
              className="ml-2 text-navy-400 hover:text-red-500"
              aria-label="Remove item"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-lg bg-navy-50 p-5">
        <span className="text-sm font-medium text-navy-700">Estimated Subtotal</span>
        <span className="text-xl font-semibold text-navy-900">{formatPrice(subtotal)}</span>
      </div>

      <div className="mt-6 rounded-lg border border-copper-200 bg-copper-50 p-5 text-center">
        <p className="text-sm text-navy-700">
          We don't process payments online yet. Send us your cart and we'll get back to you to
          confirm availability, sizing, and order details.
        </p>
        <Link
          to={{ pathname: "/contact" }}
          state={{ prefill: `I'd like to enquire about these items:\n\n${enquiryLines}` }}
          className="btn btn-primary mt-4"
        >
          Enquire About These Items
        </Link>
      </div>
    </div>
  );
}
