//================ imports ===================
const db = require("./db/db")
const app = require("./uploadServer")
const {ApolloServer} = require('apollo-server-express')
const typeDefs = require("./schema/typeDef")
const resolvers = require('./schema/resolvers')
const port = process.env.PORT || 4000

//================== ends imports ===================

async function startServer(){
    const server = new ApolloServer({typeDefs,resolvers})
    await server.start()
    server.applyMiddleware({app})

}
startServer()




db.sync().then(app.listen(port,()=>console.log(`server running on port ${port}`)));
