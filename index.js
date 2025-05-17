const express = require('express');
const {ApolloServer} = require("@apollo/server");
const {expressMiddleware} = require("@apollo/server/express4");
const cors = require('cors');

async function startServer(){
    const app = express();
    app.use(express.json());
    app.use(cors());

    // Create Apollo Server instance
    const server = new ApolloServer({
        typeDefs:`
            type Todo{
                id: ID!
                title: String!
                completed: Boolean
            }
            
            type Query{
                getTodos: [Todo]
            }
        `,
        resolvers: {
            Query: {
                getTodos: () => {
                    // Return some sample todos
                    return [
                        {
                            id: "1",
                            title: "Learn GraphQL",
                            completed: false
                        },
                        {
                            id: "2",
                            title: "Build an API",
                            completed: false
                        }
                    ];
                }
            }
        },
    });

    // Start Apollo Server
    await server.start();

    // Mount Apollo Server middleware
    app.use('/graphql', expressMiddleware(server));

    app.listen(8000, () => console.log("Server is running on port 8000"));
}

startServer();
