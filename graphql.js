const { gql } = require('apollo-server-express');
const { getDirectors, getDirector, createDirector, updateDirector, deleteDirector } = require('./controllers/directorController');
const { getGenres, getGenre, createGenre, updateGenre, deleteGenre } = require('./controllers/genreController');
const { getMovies, getMovie, createMovie, updateMovie, deleteMovie } = require('./controllers/movieController');

const typeDefs = gql`

    type Movie {
        id: ID!
        name: String!
        description: String
        year: Int
        director: Director!
        genres: [Genre!]
    }

    input CreateMovieInput {
        name: String!
        description: String
        year: Int
        director: ID!
        genres: [ID!]
    }

    input UpdateMovieInput {
        id: ID!
        name: String
        description: String
        year: Int
        director: ID
        genres: [ID]
    }

    type Director {
        name: ID!
        countryOfOrigin: String
        dateOfBirth: String
        movies: [Movie!]
    }

    input CreateDirectorInput {
        name: ID!
        countryOfOrigin: String = "USA"
        dateOfBirth: String
        movies: [ID!]
    }

    input UpdateDirectorInput {
        name: ID!
        countryOfOrigin: String
        dateOfBirth: String
        movies: [ID!]
    }

    type Genre {
        id: ID!
        name: String!
        movies: [Movie!]
    }

    input CreateGenreInput {
        name: String!
        movies: [ID!]
    }

    input UpdateGenreInput {
        id: ID!
        name: String
        movies: [ID!]
    }

    type Query {
        movies: [Movie]
        movie(id: ID!): Movie 
        directors: [Director]
        director(id: ID!): Director
        genres: [Genre]
        genre(id: ID!): Genre
    }

    type Mutation {
        createMovie(input: CreateMovieInput!): Movie!
        updateMovie(input: UpdateMovieInput!): Movie!
        deleteMovie(id: ID!): Movie!
        createDirector(input: CreateDirectorInput!): Director!
        updateDirector(input: UpdateDirectorInput!): Director!
        deleteDirector(id: ID!): Director!
        createGenre(input: CreateGenreInput!): Genre!
        updateGenre(input: UpdateGenreInput!): Genre!
        deleteGenre(id: ID!): Genre!
    }

    type Subscription {
        movieAdded: Movie!
    }
`;

const resolvers = {
    Query: {
        movies: () => {
            return getMovies();
        },
        movie: (_, args) => {
            return getMovie(args.id);
        },
        directors: () => {
            return getDirectors();
        },
        director: (_, args) => {
            return getDirector(args.id);
        },
        genres: () => {
            return getGenres();
        },
        genre: (_, args) => {
            return getGenre(args.id);
        }
    },
    Mutation: {
        createMovie: async (parent, args) => {
            const movieData = args.input;
            return await createMovie(movieData);
        },
        updateMovie: async (parent, args) => {
            const { id, ...movieData } = args.input;
            return await updateMovie(id, movieData);
        },
        deleteMovie: async (parent, args) => {
            const id = args.id;
            return await deleteMovie(id);
        },
        createDirector: async (parent, args) => {
            const directorData = args.input;
            return await createDirector(directorData);
        },
        updateDirector: async (parent, args) => {
            const { id, ...directorData } = args.input;
            return await updateDirector(id, directorData);
        },
        deleteDirector: async (parent, args) => {
            const id = args.id;
            return await deleteDirector(id);
        },
        createGenre: async (parent, args) => {
            const genreData = args.input;
            return await createGenre(genreData);
        },
        updateGenre: async (parent, args) => {
            const { id, ...genreData } = args.input;
            return await updateGenre(id, genreData);
        },
        deleteGenre: async (parent, args) => {
            const id = args.id;
            return await deleteGenre(id);
        }
    },
    Movie: {
        genres: async (movie) => {
            await movie.populate('genres');
            return movie.genres;
        },
        director: async (movie) => {
            await movie.populate('director');
            return movie.director;
        }
    },
    Director: {
        movies: async (director) => {
            await director.populate('movies');
            return director.movies;
        }
    },
    Genre: {
        movies: async (genre) => {
            await genre.populate('movies');
            return genre.movies;
        }
    }
};


module.exports = {
    typeDefs,
    resolvers
}   