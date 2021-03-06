const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const cors = require('cors');

const connectDB = require('./config/db');
const { handleError } = require('./middleware/errorMiddleware');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { typeDefs, resolvers } = require('./graphql');


const app = express();
app.use(cors())
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/rest', require('./rest'));
app.use(handleError);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
});
server.start().then(() => {
    server.applyMiddleware({
        app,
        path: '/graphql'
    });
    app.listen(port, () => console.log(`Server started on port http://localhost:${port} and GraphQL on ${server.graphqlPath}`));
});



