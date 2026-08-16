import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./config";

export function loginAdmin(email, password) {
  if (!auth) return Promise.reject(new Error("Firebase Auth is not configured."));
  return signInWithEmailAndPassword(auth, email, password);
}

export function logoutAdmin() {
  if (!auth) return Promise.resolve();
  return signOut(auth);
}

export function watchAuthState(callback) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}
