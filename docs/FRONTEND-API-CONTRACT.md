# Frontend–Flask API Contract

The React frontend expects a JSON REST API rooted at `VITE_API_BASE_URL` (default: `http://localhost:5000/api`). All authenticated requests include `Authorization: Bearer <access_token>`.

## Authentication

- `POST /auth/login` — request `{ "email": "...", "password": "...", "role": "candidate|recruiter|admin" }`.
- `POST /auth/register` — request `{ "name": "...", "email": "...", "password": "...", "role": "candidate|recruiter", "company": "..." }`.
- Both return `{ "access_token": "...", "user": { "id": 1, "name": "...", "email": "...", "role": "candidate", "status": "active" } }`.
- `GET /auth/me` — returns the signed-in user.

## Jobs and applications

- `GET /jobs?search=&workplace=&type=` returns `Job[]`.
- `GET /jobs/:id` returns one `Job`.
- `POST /jobs` accepts job title, company, location, workplace, type, salary, experience, description, skills and status.
- `GET /recruiter/jobs` returns only the signed-in recruiter's job posts.
- `POST /applications` accepts `{ "job_id": 1 }`.
- `GET /applications/me` returns `Application[]`.

## Resume and NLP

- `POST /resumes/upload` accepts `multipart/form-data` with field name `resume`.
- It returns `{ "fileName": "resume.pdf", "uploadedAt": "...", "skills": ["Python", "SQL"], "experience": "...", "summary": "..." }`.
- `GET /resumes/latest` returns the latest resume analysis or `null`.
- Resume parsing, entity/skill extraction, vectorization and matching score generation must happen in the Python/NLP backend. Do not trust a score submitted by the browser.

## Recruiter and admin

- `GET /recruiter/candidates` returns `Candidate[]`, already ranked by the backend match score. Include both `id` (candidate ID) and `applicationId` (application record ID) when they differ.
- `PATCH /recruiter/applications/:id/status` accepts `{ "status": "Applied|Under Review|Shortlisted|Interview|Rejected|Hired" }`.
- `GET /admin/users` returns `User[]`.
- `PATCH /admin/users/:id/status` accepts `{ "status": "active|blocked" }`.

## Type conventions

The frontend TypeScript models in `frontend/src/types/index.ts` use camelCase JSON properties. Either return camelCase from Flask or map snake_case responses to camelCase in the corresponding `frontend/src/services/*` service before returning them to pages.
