# 2.0 Cybersecurity Cube

This section is a structured draft for Zentry cybersecurity documentation. Use the status markers below to avoid overclaiming:
- Implemented: verified in current code and behavior
- In Progress: partially implemented or currently under development
- Planned: approved design target not yet implemented

## 2.1 Security Principles

### 2.1.1 Data Confidentiality
Zentry-specific guidance:
- Implemented:
  - [Document already enforced access restrictions and authentication checks]
- In Progress:
  - [Document module-level role and object-level access checks currently being wired]
- Planned:
  - [Document additional hardening for sensitive records and attachment access]
- Evidence to capture:
  - Screenshot of restricted page behavior for unauthorized user
  - API response example for denied access

### 2.1.2 Data Integrity
Zentry-specific guidance:
- Implemented:
  - [Document server-side validation currently active]
- In Progress:
  - [Document serializer and permission rules being added per module]
- Planned:
  - [Document integrity checks for critical state changes and role updates]
- Evidence to capture:
  - Validation error response sample
  - Activity Log sample showing state-change traceability

### 2.1.3 Data Availability
Zentry-specific guidance:
- Implemented:
  - [Document currently available local development access and baseline service startup]
- In Progress:
  - [Document reliability improvements for module endpoints and error handling]
- Planned:
  - [Document deployment and recovery strategy after confirmation]
- Evidence to capture:
  - Successful endpoint health checks
  - Controlled error handling screenshots

## 2.2 Data States

### 2.2.1 Data In Transit
Zentry-specific guidance:
- Implemented:
  - [Document current authenticated request flow with access token handling]
- In Progress:
  - [Document request/response handling consistency across modules]
- Planned:
  - [Document transport-layer deployment policy after environment is finalized]
- Evidence to capture:
  - API request example showing authenticated route usage
  - Route-level permission response examples

### 2.2.2 Data at Rest
Zentry-specific guidance:
- Implemented:
  - [Document current database persistence used in development]
- In Progress:
  - [Document migration toward finalized PostgreSQL configuration]
- Planned:
  - [Document backup, retention, and restoration policy once confirmed]
- Evidence to capture:
  - Model-to-database mapping references
  - Migration history snapshots

### 2.2.3 Data In Process
Zentry-specific guidance:
- Implemented:
  - [Document request validation and permission evaluation currently running on the server]
- In Progress:
  - [Document role-aware and object-level checks being expanded]
- Planned:
  - [Document additional monitoring for high-risk operations]
- Evidence to capture:
  - Controller/view execution examples
  - Permission decision examples by role

## 2.3 Safeguards

### 2.3.1 Technology
Zentry-specific guidance:
- Implemented:
  - [Document confirmed framework and auth safeguards currently active]
- In Progress:
  - [Document pagination, validation, and endpoint guard improvements by module]
- Planned:
  - [Document additional technical controls only after implementation]
- Evidence to capture:
  - Config snippets (sanitized)
  - Endpoint protection test outputs

### 2.3.2 Policy and Practices
Zentry-specific guidance:
- Implemented:
  - [Document coding and documentation rules already enforced in repository instructions]
- In Progress:
  - [Document team practices for feature logging and security review checkpoints]
- Planned:
  - [Document release and incident handling practices when finalized]
- Evidence to capture:
  - Feature log entries
  - Pull request or checklist references

### 2.3.3 People
Zentry-specific guidance:
- Implemented:
  - [Document role definitions: Admin, Project Manager, Team Member]
- In Progress:
  - [Document role-specific workflow validation in active modules]
- Planned:
  - [Document user training and onboarding checklist for production use]
- Evidence to capture:
  - Role-based access screenshots
  - Role assignment/change evidence entries

## Notes for Documentation Safety
- Use only verified implementation evidence for Implemented items.
- Move items from Planned to In Progress to Implemented only when code and behavior are testable.
- Do not claim encryption, hardening, or protection controls unless they are truly in place.
