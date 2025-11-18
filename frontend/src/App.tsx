import PokemonPage from './features/pokemon/pages/pokemon-home/PokemonHome';
import Providers from './lib/providers/Providers';
import '@shared/styles/_globals.scss';
import ErrorBoundary from './shared/components/error-boundary/ErrorBoundary';

function App() {
  return (
    <Providers>
      <ErrorBoundary>
        <PokemonPage />
      </ErrorBoundary>
    </Providers>
  );
}

export default App;
