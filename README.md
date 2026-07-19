# Interseguro Frontend (React)

This is the Vite + React frontend for the matrix challenge.

## Design Decisions
- **State Management:** The JWT token is strictly stored in memory using React state (`useState`). It is never persisted to `localStorage` or `sessionStorage` in order to minimize XSS token theft risks.
- **Matrix Input:** The user inputs the matrix as a JSON string in a textarea. This is much simpler and more robust for arbitrary N x M matrices than building a dynamic, editable grid cell by cell.
- **App Flow:** The user first encounters a login form. Once authenticated, they are presented with the Matrix operation form and subsequent results.

## Setup
1. Copy `.env.example` to `.env`
2. Run `npm install`
3. Run `npm run dev`
