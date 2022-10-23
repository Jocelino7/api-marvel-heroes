const { gql } = require('apollo-server-express')
const typeDef = gql`
type Query{
     getCharacters(limit:Int,offset:Int,filter:filterCharacter):[Character]
     getSingleCharacter(id:String!):Character,
     getMovies(limit:Int,offset:Int,filter:filterMovie):[Movie]
     getSingleMovie(id:String!): Movie

    # filterCharacter(name:String,abilities:String):[Character]
     

}

type Character{
  id:String,
  name:String,
  abilities:String,
  image:String
  description:String,

 },
 type Movie {
    id: String
    name:String,
    
    image:String,
    releaseDate:String,
    actors:String,
  
    description:String

 }
 input filterCharacter{
  name:String,
  abilities:String
 }

 input filterMovie{
  name:String,
  releaseDate:String,
  actors:String
 }


type Mutation {
     deleteCharacter(id:String!):String,
     updateCharacter(id:String!,name:String,abilities:String,description:String):String
     deleteMovie(id:String!):String,
     updateMovie(id:String!,name:String,releaseDate:String,actors:String):String
 }
 


`
module.exports = typeDef