# Pokémon Backend API

A Node.js/Express backend API that serves as a proxy to the PokéAPI and manages user favorite Pokémon with MongoDB persistence.

## Features

- ✅ Fetch first 150 Pokémon from PokéAPI
- ✅ Get detailed Pokémon information (abilities, types, sprites)
- ✅ Fetch evolution chains for Pokémon
- ✅ Search Pokémon by name
- ✅ Add/Remove Pokémon from favorites
- ✅ Persist favorites in MongoDB
- ✅ Rate limiting and security middleware
- ✅ Error handling and validation
- ✅ TypeScript support

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB (Mongoose ODM)
- **External API:** PokéAPI
- **Security:** Helmet, CORS, XSS sanitization, Rate limiting

## Folder Structure

```
src/
├── server.ts              # Server entry point
├── app.ts                 # Express app configuration
├── database/
│   └── connect.ts         # MongoDB connection
├── controllers/
│   ├── pokemonController.ts
│   ├── favoriteController.ts
│   └── errorController.ts
├── models/
│   └── favoriteModel.ts   # Favorite Pokémon schema
├── routes/
│   ├── pokemonRoute.ts
│   └── favoriteRoute.ts
├── types/
│   └── index.ts           # TypeScript interfaces
├── utils/
│   ├── appError.ts
│   ├── catchAsync.ts
│   └── pokeApiClient.ts   # PokéAPI wrapper
└── middlewares/
    └── validation.ts      # Request validation
```

## API Endpoints

### Health Check

- `GET /api/health` - Server health status

### Pokémon Routes

- `GET /api/v1/pokemon` - Get all Pokémon (first 150)
  - Query params: `limit` (default: 150), `offset` (default: 0)
- `GET /api/v1/pokemon/:id` - Get single Pokémon with evolution chain
- `GET /api/v1/pokemon/search/:name` - Search Pokémon by name

### Favorites Routes

- `GET /api/v1/favorites` - Get all favorite Pokémon
- `POST /api/v1/favorites` - Add Pokémon to favorites
  ```json
  {
    "pokemonId": 1,
    "pokemonName": "bulbasaur",
    "pokemonSprite": "https://..."
  }
  ```
- `DELETE /api/v1/favorites/:pokemonId` - Remove from favorites
- `GET /api/v1/favorites/check/:pokemonId` - Check if Pokémon is favorite
- `DELETE /api/v1/favorites/clear` - Clear all favorites

## Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd pokemon-backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup**
   Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=8000
MONGO_URL=mongodb+srv://username:<PASSWORD>@cluster.mongodb.net/pokemon-app?retryWrites=true&w=majority
MONGO_PASSWORD=your_mongodb_password
```

4. **Build TypeScript**

```bash
npm run build
```

5. **Run in development**

```bash
npm run dev
```

6. **Run in production**

```bash
npm start
```

## MongoDB Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Create a database user with password
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and add it to `.env`

## Security Features

- **Helmet:** Sets various HTTP headers for security
- **CORS:** Enables Cross-Origin Resource Sharing
- **Rate Limiting:** 100 requests per hour per IP
- **XSS Protection:** Sanitizes user input
- **Input Validation:** Validates all request parameters and body

## Error Handling

The API uses a centralized error handling system:

- Development mode: Returns full error details
- Production mode: Returns user-friendly messages
- Handles MongoDB errors (cast, validation, duplicate keys)
- Catches async errors with `catchAsync` wrapper

## Response Format

### Success Response

```json
{
  "status": "success",
  "results": 150,
  "data": {
    "pokemon": [...]
  }
}
```

### Error Response

```json
{
  "status": "fail",
  "message": "Error message here"
}
```

## Testing the API

### Using cURL

**Get all Pokémon:**

```bash
curl http://localhost:8000/api/v1/pokemon
```

**Get single Pokémon:**

```bash
curl http://localhost:8000/api/v1/pokemon/1
```

**Search Pokémon:**

```bash
curl http://localhost:8000/api/v1/pokemon/search/pikachu
```

**Add to favorites:**

```bash
curl -X POST http://localhost:8000/api/v1/favorites \
  -H "Content-Type: application/json" \
  -d '{"pokemonId": 25, "pokemonName": "pikachu", "pokemonSprite": "https://..."}'
```

**Get favorites:**

```bash
curl http://localhost:8000/api/v1/favorites
```

**Remove from favorites:**

```bash
curl -X DELETE http://localhost:8000/api/v1/favorites/25
```

## Development

### Scripts

- `npm run dev` - Run with nodemon (auto-reload)
- `npm run build` - Compile TypeScript
- `npm run watch` - Watch mode for TypeScript
- `npm start` - Run production build

### Adding New Features

1. Create model in `models/` if needed
2. Add controller logic in `controllers/`
3. Define routes in `routes/`
4. Add validation in `middlewares/validation.ts`
5. Update types in `types/index.ts`

## Deployment

### Render (Recommended for Backend)

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect your repository
4. Set environment variables
5. Deploy

### Environment Variables for Production

```
NODE_ENV=production
PORT=8000
MONGO_URL=your_mongodb_url
MONGO_PASSWORD=your_password
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

ISC

## Author

Chima Nwagu

## Acknowledgments

- PokéAPI (https://pokeapi.co/) for the Pokémon data
- MongoDB for database solution
- Express.js community
