const characters = require("../models/characters")
const movies = require("../models/movies")
const Op = require('sequelize').Op
function pagination(limit, offset) {
    return {
        offset: offset ? offset : null,
        limit: limit ? limit : null
    }
}


const resolvers = {
    Query: {
        // ==================== characters Query ======================

        getCharacters: async (obj, { limit, offset, filter }) => {
            if (filter) {
                const { name, abilities } = filter

                if (name) {
                    return await characters.findAll({ where: { name: { [Op.like]: `%${name}%` } } })
                }

                if (abilities)
                    return await characters.findAll({ where: { abilities: { [Op.like]: `%${abilities}%` } } })

            }


            return await characters.findAll(pagination(limit, offset))


        },
        getSingleCharacter: async (obj, { id }) => {

            return await characters.findByPk(id)
        },

        // ==================== Movie Query ======================

        getMovies: async (obj, { limit, offset, filter }) => {
            if (filter) {
                const { name, releaseDate, actors } = filter

                if (name) {
                    return await movies.findAll({ where: { name: { [Op.like]: `%${name}%` } } })
                }
                if (releaseDate)
                    return await movies.findAll({ where: { releaseDate: { [Op.like]: `%${releaseDate}%` } } })

                if (actors)
                    return await movies.findAll({ where: { actors: { [Op.like]: `%${actors}%` } } })

            }

            return await movies.findAll(pagination(limit, offset))
        },

        getSingleMovie: async (obj, { id }) => {
            return await movies.findByPk(id)

        }






    },
    Mutation: {
        deleteCharacter: async (obj, { id }) => {
            return await characters.destroy({ where: { id } })

        },

        updateCharacter: async (obj, { id, name, abilities, description }) => {
            const fetchCharacter = await characters.findByPk(id)
            if (!fetchCharacter)
                return "the provided id does not exist"

            const character = characters.update({
                name: name ? name : fetchCharacter.name,
                abilities: abilities ? abilities : fetchCharacter.abilities,
                description: description ? description : fetchCharacter.description

            }, { where: { id } })
            return "Ok"

        },
        deleteMovie: async (obj, { id }) => {
            return await movies.findByPk(id)

        },
        updateMovie: async (obj, { id, name, releaseDate, actors }) => {
            const fetchMovie = await movies.findByPk(id)
            if (!fetchMovie)
                return "the provided id does not exist"

            const movie = movies.update({
                name: name ? name : fetchMovie.name,
                releaseDate: releaseDate ? releaseDate : fetchMovie.releaseDate,
                actors: actors ? actors : fetchMovie.actors
            }, { where: { id } })
            return "ok"

        }

    }
}


module.exports = resolvers