import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import {
  createProduct,
  updateProduct,
  uploadProductImage,
} from "../../firebase/products";
import { CATEGORIES } from "../../data/categories";

const emptyForm = {
  name: "",
  category: CATEGORIES[0].slug,
  price: "",
  discountPrice: "",
  description: "",
  sizes: "",
  colors: "",
  isHotDeal: false,
};

export default function AdminProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { products, refresh } = useProducts();

  const [form, setForm] = useState(emptyForm);
  const [existingImages, setExistingImages] = useState([]); // [{url, path}]
  const [newFiles, setNewFiles] = useState([]); // File[]
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    const product = products.find((p) => p.id === id);
    if (!product) return;
    setForm({
      name: product.name ?? "",
      category: product.category ?? CATEGORIES[0].slug,
      price: product.price ?? "",
      discountPrice: product.discountPrice ?? "",
      description: product.description ?? "",
      sizes: (product.sizes ?? []).join(", "),
      colors: (product.colors ?? []).join(", "),
      isHotDeal: Boolean(product.isHotDeal),
    });
    setExistingImages(
      (product.images ?? []).map((url, i) => ({ url, path: product.imagePaths?.[i] ?? null }))
    );
  }, [isEdit, id, products]);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleFileChange = (e) => {
    setNewFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    e.target.value = "";
  };

  const removeExistingImage = (path) => {
    setExistingImages((prev) => prev.filter((img) => img.path !== path));
  };

  const removeNewFile = (idx) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (existingImages.length === 0 && newFiles.length === 0) {
      setError("Add at least one product image.");
      return;
    }
    setSaving(true);
    try {
      const uploaded = await Promise.all(newFiles.map((f) => uploadProductImage(f)));

      const images = [...existingImages.map((i) => i.url), ...uploaded.map((u) => u.url)];
      const imagePaths = [...existingImages.map((i) => i.path), ...uploaded.map((u) => u.path)];

      const payload = {
        name: form.name.trim(),
        category: form.category,
        price: Number(form.price),
        discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
        description: form.description.trim(),
        sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
        colors: form.colors.split(",").map((s) => s.trim()).filter(Boolean),
        isHotDeal: form.isHotDeal,
        images,
        imagePaths,
      };

      if (isEdit) {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }
      await refresh();
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message ?? "Failed to save product.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-2xl font-semibold text-navy-800">
        {isEdit ? "Edit Product" : "Add Product"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-navy-700">Product Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full rounded-md border border-navy-200 px-3.5 py-2.5 text-sm focus:border-copper-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-navy-700">Category</label>
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className="w-full rounded-md border border-navy-200 px-3.5 py-2.5 text-sm focus:border-copper-400 focus:outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end gap-2">
            <label className="flex cursor-pointer items-center gap-2 rounded-md border border-navy-200 px-3.5 py-2.5 text-sm">
              <input
                type="checkbox"
                checked={form.isHotDeal}
                onChange={(e) => update("isHotDeal", e.target.checked)}
              />
              Mark as Hot Deal
            </label>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-navy-700">Price (₹)</label>
            <input
              required
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
              className="w-full rounded-md border border-navy-200 px-3.5 py-2.5 text-sm focus:border-copper-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-navy-700">
              Discount Price (₹) <span className="text-navy-400">— optional</span>
            </label>
            <input
              type="number"
              min="0"
              value={form.discountPrice}
              onChange={(e) => update("discountPrice", e.target.value)}
              className="w-full rounded-md border border-navy-200 px-3.5 py-2.5 text-sm focus:border-copper-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-navy-700">
              Sizes <span className="text-navy-400">— comma separated</span>
            </label>
            <input
              placeholder="28, 30, 32"
              value={form.sizes}
              onChange={(e) => update("sizes", e.target.value)}
              className="w-full rounded-md border border-navy-200 px-3.5 py-2.5 text-sm focus:border-copper-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-navy-700">
              Colors <span className="text-navy-400">— comma separated</span>
            </label>
            <input
              placeholder="Indigo, Light Wash"
              value={form.colors}
              onChange={(e) => update("colors", e.target.value)}
              className="w-full rounded-md border border-navy-200 px-3.5 py-2.5 text-sm focus:border-copper-400 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-navy-700">Description</label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="w-full rounded-md border border-navy-200 px-3.5 py-2.5 text-sm focus:border-copper-400 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-navy-700">Product Images</label>
          <div className="flex flex-wrap gap-3">
            {existingImages.map((img) => (
              <div key={img.url} className="relative h-24 w-20 overflow-hidden rounded border border-navy-200">
                <img src={img.url} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeExistingImage(img.path)}
                  className="absolute right-0.5 top-0.5 rounded-full bg-navy-900/70 px-1.5 text-xs text-white"
                >
                  ×
                </button>
              </div>
            ))}
            {newFiles.map((file, i) => (
              <div key={i} className="relative h-24 w-20 overflow-hidden rounded border border-navy-200">
                <img src={URL.createObjectURL(file)} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeNewFile(i)}
                  className="absolute right-0.5 top-0.5 rounded-full bg-navy-900/70 px-1.5 text-xs text-white"
                >
                  ×
                </button>
              </div>
            ))}
            <label className="flex h-24 w-20 cursor-pointer flex-col items-center justify-center rounded border border-dashed border-navy-300 text-xs text-navy-500 hover:border-copper-400">
              + Add
              <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
            </label>
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary"
          >
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Product"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            className="btn btn-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
