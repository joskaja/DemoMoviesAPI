const Director = require('../models/directorModel');
const Movie = require('../models/movieModel');


const getDirector = async (directorId) => {
    const director = await Director.findById(directorId);
    return director;
};

const getDirectors = async () => {
    const directors = await Director.find();
    return directors;
};


const createDirector = async (directorData) => {
    const director = await new Director(directorData);

    await Movie.updateMany({ _id: director.movies }, { director: director._id });

    director.save();
    return director;
};


const updateDirector = async (directorId, directorData) => {
    const director = await Director.findByIdAndUpdate(directorId, directorData, { new: true });

    await Movie.updateMany({ _id: director.movies }, { $set: { director: director._id } });

    return director;
};


const deleteDirector = async (directorId) => {
    const director = await Director.findById(directorId);
    await director.remove();
    return director;
};


module.exports = {
    getDirectors,
    createDirector,
    getDirector,
    updateDirector,
    deleteDirector
}
