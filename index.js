const { ApolloServer, gql } = require('apollo-server');
const { PubSub }  = require('graphql-subscriptions');

const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const conectarDB = require('./config/db');

require('dotenv').config({path:'variables.env'});

const pubsub = new PubSub();

//Connecto to DB
conectarDB(); 


// The `listen` method launches a web server.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:{
        pubsub
    }
});


/* server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`🚀 Server ready at ${url}`);
    console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
  }); */


//Start server
server.listen().then( ({url})=> {
    console.clear();
    console.log(`Servidor listo en la URL ${url}`);
})