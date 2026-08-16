# Shakti Arts — Premium Denim Website

A catalog + lookbook website for Shakti Arts (premium denim manufacturer, Noida, India), built with React + Vite + Tailwind CSS, hosted on **GitHub Pages**.

**Features**

- H&M-inspired editorial storefront with the Shakti Arts navy/copper brand identity
- Full catalog with category filters, search, and sorting
- Hot Deals section with discount badges
- Product pages with size/color selection and a Buy button (adds to cart — no online payment; customers send their cart as an enquiry)
- Cart with quantity controls, persisted in the browser
- About page featuring brand partners (Reliance, V-Mart, Monte Carlo, First Cry, Madame, Mango, R&B, Verbaudet)
- Contact page powered by Formspree (messages land in your email)
- **Admin panel** (`/admin`) where you upload products + images, mark hot deals, and manage the live catalog via Firebase
- Until Firebase has products, the site shows a built-in sample catalog

---

## 1. Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173/shakti-arts/

Without any configuration the site works with sample data; the admin panel and contact form stay disabled until you finish the setup below.

## 2. Set up Firebase (admin panel + live catalog)

1. Go to https://console.firebase.google.com → **Add project** (e.g. `shakti-arts`). Google Analytics is optional.
2. **Add a Web App**: Project overview → Web icon (`</>`) → register app. Copy the `firebaseConfig` values.
3. **Firestore**: Build → Firestore Database → Create database → Start in production mode.
   - Then open the **Rules** tab and paste the contents of [`firestore.rules`](firestore.rules) → Publish.
4. **Storage**: Build → Storage → Get started.
   - Open the **Rules** tab and paste the contents of [`storage.rules`](storage.rules) → Publish.
5. **Authentication**: Build → Authentication → Get started → Sign-in method → enable **Email/Password**.
   - Users tab → **Add user** → create your admin login (your email + a strong password).
6. Create a `.env` file in the project root (copy `.env.example`) and fill in the values from step 2:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Restart `npm run dev` — now `/admin` lets you sign in and upload products.

## 3. Set up Formspree (contact form)

1. Go to https://formspree.io → sign up free → **New form** (name it e.g. "Shakti Arts Contact"), set your email as the recipient.
2. Copy the form's ID from its endpoint URL: `https://formspree.io/f/<THIS_PART>`.
3. Add it to `.env`:

```
VITE_FORMSPREE_ID=xxxxxxxx
```

## 4. Deploy to GitHub Pages

1. Create a **public** GitHub repo named **`shakti-arts`** (the name matters — the site is built for `https://<username>.github.io/shakti-arts/`).
2. Push this project to it:

```bash
git remote add origin https://github.com/<your-username>/shakti-arts.git
git push -u origin main
```

3. In the repo: **Settings → Secrets and variables → Actions → New repository secret** — add each of the 7 values from your `.env` (same names: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`, `VITE_FORMSPREE_ID`).
4. **Settings → Pages → Build and deployment → Source** = **GitHub Actions**.
5. Push to `main` (or re-run the workflow from the Actions tab). Your site goes live at:

```
https://<your-username>.github.io/shakti-arts/
```

6. Finally, authorize your live domain in Firebase: **Authentication → Settings → Authorized domains → Add domain** → `<your-username>.github.io`.

## 5. Using the admin panel

- Visit `https://<your-username>.github.io/shakti-arts/admin`
- Sign in with the admin user you created in Firebase Authentication
- **Add Product**: name, category, price, optional discount price, sizes, colors, description, one or more images, and a "Hot Deal" toggle
- Products appear on the live site immediately — no redeploy needed
- The sample catalog disappears automatically once you add your first real product

## Notes

- If you rename the repo, update `base` in [`vite.config.js`](vite.config.js) and `basename` in [`src/App.jsx`](src/App.jsx) to match.
- `public/404.html` + a small script in `index.html` handle deep links (GitHub Pages SPA redirect trick) — don't delete them.
