const Movie = require('../models/movieModel');
const Director = require('../models/directorModel');
const Genre = require('../models/genreModel');


const getMovie = async (movieId) => {
    const movie = await Movie.findById(movieId);
    return movie;
};


const getMovies = async () => {
    const movies = await Movie.find();
    return movies;
};


const createMovie = async (movieData) => {
    const movie = new Movie(movieData);
    await movie.save();

    await Director.findByIdAndUpdate({ _id: movie.director }, { $addToSet: { movies: movie._id } });
    await Genre.updateMany({ _id: movie.genres }, { $addToSet: { movies: movie._id } });

    return movie;
};


const updateMovie = async (movieId, movieData) => {
    const movie = await Movie.findByIdAndUpdate(movieId, movieData, { new: true });

    await Director.findByIdAndUpdate({ _id: movie.director }, { $addToSet: { movies: movie._id } });
    await Genre.updateMany({ _id: movie.genres }, { $addToSet: { movies: movie._id } });

    return movie
};


const deleteMovie = async (movieId) => {
    const movie = await Movie.findById(movieId);
    await movie.remove();
    return movie;
};


module.exports = {
    getMovie,
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie
}
