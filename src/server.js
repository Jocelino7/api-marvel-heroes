//================ imports ===================
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/db")
const app = express();
const {ApolloServer} = require('apollo-server-express')
const typeDefs = require("./schema/typeDef")
const resolvers = require('./schema/resolvers')
const port = process.env.PORT

//================== ends imports ===================

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

async function startServer(){
    const server = new ApolloServer({typeDefs,resolvers})
    await server.start()
    server.applyMiddleware({app})

}
startServer()




db.sync().then(app.listen(port,()=>console.log(`server running on port ${port}`)));
