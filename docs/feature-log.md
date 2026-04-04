# Feature Log

Use this file as a living record of implementation evidence. Add one entry whenever a meaningful scaffold, behavior, or stabilization milestone is reached and can be demonstrated.

Status note:
- Entries below were backfilled on 2026-04-02 using verified repository state.
- When exact original implementation dates are not available, use the backfill date and keep the note explicit.

## Master Template (Blank)
### Feature:
**Date:**
**Purpose:**
**Pages affected:**
**API endpoints:**
**Security note:**
**Evidence saved:**

Optional details for stronger exam documentation:
- User flow summary:
- Role(s) tested:
- Validation or permission behavior observed:
- Follow-up actions:

## Entry 1
### Feature: Local Docker Compose Development Scaffold
**Date:** 2026-04-02 (backfilled)
**Purpose:** Provide a repeatable local full-stack startup path for client, server, and postgres.
**Pages affected:** System-wide local development workflow
**API endpoints:** Not endpoint-specific (infrastructure scaffold)
**Security note:** Development-only setup. Environment values are externalized, but this does not represent production hardening or secret-management completion.
**Evidence saved:** `dev-docker-compose-services-running.png`

Optional details for stronger exam documentation:
- User flow summary: Developer starts all local services using one compose command and verifies browser/API access.
- Role(s) tested: N/A
- Validation or permission behavior observed: N/A
- Follow-up actions: Document production deployment controls separately.

## Entry 2
### Feature: Frontend Styling Foundation (Tailwind v4 + daisyUI 5)
**Date:** 2026-04-02 (backfilled)
**Purpose:** Establish a consistent frontend design baseline for module implementation.
**Pages affected:** Global frontend styles and all routed pages
**API endpoints:** Not endpoint-specific
**Security note:** UI framework setup does not imply backend security completion.
**Evidence saved:** `frontend-style-foundation-tailwind-daisy.png`

Optional details for stronger exam documentation:
- User flow summary: User loads app shell pages with consistent typography, spacing, and component styling.
- Role(s) tested: Admin, Project Manager, Team Member (layout-level only)
- Validation or permission behavior observed: None at this layer.
- Follow-up actions: Add per-module UI evidence after real feature screens exist.

## Entry 3
### Feature: Approved daisyUI Theme Registration
**Date:** 2026-04-02 (backfilled)
**Purpose:** Register approved themes for controlled and predictable visual behavior during development.
**Pages affected:** Global frontend theme behavior
**API endpoints:** Not endpoint-specific
**Security note:** Theme configuration has no direct authorization effect; avoid security overclaims.
**Evidence saved:** `frontend-approved-theme-registration.png`

Optional details for stronger exam documentation:
- User flow summary: App loads with configured default and preferred-dark theme behavior.
- Role(s) tested: N/A
- Validation or permission behavior observed: N/A
- Follow-up actions: Capture side-by-side theme screenshots for manual appendix.

## Entry 4
### Feature: Application Shell and Public/Protected Layout Foundation
**Date:** 2026-04-02 (backfilled)
**Purpose:** Separate public and protected routes and provide a reusable shell with sidebar/topbar for module pages.
**Pages affected:** Login Page, Dashboard placeholder, module placeholder pages
**API endpoints:** Planned module endpoints; not yet finalized for all sections
**Security note:** Route-guard behavior is scaffolded on the frontend. Backend endpoint authorization remains in progress and must be enforced server-side.
**Evidence saved:** `app-shell-sidebar-topbar-protected-layout.png`

Optional details for stronger exam documentation:
- User flow summary: Unauthenticated users are directed to login; authenticated users can access shell-routed placeholders.
- Role(s) tested: Any authenticated session context
- Validation or permission behavior observed: Frontend guard checks only.
- Follow-up actions: Add backend authorization evidence after endpoint implementation.

