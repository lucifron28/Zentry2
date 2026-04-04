# Zentry
## A Team Project Management System

## Project Overview
Zentry is a web-based team project management system designed for academic and portfolio use. It is being built with a documentation-first approach so that implementation progress and system evidence can be reused directly in the semi-final exam document.

## Purpose and Target Users
Purpose:
- Provide a structured environment for planning, assigning, tracking, and reviewing project work.
- Support secure and role-aware workflows for team collaboration.

Target users:
- Admin
- Project Manager
- Team Member

## Locked Technology Stack
Frontend:
- React
- Vite
- Tailwind CSS v4
- daisyUI 5
- React Router
- Axios
- TanStack Query v5
- Zustand
- Zod

Backend:
- Django
- Django REST Framework
- PostgreSQL
- Simple JWT

## Locked Roles
- Admin
- Project Manager
- Team Member

## Locked Modules
- Authentication
- Dashboard
- Projects
- Tasks
- Comments
- Attachments
- Notifications
- Activity Logs
- User Management

## Locked Entities
- User
- Project
- ProjectMember
- Task
- TaskComment
- TaskAttachment
- Notification
- ActivityLog

## High-Level Repository Structure
```text
zentry2/
├── client/   # Frontend application (React + Vite)
├── server/   # Backend application (Django + DRF)
├── docs/     # Documentation scaffold and evidence planning
└── README.md
```

## Current Development Status
Current status summary:
- The repository is now well-scaffolded for development and documentation tracking.
- Frontend shell and navigation structure are implemented, with placeholder module pages for staged feature rollout.
- Backend authentication foundation is implemented, while core business module behavior is still in progress.

Implemented auth and scaffold highlights:
- Local Docker Compose development stack for client, server, and postgres.
- Frontend styling foundation with Tailwind CSS v4 and daisyUI 5.
- Approved daisyUI theme registration with configured default/preferred-dark behavior.
- Public and protected layout separation.
- App shell foundation with sidebar, topbar, and reusable loading/error/empty states.
- Backend custom user model with explicit roles: Admin, Project Manager, Team Member.
- Backend authentication endpoints are live under `/api/v1/auth/`:
	- `POST /auth/login/`
	- `POST /auth/refresh/`
	- `POST /auth/logout/`
	- `GET /auth/me/`
- Frontend auth session state keeps the access token in memory-oriented state only.
- Refresh token is handled by the backend in an HttpOnly cookie and is not stored in frontend app state.
- Browser reload session restoration runs through refresh bootstrap (`/auth/refresh/`) before current-user hydration.
- Frontend current-user hydration is active via `/auth/me/` during app bootstrap when needed.
- Unauthorized current-user hydration clears invalid session state to avoid half-authenticated UI.
- Logout clears frontend session state and clears the refresh cookie server-side.

In-progress areas:
- Refresh token revocation hardening beyond cookie clearing (for example blacklist-based invalidation).
- Module-specific CRUD APIs and object-level authorization behavior.
- Finalized audit logging integration across all protected actions.
- Production deployment and hardening controls.

Auth security note:
- Moving refresh token storage to an HttpOnly cookie reduces direct JavaScript access to that token, but it does not eliminate XSS risk.

## Setup (Local Development)
These instructions are for local development. Production deployment guidance is intentionally out of scope at this stage.

### Prerequisites
- Node.js LTS and npm
- Python 3.12+ (or project-approved version)
- Docker and Docker Compose plugin (recommended path)

### Recommended: Docker Compose (Dev Only)
1. Copy `server/.env.example` to `server/.env`.
2. Set local development values, including:
	- `DJANGO_SECRET_KEY`
	- `POSTGRES_DB`
	- `POSTGRES_USER`
	- `POSTGRES_PASSWORD`
3. From the repository root, run:
	- `docker compose --env-file server/.env up --build`
4. Open:
	- Frontend: `http://localhost:5173`
	- Backend API base: `http://localhost:8000/api/v1`

Stop containers:
1. `docker compose down`
2. Optional full reset including DB volume: `docker compose down -v`

### Optional: Manual Service Startup
Frontend:
1. `cd client`
2. `npm install`
3. Ensure `VITE_API_BASE_URL` points to `http://localhost:8000/api/v1`
4. `npm run dev`

Backend:
1. `cd server`
2. Create and activate a virtual environment.
3. `pip install -r requirements.txt`
4. Copy `.env.example` to `.env` and set local values.
5. `python manage.py migrate`
6. `python manage.py runserver`

## Documentation Workflow
1. Implement or scaffold one focused feature step.
2. Capture a screenshot of the affected page or flow.
3. Record a short implementation note.
4. Record a short security note.
5. Log evidence in docs/feature-log.md.
6. Update manual and cybersecurity sections if behavior or safeguards changed.

Recommended per-feature evidence items:
- Screenshot
- Purpose and user flow
- Affected pages or modules
- API endpoints involved
- Security note
- Evidence location or filename

## Semi-Final Exam Alignment
This repository is structured to support direct writing of:
1. Title Page
2. Table of Contents
3. 1.0 Manual of the System
4. 2.0 Cybersecurity Cube

Documentation files in docs/ are written with academic-friendly headings, numbered sections, and reusable templates for figures, labeled UI parts, and concise explanations.

## Scope Note for Early Commits
Current and early commits prioritize architecture, scaffold quality, and documentation traceability. They do not imply that all modules are fully implemented, security-complete, or production-ready.

## Local Docker Compose Development
This setup is for local development only. It is not production-ready.

Included services:
- client (React + Vite dev server)
- server (Django development server)
- postgres (PostgreSQL database)

Basic startup:
1. Copy `server/.env.example` to `server/.env` and set local secret values.
2. From the repository root, run `docker compose --env-file server/.env up --build`.
3. Open the frontend at `http://localhost:5173`.
4. Backend API is available at `http://localhost:8000/api/v1`.

Stop containers:
1. Run `docker compose down`.
2. To remove database volume data as well, run `docker compose down -v`.

Frontend browser API URL note:
- Use `http://localhost:8000/api/v1` for browser calls.
- Do not use Docker service names like `server` in browser-facing frontend API URLs.
