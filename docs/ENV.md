# Environment APIs

This document describes the environment endpoints available under `/api/environment`.

Endpoints

- `POST /api/environment` — create environment
- `GET /api/environment/spec/{specId}` — list environments for a spec
- `GET /api/environment/{envId}` — get environment
- `PUT /api/environment/{envId}` — update environment (partial)
- `DELETE /api/environment/{envId}` — delete environment

Example create payload

```json
{
  "name": "staging",
  "specId": "spec-001",
  "baseUrl": "https://staging.example.com",
  "defaultHeaders": { "Accept": "application/json" }
}
```

Run the integration smoke script to exercise these endpoints locally:

```powershell
npm run smoke
```

OpenAPI spec is available at `openapi/environment.yaml`.
