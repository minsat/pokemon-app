import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

export const Pokemon = ({ pokemon, onDelete }) => {

    const [showAbilities, toggleShowAbilities] = useState(false);

    if (!pokemon)
        return (
            <div />
        )

    return (
        <Card className="pokemon-card m-2">
            <Card.Img variant="top" src={pokemon.pictureUrl} />
            <Card.Body>
                <Card.Title>{pokemon.name}</Card.Title>
                {showAbilities &&
                    <Card.Text>
                        {pokemon.abilities.map((item, i) => i > 0 ? `, ${item}` : `${item}`)}
                    </Card.Text>}
                <Button className="me-2" variant="primary" onClick={() => toggleShowAbilities(!showAbilities)}>{showAbilities === false ? 'Show Abilities' : 'Hide Abilities'}</Button>
                <Button variant="danger" onClick={() => onDelete(pokemon.id)}>Delete</Button>
            </Card.Body>
        </Card>
    )
}

export default Pokemon;