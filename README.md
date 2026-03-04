# Slooze Commodities Management - Frontend Challenge

This submission implements the requested feature flow with Next.js, TypeScript, Tailwind CSS, and Apollo Client wiring.

## Implemented Scope

- Authentication with email/password login flow.
- Role-based access control for routes:
  - Manager: dashboard + products
  - Store Keeper: products only
- Dashboard view (manager only) with inventory stats.
- Products view (manager + store keeper):
  - list products
  - add product
  - edit product
- Light/Dark mode toggle persisted in `localStorage`.
- Front-end role-based menu restriction.
- Router guard middleware to block unauthorized navigation.

## Project Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Sample Credentials

- Manager: `manager@slooze.com` / `Manager@123`
- Store Keeper: `store@slooze.com` / `Store@123`

## Assumptions / Affixed Sample Data

- No live backend is bundled for the challenge runtime, so mock API routes are included in `app/api/*` to make the app fully runnable.
- Session is stored in a cookie (`slooze_session`) for middleware-based route protection.
- Sample product/user data is defined in:
  - `lib/sample-data.ts`
- Product create/edit persists in in-memory server store for local runtime demonstration (`lib/mock-store.ts`).
- Apollo Client is initialized via provider; GraphQL endpoint can be integrated via `NEXT_PUBLIC_GRAPHQL_URL`.

## Notes

- API methods implemented for demonstration:
  - `POST /api/auth/login`
  - `GET /api/products`
  - `POST /api/products`
  - `PUT /api/products/:id`
- If needed, replacing these endpoints with NestJS backend endpoints only requires updating `NEXT_PUBLIC_API_BASE_URL` and response models.
