/* eslint-disable react/prop-types */
import React from "react";

const MovieList = (props) => {
const FavouriteComponent= props.favouriteComponent;
return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
        {Array.isArray(props.movies) && props.movies.map(movie => (
            <div className="col mb-4" key={movie.imdbID}>
                <div className="image-container position-relative">
                    <img src={movie.Poster} alt="movie" className="img-fluid" />
                    <div onClick={() => props.handleFavsClick(movie)} className="overlay d-flex align-items-center justify-content-center">
                    
                        <FavouriteComponent />
                    </div>
                </div>
            </div>
        ))}
    </div>
);




}

export default MovieList;