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
Current status:
- Frontend and backend base scaffolding is in progress.
- Documentation scaffold is being established first to support implementation tracking.
- Feature behavior should be treated as planned or in progress unless explicitly verified.

## Setup (Draft Placeholders)
These placeholders will be replaced by finalized commands after environment and workflow decisions are validated.

### Prerequisites
- Node.js LTS and npm
- Python 3.12+ (or project-approved version)
- PostgreSQL

### Frontend Setup Placeholder
1. Navigate to client directory.
2. Install dependencies.
3. Run development server.

### Backend Setup Placeholder
1. Navigate to server directory.
2. Create and activate virtual environment.
3. Install dependencies.
4. Configure environment variables.
5. Run migrations.
6. Start development server.

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
Early commits prioritize structure and documentation readiness. They do not imply that all modules are fully implemented, tested, or production-ready.

## Local Docker Compose Development
This setup is for local development only. It is not production-ready.

Included services:
- client (React + Vite dev server)
- server (Django development server)
- postgres (PostgreSQL database)

Basic startup:
1. Copy `server/.env.example` to `server/.env` and set local secret values.
2. From the repository root, run `docker compose --env-file server/.env up --build`.
2. Open the frontend at `http://localhost:5173`.
3. Backend API is available at `http://localhost:8000/api/v1`.

Stop containers:
1. Run `docker compose down`.
2. To remove database volume data as well, run `docker compose down -v`.

Frontend browser API URL note:
- Use `http://localhost:8000/api/v1` for browser calls.
- Do not use Docker service names like `server` in browser-facing frontend API URLs.
