const express = require('express');
const asyncHandler = require('express-async-handler');
const { getDirectors, createDirector, getDirector, updateDirector, deleteDirector } = require('./controllers/directorController');
const { getGenres, createGenre, updateGenre, deleteGenre, getGenre } = require('./controllers/genreController');
const { getMovies, createMovie, deleteMovie, updateMovie, getMovie } = require('./controllers/movieController');
const router = express.Router();


router.get('/movies/:id', asyncHandler(async (req, res) => {
    res.json(await getMovie(req.params.id));
}));

router.get('/movies', asyncHandler(async (req, res) => {
    res.json(await getMovies());
}));

router.post('/movies', asyncHandler(async (req, res) => {
    res.json(await createMovie(req.body));
}));

router.patch('/movies/:id', asyncHandler(async (req, res) => {
    res.json(await updateMovie(req.params.id, req.body));
}));

router.delete('/movies/:id', asyncHandler(async (req, res) => {
    res.json(await deleteMovie(req.params.id));
}));



router.get('/directors/:id', asyncHandler(async (req, res) => {
    res.json(await getDirector(req.params.id))
}));
router.get('/directors', asyncHandler(async (req, res) => {
    res.json(await getDirectors());
}));
router.post('/directors', asyncHandler(async (req, res) => {
    res.json(await createDirector(req.body));
}));
router.patch('/directors/:id', asyncHandler(async (req, res) => {
    res.json(await updateDirector(req.params.id, req.body));
}));
router.delete('/directors/:id', asyncHandler(async (req, res) => {
    res.json(await deleteDirector(req.params.id));
}));


router.get('/genres/:id', asyncHandler(async (req, res) => {
    res.json(await getGenre(req.params.id));
}));
router.get('/genres', asyncHandler(async (req, res) => {
    res.json(await getGenres());
}));
router.post('/genres', asyncHandler(async (req, res) => {
    res.json(await createGenre(req.body));
}));
router.patch('/genres/:id', asyncHandler(async (req, res) => {
    res.json(await updateGenre(req.params.id, req.body));
}));
router.delete('/genres/:id', asyncHandler(async (req, res) => {
    res.json(await deleteGenre(req.params.id));
}));

module.exports = router
