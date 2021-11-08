import PokemonList from './components/PokemonList';
import SearchBar from './components/SearchBar';
import PokemonLogo from './pokemon-logo.png'
import { Alert, Row, Col, Button, Image } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function App() {

    const [pokemonList, setPokemonList] = useState([]);
    const [filterQuery, setFilterQuery] = useState('');
    const [error, setError] = useState('');


    useEffect(() => {
        const getPokemonList = async () => {

            try {

                const pokemonListFromAPI = await fetchOffsetPokemonList(25);

                const pokemonInfo = await Promise.all(pokemonListFromAPI.results.map(async (item, i) => {
                    const detailedPokemonInfo = await fetchDetailedInfo(item.url);
                    item.name = detailedPokemonInfo.name.charAt(0).toUpperCase() + detailedPokemonInfo.name.slice(1);
                    item.abilities = detailedPokemonInfo.abilities.map(item => item.ability.name)
                        .sort((a, b) => { return a.localeCompare(b) });
                    item.id = i;
                    item.pictureUrl = detailedPokemonInfo.sprites.front_default;
                    return item;
                }));

                setPokemonList(pokemonInfo);

            } catch (err) {
                setError('Failed to fetch pokemon list...')
            }
        }

        getPokemonList();

    }, [])

    const fetchPokemonList = async () => {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
        const data = await res.json();

        return data;
    }

    const fetchOffsetPokemonList = async (offset) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
        const data = await res.json();

        return data;
    }

    const fetchDetailedInfo = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        return data;
    }

    const deletePokemon = (id) => {
        const pokemonListAfterDelete = pokemonList.filter(item => item.id !== id);
        setPokemonList(pokemonListAfterDelete);
    }

    const filteredPokemonList = () => {
        return pokemonList.filter(item => item.name.toLowerCase().includes(filterQuery.toLowerCase()));
    }

    return (
        <div className="App">
            <div className="container">
                <Image id="pokemon-logo" fluid src={PokemonLogo} />
                {error !== '' && <Alert variant={'danger'}>
                    {error}
                </Alert>}

                <Row className="justify-content-center">
                    <Col xxl={5} xl={5} lg={5} md={7}>
                        <SearchBar filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
                    </Col>
                    <Col xxl={5} xl={4} lg={5} md={4}>
                        <Button className="d-block ms-auto me-auto ms-md-auto me-md-0" id="generate-new-pokemon">Generate new pokemon!</Button>
                    </Col>
                </Row>
                <PokemonList pokemonList={filterQuery !== '' ? filteredPokemonList() : pokemonList} onDelete={deletePokemon} />
            </div>

        </div >
    );
}

export default App;
