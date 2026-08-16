import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { db, storage } from "./config";

const PRODUCTS_COL = "products";

export async function fetchProducts() {
  if (!db) return [];
  const q = query(collection(db, PRODUCTS_COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function uploadProductImage(file) {
  if (!storage) throw new Error("Firebase Storage is not configured.");
  const path = `products/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return { url, path };
}

export async function deleteProductImage(path) {
  if (!storage || !path) return;
  try {
    await deleteObject(ref(storage, path));
  } catch {
    // image may already be gone; ignore
  }
}

export async function createProduct(product) {
  if (!db) throw new Error("Firestore is not configured.");
  const docRef = await addDoc(collection(db, PRODUCTS_COL), {
    ...product,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateProduct(id, updates) {
  if (!db) throw new Error("Firestore is not configured.");
  await updateDoc(doc(db, PRODUCTS_COL, id), updates);
}

export async function deleteProduct(id) {
  if (!db) throw new Error("Firestore is not configured.");
  await deleteDoc(doc(db, PRODUCTS_COL, id));
}
