## Detailed Documentation

Each part of the application has its own comprehensive README with setup instructions, environment variables, scripts, architecture overview, and contribution guidelines.

- **[Frontend README → `./frontend/README.md`](./frontend/README.md)**
- **[Backend README → `./backend/README.md`](./backend/README.md)**

Please navigate to the respective folder and read its dedicated README for:

- Installation steps
- Available npm/yarn/pnpm scripts
- Environment configuration
- API documentation (for backend)
- Development server instructions
- Deployment guidelines

## Quick Start (Optional)

If you want a very quick way to get both parts running (assuming common tools):

```bash
# Install dependencies for both frontend and backend
cd frontend && pnpm install && cd ..
cd backend && pnpm install && cd ..

# Run both in parallel (you can use concurrently, npm-run-all, or docker-compose)
pnpm run dev
```
