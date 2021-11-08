import Pokemon from './Pokemon';
import { Alert } from 'react-bootstrap';

export const PokemonList = ({ pokemonList, onDelete }) => {

    if (pokemonList.length === 0)
        return (
            <Alert variant={'light'}>
                There are no pokemon to show...
            </Alert>
        )

    return (
        <div className="row justify-content-center">
            {pokemonList.map(pokemon => (<Pokemon key={pokemon.id} pokemon={pokemon} onDelete={onDelete} />))}
        </div>
    )
}

export default PokemonList;