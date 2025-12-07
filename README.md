
# Swagger AI Agent

Project skeleton for the Swagger AI Agent (Phase 1).

Run locally

```powershell
cd "c:\CustomeFolder\...\swagger-ai-agent"
npm install
npm run dev
```

API endpoints (basic)

- `POST /api/spec/import` — import a spec from `url` or `file`.
- `GET /api/spec/:specId` — fetch spec metadata.
- `GET /api/spec/:specId/operations` — list operations.

