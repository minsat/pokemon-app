import { Form, Row, Col } from 'react-bootstrap';

export const SearchBar = ({ filterQuery, setFilterQuery }) => {
    return (
        <Form onSubmit={e => { e.preventDefault(); }}>
            <Form.Group as={Row} className="mb-3 gx-1">
                <Form.Label column md="auto">Filter pokemon by name: </Form.Label>
                <Col>
                    <Form.Control type="text" placeholder="Enter pokemon name..."
                        value={filterQuery}
                        onInput={e => setFilterQuery(e.target.value)} />
                </Col>
            </Form.Group>
        </Form>
    )
}

export default SearchBar;