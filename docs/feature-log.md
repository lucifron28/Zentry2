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
**API endpoints:** Client targets planned `POST /api/v1/auth/login` (backend endpoint lifecycle still in progress)
**Security note:** Access token attachment and session clearing behavior are scaffolded on the client. Refresh-token cookie flow and full backend auth lifecycle are not yet finalized.
**Evidence saved:** `auth-intended-route-restore-after-login.png`

Optional details for stronger exam documentation:
- User flow summary: Attempt protected route while logged out -> redirect to login -> successful login returns to intended route.
- Role(s) tested: Authenticated session context
- Validation or permission behavior observed: Client-side session and route behavior verified.
- Follow-up actions: Add backend login/refresh/logout evidence once endpoints are complete.