## Entry 5
### Feature: Frontend Auth Session and Redirect Restoration Flow
**Date:** 2026-04-02 (backfilled)
**Purpose:** Preserve intended protected path and return user to the intended target after successful login.
**Pages affected:** Login Page, protected route handling, root redirect behavior
**API endpoints:** `POST /api/v1/auth/login/` (consumed by frontend login flow)
**Security note:** Access token attachment and session clearing behavior are implemented on the client. Refresh token handling is implemented through an HttpOnly cookie, and refresh retry/bootstrapping now use `/api/v1/auth/refresh/` without storing a refresh token in frontend app state.
**Evidence saved:** `auth-intended-route-restore-after-login.png`

Optional details for stronger exam documentation:
- User flow summary: Attempt protected route while logged out -> redirect to login -> successful login returns to intended route.
- Role(s) tested: Authenticated session context
- Validation or permission behavior observed: Client-side session and route behavior verified.
- Follow-up actions: Expand auth hardening evidence for refresh-token revocation controls beyond cookie clearing.

## Entry 6
### Feature: Backend Auth Foundation and Role-Aware User Model
**Date:** 2026-04-02 (backfilled)
**Purpose:** Establish real backend authentication baseline and role-aware user identity model for Zentry.
**Pages affected:** Authentication API layer, backend users domain foundation, admin user management
**API endpoints:** `POST /api/v1/auth/login/`, `POST /api/v1/auth/refresh/`, `POST /api/v1/auth/logout/`, `GET /api/v1/auth/me/`
**Security note:** Token-based auth endpoints, HttpOnly refresh-cookie handling, and server-side refresh-cookie clearing on logout are implemented. Refresh rotation is enabled, while blacklist/revocation hardening and full module-level authorization remain in progress.
**Evidence saved:** `backend-auth-foundation-role-user-model.png`

Optional details for stronger exam documentation:
- User flow summary: Valid credentials return access token and safe user payload, while refresh token is issued via HttpOnly cookie.
- Role(s) tested: Admin, Project Manager, Team Member (model-level role values)
- Validation or permission behavior observed: Authenticated `/auth/me/` required and protected.
- Follow-up actions: Add blacklist-based revocation hardening notes after implementation.

## Entry 7
### Feature: Frontend Auth Integration With Backend Auth Response Contract
**Date:** 2026-04-02 (backfilled)
**Purpose:** Align frontend auth API/types/store with backend login response (`access`, `user`) and cookie-based refresh handling.
**Pages affected:** Login Page, protected layout session display, auth state handling
**API endpoints:** `POST /api/v1/auth/login/`, `POST /api/v1/auth/refresh/`, `GET /api/v1/auth/me/`
**Security note:** Session identity now uses backend user data as source of truth. No localStorage token persistence was introduced. Frontend state remains memory-oriented for access token only, and refresh token is handled in an HttpOnly cookie.
**Evidence saved:** `frontend-auth-response-contract-integration.png`

Optional details for stronger exam documentation:
- User flow summary: Login stores backend-returned user identity and updates shell session display.
- Role(s) tested: Authenticated session context
- Validation or permission behavior observed: Unauthorized API responses clear session state.
- Follow-up actions: Add startup bootstrap verification screenshots.

## Entry 8
### Feature: Frontend Auth Bootstrap and Current-User Hydration Flow
**Date:** 2026-04-02 (backfilled)
**Purpose:** Confirm active-session user identity through `/auth/me/` when token exists but user data is missing.
**Pages affected:** App provider bootstrap layer, protected shell identity display
**API endpoints:** `POST /api/v1/auth/refresh/`, `GET /api/v1/auth/me/`
**Security note:** Access token remains memory-oriented, and browser reload restoration is implemented through refresh bootstrap using the HttpOnly refresh cookie. This reduces direct JavaScript access to the refresh token but does not eliminate XSS risk. Blacklist/revocation hardening remains limited.
**Evidence saved:** `frontend-auth-bootstrap-current-user-hydration.png`

Optional details for stronger exam documentation:
- User flow summary: App bootstrap triggers `/auth/me/` only when hydration is needed; unauthorized result clears session.
- Role(s) tested: Authenticated and expired-session scenarios
- Validation or permission behavior observed: Hydration failures avoid half-authenticated UI state.
- Follow-up actions: Add revocation-hardening and token-blacklist behavior after implementation.

