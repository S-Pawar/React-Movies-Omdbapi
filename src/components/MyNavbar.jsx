import React from "react";
import { Nav, Navbar, Container, Form } from "react-bootstrap";
import SearchBox from "./Searchbox";

const MyNavbar =(props) =>{
   return(
    <>
    <Navbar bg="dark" variant="dark" sticky="top">
    <Container>
        <Navbar.Brand>Movies</Navbar.Brand>
        <Form className="mx-auto flex-grow-1">
            <SearchBox
                searchValue={props.searchValue}
                setSearchValue={props.setSearchValue}
            />
        </Form>
        <Nav className="me-auto">
            <Nav.Link href="#FavsLink">Favorites</Nav.Link>
        </Nav>
    </Container>
</Navbar>
</>
);
}

export default MyNavbar;



