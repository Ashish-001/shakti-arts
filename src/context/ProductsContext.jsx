import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { fetchProducts } from "../firebase/products";
import { firebaseConfigured } from "../firebase/config";
import { SAMPLE_PRODUCTS } from "../data/sampleProducts";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(SAMPLE_PRODUCTS);
  const [usingSampleData, setUsingSampleData] = useState(true);
  const [loading, setLoading] = useState(firebaseConfigured);

  const refresh = useCallback(async () => {
    if (!firebaseConfigured) {
      setProducts(SAMPLE_PRODUCTS);
      setUsingSampleData(true);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const live = await fetchProducts();
      if (live.length > 0) {
        setProducts(live);
        setUsingSampleData(false);
      } else {
        setProducts(SAMPLE_PRODUCTS);
        setUsingSampleData(true);
      }
    } catch (err) {
      console.error("Failed to load products from Firebase, showing sample catalog.", err);
      setProducts(SAMPLE_PRODUCTS);
      setUsingSampleData(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <ProductsContext.Provider value={{ products, loading, usingSampleData, refresh }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within a ProductsProvider");
  return ctx;
}
