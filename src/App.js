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
        getPokemonList();
    }, [])

    const getPokemonList = async () => {

        try {
            const listOfRandomNumbers = generateListOfUniqueRandomNumbers();

            const pokemonInfo = await Promise.all(listOfRandomNumbers.map(async number => {
                let detailedPokemonInfo = await fetchDetailedInfoByID(number);
                let pokemon = {
                    name: detailedPokemonInfo.name.charAt(0).toUpperCase() + detailedPokemonInfo.name.slice(1),
                    abilities: detailedPokemonInfo.abilities.map(item => item.ability.name).sort((a, b) => { return a.localeCompare(b) }),
                    id: number,
                    pictureUrl: detailedPokemonInfo.sprites.front_default
                }

                return pokemon;
            }))

            setPokemonList(pokemonInfo);

        } catch (err) {
            setError('Failed to fetch pokemon list...')
        }
    }

    const fetchDetailedInfoByID = async (id) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();

        return data;
    }

    const generateListOfUniqueRandomNumbers = () => {

        const listOfRandomNumbers = []

        while (listOfRandomNumbers.length < 20) {
            let randomNumber = Math.floor(Math.random() * 151) + 1;
            if (!listOfRandomNumbers.includes(randomNumber))
                listOfRandomNumbers.push(randomNumber);
        }

        return listOfRandomNumbers;
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
                        <Button className="d-block ms-auto me-auto ms-md-auto me-md-0" id="generate-new-pokemon" onClick={getPokemonList}>Generate new pokemon!</Button>
                    </Col>
                </Row>
                <PokemonList pokemonList={filterQuery !== '' ? filteredPokemonList() : pokemonList} onDelete={deletePokemon} />
            </div>
        </div>
    );
}

export default App;
