import '../index.css'


import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';

import { useState, useEffect } from "react";

const Pokemon = () => {

    const [list, setList] = useState([])  //estado inicial de la lista es un arreglo vacío - todos los pokemon
    const [search, setSearch] = useState([]) // estado inicial de la busqueda vacio

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

        let searchPokemon = list.filter(c => c.pokemon_species.name.includes(e.target.value)); // busqueda de pokemon a traves de filter
        setSearch(searchPokemon)

    }

    const sortByNumber = () => { //ordenar pokemon por numero de pokedex
        setSearch(search.sort((a, b) => {
            if (a.entry_number > b.entry_number) return 1 
            return -1
        }));
    }

    const sortAlphabetic = () => {
        setSearch(search.sort((a, b) => { // orden alfabetico
            if (a.pokemon_species.name > b.pokemon_species.name) return 1
            return -1
        }))
    }

    return (

        <div>

            <header> </header>

            <Navbar className="  border border-success bg-success bg-opacity-50 navBar-expand-lg" >
                <Container className='p-5'>
                    <Navbar.Brand className= "fw-bold fs-1 " href="#" > Encuentra tu POKEMON!</Navbar.Brand>
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
                        <Dropdown.Toggle variant="success btn-lg" id="dropdown-basic">
                            Ordenar
                        </Dropdown.Toggle>

                        <Dropdown.Menu >
                            <Dropdown.Item  onClick={sortAlphabetic} href="#/action-1">alfabetico</Dropdown.Item>
                            <Dropdown.Item onClick={sortByNumber} href="#/action-2">numero de pokemon</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Navbar>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 ">
                {search.map((pokemon, index) => {
                    return (
                        <div className="container text-center"key={`${index}-pokemon`} style={{ width: '18rem' }}>
                            <div>
                            <Card className="col m-3 text-bg-danger bg-opacity-50 border border-4 border-danger" >
                                <Card.Img className = "p-2"variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/${pokemon.entry_number}.png`} />
                                <Card.Body>
                                    <Card.Title className=" border-bottom border-danger text-capitalize p-3">{pokemon.pokemon_species.name}</Card.Title>
                                    <Card.Text>
                                       {pokemon.entry_number}
                                    </Card.Text>
                          
                                </Card.Body>
                            </Card>
                            </div>
                        </div>
                    )
                })}
            </div>
            <footer> Todos lo derechos reservados </footer>
        </div>
    )

}


export default Pokemon;