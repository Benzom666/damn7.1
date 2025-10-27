# Deploy Guide (Vercel + Hostinger) — Delivery App

## Required Environment Variables (set in *all* environments)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_URL (if used by server utilities)
- SUPABASE_SERVICE_ROLE_KEY (only if used explicitly in server code)
- NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL (if your auth flow uses it)
- HERE_API_KEY
- SENDGRID_API_KEY
- DELIVERY_FROM_EMAIL (verified sender in SendGrid)
- NEXT_PUBLIC_ENABLE_POD_EMAIL=true
- DEPOT_LAT, DEPOT_LNG, DEPOT_ADDRESS (if your code expects defaults)

## Vercel (simple)
1. **Import project** → Vercel dashboard.
2. Add **Environment Variables** above to **Production**, **Preview**, and **Development**.
3. Click **Deploy**.
4. Test email in prod: `GET /api/test-mail?to=you@example.com`.
5. Verify driver route page loads for a driver with an assigned `driver_id`.

## Hostinger (Node app)
1. Create a **Node.js App** (>=18).
2. Upload this repository or push from Git.
3. Set **Build**: `npm ci && npm run build`
4. Set **Start**: `npm start` (or `node ./.next/standalone/server.js` if using output=standalone)
5. Add all **Environment Variables** in the app's environment config.
6. Make sure the app serves on the assigned port and that Hostinger's reverse proxy points to it.

## Content Security Policy
We add CSP headers in `next.config.mjs` that allow HERE Maps (`js.api.here.com`) and related assets. If you maintain your own CSP elsewhere, merge its directives with ours.

## Troubleshooting
- Driver route 404 → Check Supabase session + `driver_id` assignment; we avoid automatic 404 to surface errors.
- HERE `H` undefined → CSP or network; confirm `mapsjs-ui.css` loads and browser console shows no CSP errors.
- POD email fails in prod → Verify `SENDGRID_API_KEY` and `DELIVERY_FROM_EMAIL` and use `/api/test-mail`.
