# 1.0 Manual of the System

## 1.1 System Overview
This section will describe the purpose of Zentry, target users, major modules, and expected user outcomes. Keep language clear and factual so it can be reused in the semi-final document.

Suggested points to document:
- What Zentry solves for project teams
- Who uses the system (Admin, Project Manager, Team Member)
- What each major module contributes to the workflow
- Boundaries of the current implementation stage

## 1.2 Step-by-Step System Guide
Use this guide format for each page so screenshots and explanations remain consistent.

Current guide status:
- Login and navigation-shell behavior are implemented and ready for documentation capture.
- Backend authentication foundation exists (login, refresh, and current-user endpoints).
- Current-user hydration is used to confirm active in-app session identity when needed.
- Dashboard, Projects, and Focus Tasks have been integrated with backend data sources where active.
- Features like Milestones and Activity Logs remain explicitly labeled as in-progress placeholders.
- Detailed module walkthroughs will expand as those remaining placeholders are finished.

### Reusable Page Evidence Format
- Screenshot Title:
- Figure Number:
- Page/Screen Name:
- User Role Used During Capture:
- Numbered UI Labels:
  1. [UI Label 1]
  2. [UI Label 2]
  3. [UI Label 3]
- Explanation of Each Numbered Part:
  1. [Explain label 1 function and why it matters]
  2. [Explain label 2 function and expected result]
  3. [Explain label 3 function and any access restriction]
- User Action Sequence:
  1. [Step 1]
  2. [Step 2]
  3. [Step 3]
- Output/Result:
- Security Note:
- Evidence File Name:

### 1.2.1 Login Page
Current scaffold status:
- Login UI is scaffolded with email/password input, form validation behavior, and submit action state handling.
- Frontend post-login redirect behavior is active.
- Backend authentication endpoints are available for login, refresh, and current-user retrieval.

- Screenshot Title:
- Figure Number:
- Numbered UI Labels:
  1. Email field
  2. Password field
  3. Sign in button
  4. Validation/server message area
- Explanation of Each Numbered Part:
  1. Captures user identifier input.
  2. Captures secret credential input.
  3. Submits credentials for authentication.
  4. Shows field-level and/or top-level sign-in error feedback.
- User Action Sequence:
  1. Enter invalid values to capture validation behavior.
  2. Enter valid values and submit.
  3. Observe redirect behavior after successful sign-in.
- Output/Result:
  - User is redirected to intended protected route or dashboard fallback.
- Security Note:
  - Frontend redirect and session handling are implemented with memory-oriented access token state.
  - Refresh token handling is implemented through an HttpOnly cookie, so the frontend does not manage a refresh token in app state.
  - Browser reload restoration is implemented through refresh bootstrap (`/auth/refresh/`) before current-user hydration.
  - This reduces direct JavaScript access to the refresh token but does not eliminate XSS risk.
- Evidence File Name:

### 1.2.2 Application Shell and Navigation Layout
Current scaffold status:
- Protected pages render inside a reusable shell with sidebar and topbar.
- This section is screenshot-ready and should be documented before module-specific pages.

- Screenshot Title:
- Figure Number:
- Numbered UI Labels:
  1. Sidebar navigation area
  2. Topbar area
  3. Page title and subtitle area
  4. Main content placeholder panel
- Explanation of Each Numbered Part:
  1. Lists module routes and supports navigation across scaffolded sections.
  2. Shows context controls (including session-related actions).
  3. Shows current section identity and page context.
  4. Hosts each module placeholder or future module content.
- User Action Sequence:
  1. Sign in and open a protected route.
  2. Capture sidebar and topbar in one frame.
  3. Capture a module placeholder page showing title context.
- Output/Result:
  - Authenticated users see consistent shell layout across protected routes.
- Security Note:
  - Layout visibility is guarded by frontend authentication state.
- Evidence File Name:

### 1.2.3 Protected Layout Behavior (Route Guard + Redirect)
- Screenshot Title:
- Figure Number:
- Numbered UI Labels:
  1. Protected route URL attempt
  2. Redirected Login screen
  3. Post-login destination page
  4. Session identity confirmation state
