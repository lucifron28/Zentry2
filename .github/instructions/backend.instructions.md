---
applyTo: "server/**/*.py"
---

# Backend Instructions

- Use Django and Django REST Framework best practices.
- Prefer modular apps: users, projects, tasks, comments, attachments, notifications, audit_logs.
- Use serializers for validation and transformation.
- Enforce authentication and permissions on every protected endpoint.
- Do not rely on frontend role checks.
- Use role-based access control and object-level authorization where needed.
- Keep views clean and readable.
- Keep database relationships normalized and explicit.
- Use pagination for list endpoints.
- Validate uploaded files by type and size.
- Keep secrets in environment variables.
- Add audit logging for important actions.
- Write code that supports the cybersecurity documentation later.
- Do not claim encryption, security, or protection features unless they are actually implemented.