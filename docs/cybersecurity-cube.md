# 2.0 Cybersecurity Cube

This section is a structured draft for Zentry cybersecurity documentation. Use the status markers below to avoid overclaiming:
- Implemented: verified in current code and behavior
- In Progress: partially implemented or currently under development
- Planned: approved design target not yet implemented

## 2.1 Security Principles

### 2.1.1 Data Confidentiality
Zentry-specific guidance:
- Implemented:
  - Backend custom user model includes explicit role values for Admin, Project Manager, and Team Member.
  - Backend auth endpoints exist for login, refresh, logout, and current-user retrieval.
  - Refresh token is handled through an HttpOnly cookie, reducing direct JavaScript access.
  - Logout clears the refresh cookie server-side.
  - Frontend route guards separate public and protected layouts.
  - Frontend auth session state controls access to protected shell routes.
  - Client request interceptor attaches Bearer access token when available.
- In Progress:
  - Refresh-token revocation hardening beyond cookie clearing (for example blacklist-based invalidation).
  - Module-level and object-level backend authorization wiring is ongoing.
- Planned:
  - Finalized authorization matrices per module and role.
  - Attachment-level confidentiality controls after upload pipeline completion.
- Evidence to capture:
  - Screenshot of restricted page behavior for unauthorized user
  - API response example for denied access

### 2.1.2 Data Integrity
Zentry-specific guidance:
- Implemented:
  - Frontend login input validation scaffold is present.
  - Centralized API client and interceptor layer is in place for consistent request handling.
- In Progress:
  - Serializer-level and business-rule validation is being added per backend module.
  - State-change traceability across domain actions is not yet complete.
- Planned:
  - Full integrity checks for high-impact operations (status changes, assignments, role updates).
  - Cross-module consistency checks between Projects, Tasks, and Activity Logs.
- Evidence to capture:
  - Validation error response sample
  - Activity Log sample showing state-change traceability

### 2.1.3 Data Availability
Zentry-specific guidance:
- Implemented:
  - Local Docker Compose startup is available for client, server, and postgres.
  - Reusable loading, error, and empty UI states are scaffolded for frontend reliability messaging.
- In Progress:
  - Module endpoint implementation and resilience behavior are in progress.
- Planned:
  - Production deployment reliability, backup, and recovery playbooks.
- Evidence to capture:
  - Successful endpoint health checks
  - Controlled error handling screenshots

## 2.2 Data States

### 2.2.1 Data In Transit
Zentry-specific guidance:
- Implemented:
  - Access token attachment via frontend Axios interceptor is configured.
  - API base URL is environment-driven on the frontend.
  - Authenticated login and refresh endpoint exchange is implemented in backend and consumed by frontend.
  - Access token is stored in memory-oriented frontend session state only.
  - Refresh token is stored in an HttpOnly cookie and is not managed in frontend app state.
  - Browser reload restoration is implemented through refresh bootstrap via `/auth/refresh/`.
  - 401 retry flow uses `/auth/refresh/` before replaying the original protected request.
  - Current-user hydration via `/auth/me/` is implemented for active in-memory sessions.
  - Unauthorized current-user hydration clears invalid session state.
- In Progress:
  - Blacklist/revocation hardening after refresh rotation is not fully enabled yet.
- Planned:
  - Deployment-grade transport policies and enforcement checks.
- Security honesty note:
  - HttpOnly refresh-cookie handling reduces JavaScript access to refresh tokens but does not eliminate XSS risk.
- Evidence to capture:
  - API request example showing authenticated route usage
  - Route-level permission response examples

### 2.2.2 Data at Rest
Zentry-specific guidance:
- Implemented:
  - Local development persistence is available through postgres service in Docker Compose.
  - Environment-based database configuration scaffolding is present.
- In Progress:
  - Full domain model persistence and module-level migrations are in progress.
- Planned:
  - Backup retention and restoration policy for deployment environments.
  - Storage security controls for sensitive and uploaded content.
- Evidence to capture:
  - Model-to-database mapping references
  - Migration history snapshots

### 2.2.3 Data In Process
Zentry-specific guidance:
- Implemented:
  - Frontend protected route checks and intended-route redirect restoration are active.
  - Active-session identity confirmation runs through current-user hydration when required.
- In Progress:
  - Server-side permission evaluation for module actions is being expanded.
  - Role-aware and object-level checks are not yet complete across all endpoints.
- Planned:
  - Additional monitoring and alerting for high-risk operations.
- Evidence to capture:
  - Controller/view execution examples
  - Permission decision examples by role

## 2.3 Safeguards

### 2.3.1 Technology
Zentry-specific guidance:
- Implemented:
  - Django, DRF, SimpleJWT, and centralized frontend Axios client integration are in place.
  - Backend auth endpoints (`/auth/login/`, `/auth/refresh/`, `/auth/logout/`, `/auth/me/`) are implemented.
  - Frontend route guarding, request token attachment, refresh bootstrap/retry, and current-user hydration are implemented for active sessions.
- In Progress:
  - Endpoint-level permission and validation wiring by module.
  - Token revocation/blacklist hardening beyond current rotation baseline.
  - Audit logging integration across feature actions.
- Planned:
  - Production-grade hardening controls and security verification automation.
- Evidence to capture:
  - Config snippets (sanitized)
  - Endpoint protection test outputs

### 2.3.2 Policy and Practices
Zentry-specific guidance:
- Implemented:
  - Documentation-first workflow with feature-log and manual/cybersecurity draft structure is established.
  - Repository instruction files enforce terminology and conservative documentation practices.
- In Progress:
  - Security review checkpoints are being aligned to module delivery milestones.
- Planned:
  - Formal release checklist and incident handling practices for deployment stage.
- Evidence to capture:
  - Feature log entries
  - Pull request or checklist references

### 2.3.3 People
Zentry-specific guidance:
- Implemented:
  - Role definitions are documented: Admin, Project Manager, Team Member.
- In Progress:
  - Role-specific workflow validation is pending module-level implementation.
- Planned:
  - User onboarding/training and role-governance procedures for production context.
- Evidence to capture:
  - Role-based access screenshots
  - Role assignment/change evidence entries

## Notes for Documentation Safety
- Use only verified implementation evidence for Implemented items.
- Move items from Planned to In Progress to Implemented only when code and behavior are testable.
- Do not claim encryption, hardening, or protection controls unless they are truly in place.
