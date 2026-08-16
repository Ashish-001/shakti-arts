import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "shakti-arts-cart";

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function lineKey(productId, size, color) {
  return [productId, size ?? "", color ?? ""].join("__");
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product, { size, color, qty = 1 } = {}) => {
    setItems((prev) => {
      const key = lineKey(product.id, size, color);
      const existing = prev.find((i) => lineKey(i.productId, i.size, i.color) === key);
      if (existing) {
        return prev.map((i) =>
          lineKey(i.productId, i.size, i.color) === key
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          image: product.images?.[0] ?? null,
          price: product.discountPrice ?? product.price,
          size: size ?? null,
          color: color ?? null,
          qty,
        },
      ];
    });
  };

  const removeFromCart = (productId, size, color) => {
    const key = lineKey(productId, size, color);
    setItems((prev) => prev.filter((i) => lineKey(i.productId, i.size, i.color) !== key));
  };

  const updateQty = (productId, size, color, qty) => {
    if (qty < 1) return;
    const key = lineKey(productId, size, color);
    setItems((prev) =>
      prev.map((i) => (lineKey(i.productId, i.size, i.color) === key ? { ...i, qty } : i))
    );
  };

  const clearCart = () => setItems([]);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.qty * i.price, 0),
    [items]
  );

  const value = { items, addToCart, removeFromCart, updateQty, clearCart, count, subtotal };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
