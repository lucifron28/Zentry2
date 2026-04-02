# Zentry Repository Instructions

You are working on **Zentry**, a full-stack web application.

## Project Identity
- Project name: Zentry
- Subtitle: A Team Project Management System
- Purpose: A secure web-based project management system for admins, project managers, and team members.
- Main modules: authentication, dashboard, projects, tasks, comments, attachments, notifications, activity logs.
- Primary goal: build a portfolio-ready and academically defensible system with clear documentation and real security implementation.

## Locked Tech Stack
- Frontend: React + Vite + Tailwind CSS v4 + daisyUI 5
- Backend: Django + Django REST Framework
- Database: PostgreSQL
- Auth: JWT access token + refresh token
- HTTP client: Axios with interceptors
- Server state: TanStack Query v5
- Client auth state: Zustand
- Validation: Zod

## Dependency Rules
- Prefer the latest stable officially documented versions that are compatible with the stack.
- Never use deprecated APIs or outdated setup patterns.
- Do not invent syntax or configuration.
- Verify against official documentation before introducing a new library or pattern.
- Do not use random blogs as the primary source of truth.
- Never use prerelease, beta, alpha, or release candidate packages unless explicitly requested.
- Axios must be pinned to an exact known-good version, not a loose range.

## Architecture Rules
- Follow feature-based organization.
- Keep frontend and backend code modular and maintainable.
- Avoid giant files.
- Reuse components where appropriate.
- Separate presentation, data fetching, and business logic.
- Keep API logic centralized on the frontend.
- Do not mix unrelated concerns into the same file.

## Frontend Rules
- Functional components only.
- Hooks only.
- No class components.
- Use React Router for page navigation.
- Use TanStack Query for server state and mutations.
- Use Zustand only for lightweight auth/session state.
- Use Zod for form validation and schema validation where appropriate.
- Use Axios through a centralized API client, not scattered direct calls.
- Use Axios interceptors for access token attachment and refresh handling.
- Keep UI clean, modern, spacious, and professional.
- Use daisyUI components plus Tailwind utilities for layout and polish.
- Add loading, error, and empty states for data-driven pages.

## Backend Rules
- Use Django REST Framework best practices.
- Validate all write operations server-side.
- Use serializers for validation and transformation.
- Enforce authentication and authorization on the server.
- Use role-based permissions and object-level permission checks where needed.
- Add pagination on list endpoints.
- Keep querysets efficient and properly scoped.
- Keep business logic organized and readable.

## Security Rules
- Do not store refresh tokens in localStorage.
- Refresh token must be handled more securely than plain JS-accessible storage.
- Access token should be kept in memory-oriented client state.
- Do not trust frontend role checks.
- Enforce permissions on the backend for every protected action.
- Validate file uploads by type and size.
- Use environment variables for secrets.
- Never hardcode secrets or credentials.
- Log sensitive actions such as login, project creation, task assignment, status updates, file uploads, and role changes.

## Roles
- Admin
- Project Manager
- Team Member

## Design Direction
- Calm SaaS look
- Professional, modern, clean
- Good spacing and visual hierarchy
- Portfolio-ready quality
- Avoid childish design
- Avoid overly noisy gradients or gimmicks unless explicitly requested

## Documentation Rules
- Every meaningful feature should be easy to document later in the system manual.
- Prefer screens and workflows that are easy to explain with numbered UI parts.
- Keep naming clear and academic-friendly.
- When generating a feature, think about what screenshots and explanations will be needed later.

## Output Style
- Prefer complete but focused implementations.
- Do not over-engineer.
- Do not generate placeholder security claims without implementing them.
- Explain tradeoffs briefly when relevant.
- When uncertain about compatibility, say so clearly and suggest the safest supported option.

## Current Scaffold Status
- Local Docker Compose development is available for client, server, and postgres.
- Frontend styling foundation is already configured with Tailwind CSS v4 and daisyUI 5.
- Approved daisyUI themes are already registered.
- Public and protected layouts are already scaffolded.
- App shell with sidebar, topbar, and reusable loading/error/empty states already exists.
- Frontend auth session handling and intended-route redirect restoration are already scaffolded.
- Backend authentication endpoints are the next major implementation target.