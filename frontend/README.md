# Pokémon Frontend Application

A modern, responsive React application for browsing and managing your favorite Pokémon. Built with TypeScript, Vite, and best practices.

## 🚀 Features

- ✅ **Browse Pokémon**: Infinite scroll through the first 150 Pokémon
- ✅ **Search**: Find Pokémon by name or ID
- ✅ **Favorites Management**: Add/remove Pokémon to your favorites
- ✅ **Filter**: View all Pokémon or only favorites
- ✅ **Detailed View**: Click any Pokémon to see abilities, types, stats, and evolution chain
- ✅ **Smooth Animations**: Page transitions and card animations
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **Toast Notifications**: User feedback with Sonner
- ✅ **Optimized Performance**: React Query caching and infinite scroll

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Data Fetching**: TanStack Query (React Query) with Axios
- **Styling**: SCSS Modules with BEM convention
- **Notifications**: Sonner
- **Code Quality**: ESLint, TypeScript strict mode

## 📁 Folder Structure

```
src/
├── assets/              # Static assets (images, icons)
├── components/          # Global reusable components
│   ├── Button/
│   ├── Input/
│   └── Loader/
├── features/            # Feature-based modules
│   └── pokemon/
│       ├── components/  # Feature-specific components
│       │   ├── PokemonCard/
│       │   ├── PokemonList/
│       │   ├── PokemonDetail/
│       │   ├── SearchBar/
│       │   ├── FilterBar/
│       │   └── Header/
│       └── pages/       # Feature pages
│           └── PokemonPage.tsx
├── lib/                 # Third-party integrations
│   ├── api/            # API clients
│   └── store/          # Redux store
├── shared/             # Shared utilities
│   ├── constants/
│   ├── styles/
│   └── utils/
└── types/              # Global TypeScript types
```

## 🎨 Design Features

### Animations & Transitions

- **Card Animations**: Slide up animation on mount
- **Hover Effects**: Scale and shadow transitions on card hover
- **Modal Transitions**: Scale and fade animations
- **Loading States**: Spinning Pokéball loader
- **Smooth Scrolling**: Infinite scroll with loading indicator

### BEM Convention

All styles follow BEM (Block Element Modifier) naming:

```scss
.block {
}
.block__element {
}
.block--modifier {
}
```

## 📦 Installation

1. **Install dependencies**

```bash
npm install
```

2. **Create environment file**

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

3. **Start development server**

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Features Implementation

### Infinite Scrolling

Uses TanStack Query's `useInfiniteQuery` with Intersection Observer:

- Automatically loads next page when user scrolls near bottom
- Respects the 150 Pokémon limit
- Shows loading indicator during fetch
- Smooth user experience with no pagination buttons

### State Management

- **Redux Toolkit**: Manages global state (selected Pokémon, filters, favorites)
- **React Query**: Handles server state, caching, and synchronization
- **Local State**: Component-level state with React hooks

### API Integration

All API calls go through Axios client with:

- Request/response interceptors
- Error handling
- Timeout configuration
- Base URL configuration

### Toast Notifications

Uses Sonner for elegant toast messages:

- Success messages for favorites actions
- Error messages for failed operations
- Custom positioning and styling

## 🎨 Styling Architecture

### SCSS Variables

Centralized design tokens in `variables.scss`:

- Colors (primary, secondary, type colors)
- Spacing scale
- Typography scale
- Breakpoints
- Transitions

### Modular SCSS

Each component has its own SCSS module:

- Scoped styles (no global conflicts)
- BEM naming convention
- Reusable mixins from variables

### Responsive Design

Mobile-first approach with breakpoints:

- Small: 576px
- Medium: 768px
- Large: 992px
- Extra Large: 1200px

## 🔍 Component Overview

### Global Components

- **Button**: Reusable button with variants (primary, secondary, outline, danger)
- **Input**: Form input with label, icon, and error states
- **Loader**: Animated Pokéball loading indicator

### Feature Components

- **PokemonCard**: Displays Pokémon with image, name, types, and favorite toggle
- **PokemonList**: Grid layout with infinite scroll
- **PokemonDetail**: Modal with detailed Pokémon information
- **SearchBar**: Search by name or ID with validation
- **FilterBar**: Toggle between all Pokémon and favorites
- **Header**: App header with branding

## 🚦 API Endpoints Used

- `GET /api/v1/pokemon` - Fetch Pokémon list (paginated)
- `GET /api/v1/pokemon/:id` - Get Pokémon details with evolution
- `GET /api/v1/pokemon/search/:name` - Search Pokémon
- `GET /api/v1/favorites` - Get user favorites
- `POST /api/v1/favorites` - Add to favorites
- `DELETE /api/v1/favorites/:id` - Remove from favorites
- `DELETE /api/v1/favorites/clear` - Clear all favorites

## 🎯 Performance Optimizations

1. **React Query Caching**: 5-minute stale time for Pokémon data
2. **Lazy Loading**: Images loaded with `loading="lazy"`
3. **Infinite Scroll**: Only loads 20 Pokémon at a time
4. **Memoization**: Strategic use of React hooks
5. **Code Splitting**: Vite's automatic code splitting

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Mobile Support

Fully responsive design that works on:

- iOS devices
- Android devices
- Tablets
- Desktop browsers

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

ISC

## 👨‍💻 Development Tips

### Adding New Components

```bash
src/components/
└── MyComponent/
    ├── MyComponent.tsx
    ├── MyComponent.module.scss
    └── index.ts (optional barrel export)
```

### Using Path Aliases

```typescript
import Button from '@components/Button/Button';
import { Pokemon } from '@types/index';
import { capitalize } from '@shared/utils/helpers';
```

### SCSS Best Practices

```scss
// Use BEM
.my-component {
}
.my-component__element {
}
.my-component--modifier {
}

// Import variables
@import '@/shared/styles/variables.scss';

// Use design tokens
color: $primary-color;
padding: $spacing-md;
transition: all $transition-fast;
```

## 🐛 Troubleshooting

**API not connecting?**

- Check `.env` file has correct API URL
- Ensure backend is running on port 8000
- Check CORS settings on backend

**Build errors?**

- Delete `node_modules` and run `npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Check TypeScript errors: `npm run build`

**Styles not loading?**

- Verify SCSS import paths
- Check if variables are properly imported
- Ensure module.scss extension is used

## Live URL

https://savannah-pokemon.vercel.app/

## 🎉 Acknowledgments

- PokéAPI for providing the Pokémon data
- React community for amazing tools and libraries
- Vite team for the blazing-fast build tool
