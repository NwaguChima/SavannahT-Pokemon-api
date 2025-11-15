import PokemonPage from './features/pokemon/pages/pokemon-home/PokemonHome';
import Providers from './lib/providers/Providers';
import '@shared/styles/_globals.scss';

function App() {
  return (
    <Providers>
      <PokemonPage />
    </Providers>
  );
}

export default App;
