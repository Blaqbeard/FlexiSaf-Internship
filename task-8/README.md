# Task 8: PeopleOps – Reusable React Components Dashboard

A modern, single-page user management dashboard built with React and Vite. This task demonstrates building truly reusable UI primitives (Button, TextInput, Checkbox, Select, Badge), a Modal and Form system, and a composable Table with sorting and selection — all themed with a sleek, dark design.

## 🚀 Live Demo

Will be available on GitHub Pages at:

- https://blaqbeard.github.io/FlexiSaf-Internship/task-8/

## ✨ Features

- Reusable UI components: Button, TextInput, Checkbox (indeterminate), Select, Badge
- Modal with focus handling and ESC/overlay close
- Form wrapper with simple validation and consistent spacing
- Data table: sortable columns, empty state, row selection, bulk actions
- Search and filter by role/status
- Add/Edit user via modal (same form reused)
- LocalStorage persistence with Reset Seed
- Modern, accessible dark theme with design tokens

## 🧩 Tech Stack

- React 19 + Vite 7
- Plain CSS with design tokens (no UI framework)

## 📁 Structure

```
task-8/peopleops/
├── index.html
├── vite.config.js                # base set for GitHub Pages (/FlexiSaf-Internship/task-8/)
├── src/
│   ├── App.jsx                   # PeopleOps dashboard & logic
│   ├── App.css                   # Minor overrides
│   ├── index.css                 # Theme tokens & utilities
│   ├── components/
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── Checkbox.jsx
│   │   ├── Form.jsx
│   │   ├── Modal.jsx
│   │   ├── Select.jsx
│   │   └── Table.jsx
│   └── main.jsx
└── package.json                  # build and deploy scripts
```

## 🧪 How to run locally

```bash
cd task-8/peopleops
npm install
npm run dev
# open the printed URL (e.g. http://localhost:5173)
```

## 🏗️ Build & Preview

```bash
npm run build
npm run preview
```

## 🌐 Deploy (GitHub Pages)

This project is configured to deploy to the `gh-pages` branch under `task-8/`:

```bash
npm run predeploy
npm run deploy
```

The Vite base path is set in `vite.config.js` to `/FlexiSaf-Internship/task-8/` so assets resolve correctly on GitHub Pages.

## ✅ Task 8 Requirements Met

- Reusable components: form, input, button, table, checkbox, data table
- Clean composition and accessibility practices
- Modern theme and responsive layout

## 👨‍💻 Author

**Blaqbeard** – FlexiSaf Intern

- **Project:** Task 8 Advanced Deliverable
- **Focus:** Reusable React Component System
- **Duration:** 1 week development sprint

---

_Built with dedication and attention to detail for the FlexiSaf Internship Program_

**Last Updated:** November 2025  
**Version:** 1.0.0  
**Status:** Complete ✅
