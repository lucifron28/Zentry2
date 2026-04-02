# API Plan (Scaffold)

This document is a planning guide for backend API design. Routes and behaviors listed here are proposed for implementation and documentation alignment. They should not be interpreted as fully completed endpoints unless verified in code and tests.

## Authentication
| Endpoint purpose | Method | Example route | Who can access it | Notes |
|---|---|---|---|---|
| Sign in user account | POST | `/api/v1/auth/login/` | Public | Returns auth tokens/session data based on final auth flow design. |
| Refresh access token | POST | `/api/v1/auth/refresh/` | Authenticated session context | Final refresh-token handling policy must follow security rules. |
| Sign out current session | POST | `/api/v1/auth/logout/` | Authenticated users | Should include audit evidence for session-ending actions. |

## Users
| Endpoint purpose | Method | Example route | Who can access it | Notes |
|---|---|---|---|---|
| List users | GET | `/api/v1/users/` | Admin, Project Manager | Final response fields should avoid unnecessary data exposure. |
| Get user profile | GET | `/api/v1/users/{id}/` | Admin, Project Manager, owner (rule-based) | Object-level access rules required. |
| Update user role/status | PATCH | `/api/v1/users/{id}/` | Admin | Role-change actions should be logged. |

## Projects
| Endpoint purpose | Method | Example route | Who can access it | Notes |
|---|---|---|---|---|
| List projects | GET | `/api/v1/projects/` | Authenticated users (scoped by role/membership) | Must support pagination and filtering. |
| Create project | POST | `/api/v1/projects/` | Admin, Project Manager | Validate ownership and required fields server-side. |
| View/update project | GET, PATCH | `/api/v1/projects/{id}/` | Role and membership based | Object-level checks are required. |

## Tasks
| Endpoint purpose | Method | Example route | Who can access it | Notes |
|---|---|---|---|---|
| List tasks | GET | `/api/v1/tasks/` | Authenticated users (scoped) | Include pagination and role-aware scope. |
| Create task | POST | `/api/v1/tasks/` | Admin, Project Manager | Validate project context and assignee constraints. |
| Update task status | PATCH | `/api/v1/tasks/{id}/` | Admin, Project Manager, assigned Team Member (rule-based) | Status transitions should be auditable. |

## Comments
| Endpoint purpose | Method | Example route | Who can access it | Notes |
|---|---|---|---|---|
| List task comments | GET | `/api/v1/tasks/{task_id}/comments/` | Task-visible users | Ensure users only see comments in authorized task scope. |
| Add task comment | POST | `/api/v1/tasks/{task_id}/comments/` | Task-visible users | Validate content length and ownership metadata. |

## Attachments
| Endpoint purpose | Method | Example route | Who can access it | Notes |
|---|---|---|---|---|
| List task attachments | GET | `/api/v1/tasks/{task_id}/attachments/` | Task-visible users | Access should follow task-level permissions. |
| Upload attachment | POST | `/api/v1/tasks/{task_id}/attachments/` | Task-visible users | File type and size validation required server-side. |

## Notifications
| Endpoint purpose | Method | Example route | Who can access it | Notes |
|---|---|---|---|---|
| List notifications | GET | `/api/v1/notifications/` | Authenticated users | Response should be user-specific. |
| Mark notification as read | PATCH | `/api/v1/notifications/{id}/read/` | Notification owner | Must enforce owner-only updates. |

## Activity Logs
| Endpoint purpose | Method | Example route | Who can access it | Notes |
|---|---|---|---|---|
| List activity logs | GET | `/api/v1/activity-logs/` | Admin, Project Manager (policy-defined) | Visibility scope should match security policy. |
| Record notable action | Internal event | `system-generated` | System process | Triggered by key actions such as login, project/task changes, uploads, and role updates. |
