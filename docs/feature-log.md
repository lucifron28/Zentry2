# Feature Log

Use this file to record evidence whenever a meaningful feature is scaffolded, updated, or stabilized. Add an entry after implementation work is testable enough to capture a screenshot and a short security note.

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

## Example Entry 1
### Feature: Authentication / Login
**Date:** 2026-04-02
**Purpose:** Provide role-aware account sign-in entry point for Zentry users.
**Pages affected:** Login Page
**API endpoints:** Planned `POST /api/v1/auth/login/`
**Security note:** Authentication flow is in scaffold/planning stage. Avoid claiming full token lifecycle hardening until endpoint behavior is fully implemented and tested.
**Evidence saved:** Planned screenshot placeholder `auth-login-page-initial.png`

## Example Entry 2
### Feature: Projects List Scaffold
**Date:** 2026-04-02
**Purpose:** Prepare the Projects module list page structure for later data integration.
**Pages affected:** Projects Module
**API endpoints:** Planned `GET /api/v1/projects/`
**Security note:** Access and filtering rules are not final. Role-based visibility and object-level checks must be verified before marking as implemented.
**Evidence saved:** Planned screenshot placeholder `projects-list-scaffold.png`
