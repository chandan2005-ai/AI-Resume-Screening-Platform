# TalentMatch Frontend

React + TypeScript + Vite frontend for the AI-Based Resume Screening and Job Matching Platform.

## 1. Requirements

- Node.js 20.19+ or 22.12+
- npm 10+
- Flask API backend (optional while using demo mode)

## 2. Install and run

```bash
cd frontend
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:5173`.

Build for production:

```bash
npm run build
npm run preview
```

## 3. Demo mode

The frontend starts in demo mode. No Flask server or MySQL database is required to preview the interface. Demo data is stored in `src/utils/mockData.ts` and service methods return simulated API responses.

Demo sign-in accounts:

| Role | Email | Password |
|---|---|---|
| Candidate | `candidate@demo.com` | Any password with 6+ characters |
| Recruiter | `recruiter@demo.com` | Any password with 6+ characters |
| Admin | `admin@demo.com` | Any password with 6+ characters |

Select the matching role tab on the sign-in page. Demo mode is only for development and demonstrations. It does not provide real authentication, persistent server storage, actual resume parsing, or secure access control.

## 4. Connect the Flask backend

Set these variables in `.env`:

```env
VITE_USE_MOCK_DATA=false
VITE_API_BASE_URL=http://localhost:5000/api
```

Restart Vite after changing environment variables. The frontend Axios client sends the saved token as a Bearer token in the `Authorization` header.

### Expected API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/login` | Authenticate a user |
| POST | `/api/auth/register` | Register candidate or recruiter |
| GET | `/api/auth/me` | Return the authenticated user |
| GET | `/api/jobs` | List/search jobs; accepts `search`, `workplace`, `type` query parameters |
| GET | `/api/jobs/:id` | Get job details |
| POST | `/api/jobs` | Create a recruiter job post |
| GET | `/api/recruiter/jobs` | List the signed-in recruiter's posts |
| POST | `/api/resumes/upload` | Upload and analyse a resume (`multipart/form-data`, field name `resume`) |
| GET | `/api/resumes/latest` | Get the current user's latest resume analysis |
| GET | `/api/applications/me` | List the candidate's applications |
| POST | `/api/applications` | Apply to a job (`{ "job_id": 123 }`) |
| GET | `/api/recruiter/candidates` | List ranked candidates for recruiter |
| PATCH | `/api/recruiter/applications/:id/status` | Update application status |
| GET | `/api/admin/users` | List platform users |
| PATCH | `/api/admin/users/:id/status` | Activate/block a user |

### Example response shapes

Login and registration should return:

```json
{
  "access_token": "your-jwt-token",
  "user": {
    "id": 1,
    "name": "Aarav Sharma",
    "email": "aarav@example.com",
    "role": "candidate",
    "status": "active"
  }
}
```

A job object should use the fields defined in `src/types/index.ts`. The resume upload endpoint should return:

```json
{
  "fileName": "resume.pdf",
  "uploadedAt": "24 Nov 2026",
  "skills": ["Python", "SQL", "React"],
  "experience": "Fresher / Entry-level",
  "summary": "Resume analysis summary..."
}
```

The API response field names can be adapted in the service files if your Flask backend uses snake_case instead of the frontend's camelCase model.

## 5. Main frontend features

- Public landing page and job discovery
- Candidate, recruiter and admin sign-in roles
- Candidate dashboard, resume upload and skill analysis results
- Job recommendations, job details and application tracking
- Recruiter dashboard, job creation and candidate ranking/status updates
- Admin dashboard and user activation/blocking interface
- Responsive layouts for desktop, tablet and mobile

## 6. Security and production notes

- The demo authentication flow is not production-ready. Use backend-issued short-lived access tokens, secure refresh-token handling and server-side role checks.
- Enforce role permissions on every Flask endpoint. Hiding a route in React is not authorization.
- Validate resume MIME type, extension and file size on the server; scan uploaded files and store them outside the public web root.
- Do not trust client-side skill lists or matching scores. Calculate and validate them on the backend/NLP service.
- Add recruiter approval workflows if recruiters must be verified before posting jobs.
- Configure CORS on Flask for your deployed frontend origin only.
- Use HTTPS in production and never commit `.env` secrets.

## 7. Project layout

```text
src/
├── assets/
├── components/       # Reusable UI, common, navbar and dashboard components
├── context/          # Authentication context
├── features/         # Feature modules (ready for feature-specific components)
├── hooks/            # React Query and authentication hooks
├── pages/            # Home, auth, candidate, recruiter, admin and jobs pages
├── routes/           # Route definitions and route protection
├── services/         # Axios API and domain services
├── styles/           # Global Tailwind and custom CSS
├── types/            # Shared TypeScript models
├── utils/            # Demo fixtures and helpers
├── App.tsx
└── main.tsx
```
