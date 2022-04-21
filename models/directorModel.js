const mongoose = require('mongoose');

const directorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Film musí mít název']
        },
        countryOfOrigin: {
            type: String
        },
        dateOfBirth: {
            type: Date
        },
        movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
    }
);

directorSchema.pre('remove', async function (next) {
    let director = this;
    await director.model('Movie').updateMany(
        { director: movie._id },
        { $set: { director: null } }
    )
    next()
});

module.exports = mongoose.model('Director', directorSchema);