## Entry 9
### Feature: Project Detail and Dashboard Real-Data Integration
**Date:** 2026-04-04
**Purpose:** Replaced hallucinatory/mock content across the Dashboard and Project modules with real backend-driven queries and honest empty/in-progress states.
**Pages affected:** Dashboard Page, Projects Page, Project Detail Page
**API endpoints:** `GET /api/v1/projects/`, `GET /api/v1/tasks/`
**Security note:** UI components now cleanly reflect what is backed by current endpoints. No module-level authorization logic was bypassed to fake data.
**Evidence saved:** `dashboard-and-projects-realism-cleanup.png`

Optional details for stronger exam documentation:
- User flow summary: Users now see actual focus tasks, real progress insights, and authentic member lists, with explicitly labeled placeholder areas for undeveloped modules like activity feeds and milestones.
- Role(s) tested: Authenticated session context
- Validation or permission behavior observed: Components cleanly render empty states when arrays are authentically empty in backend responses.
- Follow-up actions: Start building the API backing for Milestones and Activity Logs.

## Entry 10
### Feature: Project-Scoped Tasks Module Implementation
**Date:** 2026-04-04
**Purpose:** Implement functional task management within the Project scope, honoring existing backend business rules and strict role-based mutations.
**Pages affected:** Project Detail Page, Dashboard Page
**API endpoints:** `GET /api/v1/tasks/`, `POST /api/v1/tasks/`, `PATCH /api/v1/tasks/{id}/`
**Security note:** strict role-based access is enforced server-side. Creation and editing and assignment are inherently limited to `Admin` and `Project Manager` roles. `Team Member` access acts as read-only according to the backend constraints. Dashboard naturally honors assignment isolation.
**Evidence saved:** `project-tasks-slice-implementation.png`

Optional details for stronger exam documentation:
- User flow summary: Users browse a project's tasks inline, create new tasks using the validated form modal, and update assignments, due dates, statuses accurately. Changes instantly reflect on the personalized dashboard focus card.
- Role(s) tested: Project Manager (mutations), Team Member (read-only)
- Validation or permission behavior observed: Server-side rejections properly map back to the Zod-backed user form fields, preventing unauthorized modifications from Team Members.
- Follow-up actions: Finalize remaining activity feeds.

## Entry 11
### Feature: Global Tasks Route and Full Tasks Slice Wiring
**Date:** 2026-04-04
**Purpose:** Replace the scaffold placeholder at the `/tasks` route with the real TasksPage and confirm the complete frontend Tasks slice is wired end-to-end (global view, project-scoped view, create/edit flow).
**Pages affected:** Tasks Page (`/tasks`), Project Detail Page
**API endpoints:** `GET /api/v1/tasks/`, `POST /api/v1/tasks/`, `PATCH /api/v1/tasks/{id}/`
**Security note:** Task mutation endpoints enforce role-based access server-side. `Admin` and `Project Manager` roles may create and update tasks; `Team Member` access is strictly read-only by backend constraint. The global Tasks page is intentionally read-only on the frontend as well — task creation and editing are scoped to the Project Detail context to maintain correct project assignment boundaries.
**Evidence saved:** `tasks-route-wired-global-page.png`

Optional details for stronger exam documentation:
- User flow summary: Authenticated users navigate to `/tasks` and see a filterable table of all tasks in their accessible projects. Clicking a row opens a read-only detail modal. Project Managers and Admins navigate to a project detail page and can create or edit tasks via validated modals there.
- Role(s) tested: Admin and Project Manager (mutations via Project Detail), Team Member (read-only in both views)
- Validation or permission behavior observed: New Task and Edit controls are absent for Team Members; backend returns HTTP 403 if a Team Member attempts a mutation directly.
- Follow-up actions: Document screenshot evidence for Tasks section; add milestone and activity log backend support when ready.
