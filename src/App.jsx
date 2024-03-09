import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";

import AddFavourite from "./components/AddFavs";
import RemoveFavourites from "./components/RemoveFavs";

import MyNavbar from "./components/MyNavbar";

import { Button, Container, Row } from "react-bootstrap";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [favorites, setFavourites] = useState([]);

    const getMovieRequest = async (searchValue) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${import.meta.env.VITE_API_KEY}`;
        const response = await fetch(url);
        const responseJson = await response.json();
        if (responseJson.Search) {
            setMovies(responseJson.Search);
        }
    };

    useEffect(() => {
        if(searchValue){ getMovieRequest(searchValue);}
    
    else setMovies("");
    }, [searchValue]);
    useEffect(() => {
        const movieFavs = JSON.parse(localStorage.getItem("react-favs"));
        setFavourites(movieFavs || []);
    }, []);

    const saveToLocalStorage = (items) => {
        localStorage.setItem("react-favs", JSON.stringify(items));
    };

    const addFavouriteMovie = (movie) => {
        const isDuplicate = favorites.some(favorite => favorite.imdbID === movie.imdbID);
        if (!isDuplicate) {
            const newFavouriteList = [...favorites, movie];
            setFavourites(newFavouriteList);
            saveToLocalStorage(newFavouriteList);
            alert('Added to your favorites list.');
       
        } else {
        
           alert('This movie is already in your favorites list.');
        }
    };

    const RemoveFavoriteMovie = (movie) => {
        const newFavoriteList = favorites.filter(
            (favorite) => favorite.imdbID !== movie.imdbID
        );
        setFavourites(newFavoriteList);
        saveToLocalStorage(newFavoriteList);
    };

    const ClearFavoriteMovie = () => {
        setFavourites([]);
        localStorage.removeItem("react-favs");
    };

    return (
        <>
            <MyNavbar searchValue={searchValue} setSearchValue={setSearchValue} />
            <div className="movie-app">

                <br />
        
                <div >
                    <Container>
                        {searchValue && (<div className="col-md-6" >
                            <MovieListHeading heading="Search Results" />
                        </div>)}


                        <MovieList
                            movies={movies}
                            handleFavsClick={addFavouriteMovie}
                            favouriteComponent={AddFavourite}
                        />

                    </Container>
                </div>
                <div className="row mt-4 mb-4">

                </div>

                <Container>
                {favorites.length!==0 && (   <Row className="align-items-center">
                        <div className="col-md-6" id="FavsLink">
                            <MovieListHeading heading="Favorites" />
                        </div>
                        <div className="col-md-6 text-md-end">
                        
                            <Button variant="danger" onClick={ClearFavoriteMovie}>Clear</Button>
                        </div>
                    </Row>)}
                

                    <div>
                        <MovieList
                            movies={favorites}
                            handleFavsClick={RemoveFavoriteMovie}
                            favouriteComponent={RemoveFavourites}
                        />
                    </div>
                </Container>
            </div>
        </>
    );
};

export default App;
