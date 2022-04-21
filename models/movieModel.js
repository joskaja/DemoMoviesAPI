const mongoose = require('mongoose');

const movieSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Film musí mít název']
        },
        description: {
            type: String
        },
        year: {
            type: String
        },
        genres: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Genre'
        }],
        director: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Director'
        }
    }
);

movieSchema.pre('remove', async function (next) {
    let movie = this;
    await movie.model('Director').updateMany(
        { movies: movie._id },
        { $pull: { movies: movie._id } }
    );
    await movie.model('Genre').updateMany(
        { movies: movie._id },
        { $pull: { movies: movie._id } },
        { multi: true }
    )
    next()
});


module.exports = mongoose.model('Movie', movieSchema);