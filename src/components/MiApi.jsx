
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';

import { useState, useEffect } from "react";

import '../index.css'

const Pokemon = () => {

    const [list, setList] = useState([])  //estado inicial de la lista es un arreglo vacío - todos los pokemon
    const [search, setSearch] = useState("") // estado inicial de la busqueda vacio

    useEffect(() => { dataBase(); }, []);  // funcion que consume la API al momento de montar el componente

    // funcion que consulta la API

    const dataBase = async () => {
        const url = "https://pokeapi.co/api/v2/pokedex/2/";
        const res = await fetch(url);
        const data = await res.json();
        setList(data.pokemon_entries); // se actualiza el estado de la lista de acuerdo a los datos la API
        setSearch(data.pokemon_entries); // se actualiza el estado de la busqueda de acuerdo a los datos la API
    }

    const inputSearch = (e) => {

        e.preventDefault()

        let searchPokemon = list.filter(c => c.pokemon_species.name.includes(e.target.value));
        setList(searchPokemon)

    }


    return (

        <div>


            <header>
                aqui quiero poner una imagen larga
            </header>

            <Navbar className="navBar" bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">Búsqueda de Pokemon</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Ingresa el nombre del Pokemon"
                                className="me-2"
                                aria-label="Search"
                                onChange={(e) => { inputSearch(e) }}
                            />
                        </Form>
                    </Navbar.Collapse>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Navbar>

            <div className="container" > 

                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>

            </div>



        </div>
    )

}


export default Pokemon;