- Explanation of Each Numbered Part:
  1. Demonstrates route access attempt without authenticated session.
  2. Confirms redirect to login when session is missing.
  3. Confirms intended-route restoration after successful login.
  4. Confirms `/auth/me/` hydration when token exists and user identity needs confirmation.
- User Action Sequence:
  1. Open a protected route while logged out.
  2. Observe redirect to login.
  3. Sign in and verify destination restoration behavior.
  4. Observe active-session user identity confirmation in shell/topbar context.
- Output/Result:
  - Protected routes are not rendered for unauthenticated sessions.
  - Active in-app sessions can hydrate current-user identity from backend.
- Security Note:
  - Backend authorization checks remain mandatory and should be documented separately for each business module.
  - If current-user hydration returns unauthorized, session is cleared to avoid half-authenticated UI state.
  - Access token state remains memory-oriented; reload restoration depends on a valid HttpOnly refresh cookie.
- Evidence File Name:

### 1.2.4 Dashboard
Current status:
- The dashboard is active and queries real data for active projects, stats, and focus tasks.
- Insight metrics and recent activity feeds are not yet fully supported and clearly show honest empty states.

- Screenshot Title:
- Figure Number:
- Numbered UI Labels:
  1. Top stat row (Projects, Tasks, Pendings)
  2. Active Projects panel
  3. Focus Tasks panel
  4. In-progress Insight/Activity panels
- Explanation of Each Numbered Part:
  1. Summarizes high-level user assignment metrics.
  2. Shows up to 5 real active projects the user is involved in.
  3. Shows user's assigned in-progress tasks ordered by due date.
  4. Explicitly labeled empty states indicating analytical scope is still under integration.
- Security Note:
  - Dashboard panels query DRF endpoints that enforce user assignment authorization logic.
- Evidence File Name:

### 1.2.5 Projects Module
Current status:
- The Projects list and Project Detail pages are wired to real backend endpoints.
- Base data like title, priority, status, completion progress, and member assignment are functional.
- Milestone tracking and activity feed components display honest empty placeholders while backend work catches up.

- Screenshot Title:
- Figure Number:
- Numbered UI Labels:
  1. Project list metrics/table
  2. Detailed view and members panel
  3. In-progress milestones placeholder
- Explanation of Each Numbered Part:
  1. Renders live project state from the database.
  2. Shows assigned team members handling this specific environment boundary.
  3. Makes it clear which tracking functions are not yet finalized structurally.
- Security Note:
  - Role-based project visibility and member modifications (Admin / Owner vs generic Member) are partially structured on the frontend and must align with the DRF endpoint checks.
- Evidence File Name:

### 1.2.6 Tasks Module (Scaffold Placeholder)
Current scaffold status:
- Tasks route currently renders placeholder content.
- Task list, assignment, status changes, and detail workflows are in progress.

- Screenshot Title:
- Figure Number:
- Numbered UI Labels:
  1. Tasks route title
  2. Placeholder message panel
  3. Shell navigation area
- Explanation of Each Numbered Part:
  1. Confirms route-level scaffold for Tasks.
  2. Indicates feature implementation is pending.
  3. Maintains consistent protected-layout navigation.
- Security Note:
  - Object-level task authorization is planned and must be enforced server-side once endpoints exist.
- Evidence File Name:

### 1.2.7 Remaining Module Placeholders (Current State)
Current scaffold status:
- The following routes are scaffolded as placeholders inside the protected shell:
  - Comments
  - Attachments
  - Notifications
  - Activity Logs
  - User Management

Suggested screenshot notes for current stage:
- Capture one representative placeholder page and annotate:
  1. Sidebar module selection
  2. Topbar and page heading
  3. Placeholder content panel
- Reuse the same annotation pattern for each module as implementation progresses.

Security note for this stage:
- Frontend route-level protection is scaffolded.
- Module-specific backend permissions and data visibility rules remain in progress.

### 1.2.8 Planned Detailed Module Sections (To Complete Later)
When module implementation is available, expand this manual with dedicated sections for:
1. Dashboard functional widgets
2. Projects list and project details
3. Tasks list and task details
4. Comments and attachments workflows
5. Notifications workflow
6. Activity Log filtering and interpretation
7. User Management and role administration
