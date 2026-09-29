# Basa Vara API and domain contract

This document records the contract for the future authoritative backend and the HTTP routes used by the Vue service layer. It is based on DB-001's domain summary supplied for BE-001; no database schema is asserted here. The current repository is a Vue/Vite client and does not implement a production backend.

## Client integration

- `VITE_USE_MOCK` defaults to mock mode. Only the literal string `false` selects HTTP services. Mock mode continues to use `src/mocks/db.js`.
- `VITE_API_BASE_URL` is the API origin/prefix. Service methods call `request()` in `src/services/apiClient.js` when mock mode is disabled.
- Protected requests use the bearer token from `basavara.session` (or an explicit token for session lookup). The client never treats a supplied user/role identifier as authorization.
- JSON responses are returned as-is; `204` or non-JSON successful responses resolve to `null`. Failed responses become `ApiError(status, message, details)`.
- HTTP bodies should use JSON except uploads, which may use `FormData`. The API must enforce validation and authorization regardless of client validation.
- Authenticated identity is derived from the session/token on the server. IDs accepted in current mock method signatures exist for mock scoping only and must not be sent as authority in HTTP payloads.

## Security invariants

The server must not trust client-provided `userId`, `landlordId`, `tenantId`, `adminId`, role, wallet balance, payment success/amount, ownership, moderation state, verification state, or contact-unlock author. Derive identity and role from the authenticated session; derive prices, balances, ownership, and state transitions from persisted server records. Enforce object-level authorization on every read and write, including nested conversation messages and landlord contact data.

Wallet changes use an immutable ledger and a server-maintained balance projection. Payment and refund operations require idempotency keys and server-side provider confirmation. Contact unlock must check a unique user/property entitlement, debit the wallet, and create the entitlement atomically. Webhook/event processing must be authenticated and idempotent. Admin actions require admin authorization and append audit records. Never return protected landlord contact details until the server verifies entitlement (and any applicable ownership/role restrictions).

## Domain ownership

The backend is authoritative for:

- **Auth and users:** roles, sessions, password recovery, verification, and account status.
- **Properties:** ownership, CRUD, images, amenities, lifecycle, moderation, approval/rejection, and expiry.
- **Wallet and payments:** wallet, immutable ledger, projected balance, history, payment/refund status, provider references, idempotency, confirmation, and event/webhook processing.
- **Contact unlock:** unique entitlement, atomic debit, authorization, and protected contact details.
- **Chat and notifications:** conversation participants, messages, blocked users, authorization, read state, user notifications, and admin broadcast authorization.
- **Admin:** moderation, users, properties, reports, payments/refunds, platform settings, and audit logs.
- **Applications and leases:** tenant applications and lifecycle; lease and property/tenant/landlord relationships and lifecycle.

## HTTP route catalogue

All routes are relative to `VITE_API_BASE_URL`. This catalogue standardizes the paths already used or needed by the frontend services; it does not claim a backend exists yet. Use the authenticated principal for ownership and actor identity. Request/response schemas should retain the existing UI-facing fields where practical and use stable IDs, ISO-8601 timestamps, and explicit lifecycle/status values.

| Area | Method and route | Contract notes |
| --- | --- | --- |
| Auth | `POST /auth/register`, `POST /auth/login` | Registration accepts profile credentials and requested tenant/landlord role; server controls allowed roles and creates session. |
| Auth | `POST /auth/forgot-password`, `POST /auth/verify-otp`, `POST /auth/reset-password`, `GET /auth/me` | Recovery responses must not disclose account existence. `/auth/me` requires bearer auth. |
| Profile | `PUT /me`, `POST /me/password`, `DELETE /me` | Operate only on authenticated account. |
| Profile | `GET /me/blocked`, `DELETE /me/blocked/{userId}` | List/remove blocks belonging to authenticated account. |
| Properties | `GET /properties`, `GET /properties/{id}`, `POST /properties`, `PUT /properties/{id}`, `DELETE /properties/{id}` | Search supports filters and pagination. Writes enforce ownership; moderation/verification fields are server-controlled. |
| Properties | `GET /properties/recommended`, `GET /properties/recently-viewed`, `GET /landlord/properties`, `GET /properties/{id}/analytics` | Recommended/recent/landlord scopes come from authenticated account. Analytics require owner/admin authorization. |
| Saved properties | `GET /saved`, `POST /saved` with `{propertyId}`, `DELETE /saved/{propertyId}` | Scope is authenticated user. |
| Wallet | `GET /wallet`, `GET /wallet/transactions`, `GET /wallet/unlocks` | Scope is authenticated user; balance is a server projection. |
| Payments | `POST /payments` with `{packageId, method, idempotencyKey}`, `GET /payments/{id}`, `POST /payments/{id}/verify`, `POST /payments/{id}/cancel` | Amount/coins come from server package configuration. Verification must rely on trusted provider state, never the browser. |
| Contact unlock | `GET /contacts/preview/{propertyId}`, `POST /contacts/unlock` with `{propertyId, idempotencyKey}`, `GET /contacts/unlocked/{propertyId}` | Unlock debit and entitlement are atomic and idempotent. Return contact fields only after authorization. |
| Chat | `GET /chat/conversations`, `POST /chat/conversations` with `{landlordId, propertyId}`, `GET /chat/conversations/{id}`, `GET /chat/conversations/{id}/messages`, `POST /chat/conversations/{id}/messages`, `POST /chat/conversations/{id}/read`, `POST /chat/conversations/{id}/block`, `POST /chat/conversations/{id}/reports` | Server validates participants, derives sender from auth, and enforces block/read state. Client-supplied sender identity is ignored. |
| Notifications | `GET /notifications`, `POST /notifications/{id}/read`, `POST /notifications/read-all` | User scope comes from auth. |
| Admin | `GET /admin/overview`, `/admin/users`, `/admin/users/{id}`, `/admin/properties`, `/admin/reports`, `/admin/payments`, `/admin/coin-transactions`, `/admin/analytics`, `/admin/settings`, `/admin/logs` | Admin authorization for every route; filtering/pagination may be query parameters. |
| Admin writes | `PATCH /admin/users/{id}`, `PATCH /admin/properties/{id}/moderation`, `PATCH /admin/reports/{id}`, `POST /admin/payments/{id}/refund`, `PUT /admin/settings`, `POST /admin/notifications` | Actor comes from auth; state changes are validated and audited. Refunds require idempotency. |
| Applications | `GET /applications`, `POST /applications`, `GET /applications/{id}`, `PATCH /applications/{id}` | Tenant and property ownership scopes are enforced; lifecycle transitions are validated. |
| Leases | `GET /leases`, `POST /leases`, `GET /leases/{id}`, `PATCH /leases/{id}` | Only authorized landlord/tenant participants and admins may access or change a lease. |
| Provider events | `POST /webhooks/payments/{provider}` | Server-to-server signature verification, replay protection, and idempotent event handling. |

## Response and error conventions

Successful list endpoints should return `{ items, total, page, pageSize }` when paginated. Existing unpaginated screens may consume arrays during the transition. Error responses should use `{ message, code?, details? }` with appropriate HTTP status (`400` malformed input, `401` unauthenticated, `403` unauthorized, `404` missing/inaccessible resource, `409` state/idempotency conflict, `422` validation, `429` rate-limited). Avoid returning secrets, provider credentials, or another user's private data in details.

## Current frontend gaps

Several legacy service methods still run mock-only even with `VITE_USE_MOCK=false`. They must be given HTTP branches before a production backend can support the corresponding screens. This contract marks the intended routes; it does not imply those endpoints are live.
