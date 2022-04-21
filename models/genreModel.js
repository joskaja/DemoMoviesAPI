const mongoose = require('mongoose');

const genreSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Žánr musí mít název']
        },
        movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
    }
);

genreSchema.pre('remove', async function (next) {
    let genre = this;
    await genre.model('Movie').updateMany(
        { genres: genre._id },
        { $pull: { genres: genre._id } }
    );
    next()
});

module.exports = mongoose.model('Genre', genreSchema);