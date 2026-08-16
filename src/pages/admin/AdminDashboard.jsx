import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/ProductsContext";
import { logoutAdmin } from "../../firebase/auth";
import { deleteProduct, deleteProductImage } from "../../firebase/products";
import { categoryLabel } from "../../data/categories";

function formatPrice(value) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const { products, loading, usingSampleData, refresh } = useProducts();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (product) => {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    setDeletingId(product.id);
    try {
      await deleteProduct(product.id);
      if (product.imagePaths?.length) {
        await Promise.all(product.imagePaths.map((p) => deleteProductImage(p)));
      }
      await refresh();
    } catch (err) {
      alert("Failed to delete product: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-navy-800">Admin Dashboard</h1>
          <p className="text-sm text-navy-500">Signed in as {user?.email}</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/admin/products/new"
            className="btn btn-primary"
          >
            + Add Product
          </Link>
          <button
            onClick={() => logoutAdmin()}
            className="btn btn-outline"
          >
            Sign Out
          </button>
        </div>
      </div>

      {usingSampleData && (
        <div className="mb-6 rounded-md bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          Showing sample catalog data — no products found in Firestore yet. Add a product below to
          start populating your live catalog.
        </div>
      )}

      {loading ? (
        <p className="text-navy-500">Loading…</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-navy-100 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-navy-100 bg-navy-50 text-navy-600">
              <tr>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Hot Deal</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="flex items-center gap-3 px-4 py-3">
                    <div className="h-12 w-10 flex-shrink-0 overflow-hidden rounded bg-navy-50">
                      {p.images?.[0] && (
                        <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                    <span className="font-medium text-navy-800">{p.name}</span>
                  </td>
                  <td className="px-4 py-3 text-navy-600">{categoryLabel(p.category)}</td>
                  <td className="px-4 py-3 text-navy-600">
                    {formatPrice(p.discountPrice ?? p.price)}
                    {p.discountPrice && (
                      <span className="ml-1.5 text-xs text-navy-400 line-through">
                        {formatPrice(p.price)}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {p.isHotDeal ? (
                      <span className="rounded-full bg-copper-100 px-2.5 py-0.5 text-xs font-medium text-copper-700">
                        Yes
                      </span>
                    ) : (
                      <span className="text-navy-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/admin/products/${p.id}/edit`}
                      className="mr-3 text-navy-600 hover:text-copper-500"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p)}
                      disabled={deletingId === p.id || p.id.startsWith("sample-")}
                      className="text-red-500 hover:text-red-700 disabled:opacity-40"
                      title={p.id.startsWith("sample-") ? "Sample data can't be deleted" : "Delete"}
                    >
                      {deletingId === p.id ? "Deleting…" : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
