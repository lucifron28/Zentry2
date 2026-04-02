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
- Login and navigation-shell behavior are scaffolded and ready for documentation capture.
- Dashboard and business modules currently use placeholder scaffold pages.
- Detailed module walkthroughs should be completed after feature-level implementation.

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
- Frontend post-login redirect behavior is scaffolded.
- Backend authentication endpoint lifecycle is still in progress and must be documented separately when finalized.

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
  - Frontend redirect and session handling are scaffolded.
  - Do not claim backend token lifecycle completion until backend auth endpoints are verified.
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
- Explanation of Each Numbered Part:
  1. Demonstrates route access attempt without authenticated session.
  2. Confirms redirect to login when session is missing.
  3. Confirms intended-route restoration after successful login.
- User Action Sequence:
  1. Open a protected route while logged out.
  2. Observe redirect to login.
  3. Sign in and verify destination restoration behavior.
- Output/Result:
  - Protected routes are not rendered for unauthenticated sessions.
- Security Note:
  - Backend authorization checks remain mandatory and should be documented separately once endpoints are complete.
- Evidence File Name:

### 1.2.4 Dashboard (Scaffold Placeholder)
Current scaffold status:
- Dashboard route is currently a structured placeholder inside the app shell.
- Real dashboard widgets and backend-integrated metrics are in progress.

- Screenshot Title:
- Figure Number:
- Numbered UI Labels:
  1. Page heading/title area
  2. Placeholder state panel
  3. Navigation context in shell
- Explanation of Each Numbered Part:
  1. Identifies current module route.
  2. Indicates feature content is pending implementation.
  3. Shows available scaffold navigation paths.
- Security Note:
  - Do not claim dashboard data authorization behavior until backend endpoints are active.
- Evidence File Name:

### 1.2.5 Projects Module (Scaffold Placeholder)
Current scaffold status:
- Projects route currently renders placeholder content within the protected shell.
- Project CRUD, member assignment, and filtering behavior are planned.

- Screenshot Title:
- Figure Number:
- Numbered UI Labels:
  1. Projects route title
  2. Placeholder message panel
  3. Shell navigation area
- Explanation of Each Numbered Part:
  1. Confirms route-level scaffold for Projects.
  2. States that functional content is pending implementation.
  3. Allows movement to other scaffolded modules.
- Security Note:
  - Role-based project visibility is planned but not yet final.
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
