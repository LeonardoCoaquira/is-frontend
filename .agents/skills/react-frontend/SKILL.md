---
name: "Frontend Conventions"
description: "Context and design decisions for the React Frontend"
---

# Frontend (interseguro-frontend)

## Tech Stack
- React
- Vite
- No SSR

## Design Decisions
- **State Management:** The JWT token is kept in memory (React state) only. We do not use `localStorage` or `sessionStorage` for security.
- **Matrix Input:** The matrix is input via a single textarea as a JSON string, rather than building an editable grid cell by cell.
- **Routing/Flow:** The app orchestrates a simple flow: Login -> Matrix Form -> Result View.

## Project Structure
- `src/App.jsx`: Main orchestration component
- `src/api/client.js`: API client for Go API calls
- `src/components/LoginForm.jsx`: Login UI
- `src/components/MatrixForm.jsx`: Textarea for JSON matrix and operation selector
- `src/components/ResultView.jsx`: Displays Q/R or rotated matrix along with statistics
