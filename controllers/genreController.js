const asyncHandler = require('express-async-handler');

const Genre = require('../models/genreModel');
const Movie = require('../models/movieModel');


const getGenre = async (genreId) => {
    const genre = await Genre.findById(genreId);
    return genre;
};


const getGenres = async () => {
    const genres = await Genre.find();
    return genres;
};


const createGenre = async (genreData) => {
    const genre = new Genre(genreData);
    genre.save();
    return genre;
};


const updateGenre = async (genreId, genreData) => {
    const genre = await Genre.findByIdAndUpdate(genreId, genreData, { new: true });

    await Movie.updateMany({ _id: genre.movies }, { $addToSet: { genres: genre._id } });

    return genre;
};

const deleteGenre = async (genreId) => {
    const genre = await Genre.findById(genreId);
    await genre.remove();
    return genre;
};


module.exports = {
    getGenres,
    getGenre,
    createGenre,
    updateGenre,
    deleteGenre
}
