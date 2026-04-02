# Zentry Architecture Overview

## System Purpose
Zentry is a role-aware team project management system built to support practical development and semi-final exam documentation. The architecture is designed to stay modular, secure, and easy to explain with evidence.

## Frontend and Backend Split
Frontend scope:
- User interface and page navigation
- Form handling and client-side validation support
- API request initiation through centralized HTTP client
- Session-oriented UI behavior

Backend scope:
- Business logic and data validation
- Authentication and authorization enforcement
- Role-aware and object-level access decisions
- Audit-oriented action tracking and API response shaping

## Feature-Based Organization
The repository follows feature-based grouping so each module can be developed and documented independently:
- Authentication
- Dashboard
- Projects
- Tasks
- Comments
- Attachments
- Notifications
- Activity Logs
- User Management

## Major Frontend Responsibilities
- Render role-relevant pages and module views
- Manage server state requests with predictable loading/error/empty handling
- Keep API access centralized and consistent
- Keep lightweight session/auth state on the client side
- Provide reusable UI patterns for forms, tables, and detail views

## Major Backend Responsibilities
- Validate all write operations server-side
- Define and enforce permission boundaries per endpoint
- Keep querysets scoped to authorized data
- Apply pagination for list endpoints
- Log meaningful actions for accountability and evidence

## High-Level Data Flow
1. User interacts with frontend page controls.
2. Frontend sends request to backend API through centralized client.
3. Backend validates input, checks permissions, and processes request.
4. Backend returns structured response or validation/authorization errors.
5. Frontend updates interface state and presents results.
6. Relevant actions are prepared for Activity Log evidence capture.

## Role-Aware Access Model
- Admin: system-wide oversight and high-level management actions
- Project Manager: project planning, assignment, and team coordination actions
- Team Member: task execution, collaboration, and status updates within authorized scope

Server-side checks are the source of truth for authorization. Frontend role handling is only for user experience guidance.

## Documentation-Readiness Considerations
- Each module should produce screenshot-ready pages with clear UI labels.
- Each feature change should be logged with purpose, affected pages, API planning, and security note.
- Security documentation should distinguish implemented, in progress, and planned controls.
- Naming and section numbering should stay consistent with the semi-final structure.
