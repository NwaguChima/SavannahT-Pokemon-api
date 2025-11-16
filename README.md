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

## Approach

The Frontend uses the feature based approach which is best known for its ability to scale, so each feature can have various pages and can grow without issues. There is also a concept of shared resources, across features and also within features. Importing from one feature into another is forbidden as only shared resources can be used across features.
Additional feature on the frontend includes optimistic update when adding and removing a favorite, in other to give the user a seamless experience.

The backend embodies the MVC architecture, clearly separating controllers from routes and showing a clean connection between them all. There is also a models folder, and a middleware folder for the various models and middlewares in the app.
Additional features includes rate limiting, and adding various security headers.

## Live URLS:

- BACKEND: https://savannaht-pokemon-api.onrender.com/api/v1
- FRONTEND: https://savannah-pokemon.vercel.app/
