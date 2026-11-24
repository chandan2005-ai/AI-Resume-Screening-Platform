# AI-Based Resume Screening and Job Matching Platform

Frontend implementation for the project. The frontend is in `frontend/` and is built with React, TypeScript, Vite and Tailwind CSS. It includes demo mode so the interface can be explored before the Flask backend and MySQL database are connected.

## Start the frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:5173`.

See [frontend/README.md](frontend/README.md) for demo credentials, API endpoint contracts, backend integration instructions and production security notes.

## Current scope

Candidate, recruiter and admin interfaces; resume upload UI; sample NLP skill extraction results; job discovery; candidate/job match displays; application tracking; recruiter job creation; candidate ranking; and admin user management.

**Important:** Demo mode simulates API calls and NLP results. It is intended for UI development and demonstrations only. Real resume parsing, matching, persistence, authentication and role authorization must be implemented in the Flask/NLP backend.
