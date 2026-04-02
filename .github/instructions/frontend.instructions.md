---
applyTo: "client/src/**/*.js,client/src/**/*.jsx,client/src/**/*.ts,client/src/**/*.tsx"
---

# Frontend Instructions

- Use React functional components only.
- Prefer feature-based folders.
- Use TanStack Query for server state, fetching, caching, and mutations.
- Use Zustand only for lightweight auth/session state.
- Use Zod for form and input validation where appropriate.
- Use Axios through a centralized API client, not ad hoc scattered calls.
- Use Axios interceptors for auth token attachment and refresh handling.
- Do not store refresh tokens in localStorage.
- Prefer reusable components for forms, modals, tables, badges, cards, and tabs.
- Use daisyUI as the base component layer and Tailwind for layout/polish.
- Keep pages responsive.
- Avoid very long component files.
- Add loading, error, and empty states for data-driven pages.
- Do not hardcode fake API responses in production code.
- Use clear names and predictable component props.