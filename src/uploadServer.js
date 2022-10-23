//==================== imports =======================
const express = require("express"),
    bodyParser = require("body-parser"),
    uuid = require("uuid"),
    characters = require("./models/characters"),
    movies = require("./models/movies"),
    validateCharacterFields = require("./validate/validateCharacterFields.js"),
    validateMovieFields = require("./validate/validateMovieFields.js"),
    storage = require("./storage/storage.js"),
    multer = require("multer"),
    fs = require("fs")
    cors = require("cors")
//==================== ends imports  =======================

const app = express(),
    upload = multer({ storage: storage, })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    origin:"*",
    method:["GET","POST"],
}))


app.post("/upload/character", upload.single("image"), validateCharacterFields, (req, res) => {

    (async () => {
        try {
            const data = {
                id: uuid.v4(),
                name: req.body.name,
                image: req.file.filename,
                abilities: req.body.abilities,
                description: req.body.description,
            }
            const character = await characters.create(data)
            res.sendStatus(201)


        }
        catch (error) {
            console.log("something went wrong while creating new data on character endpoint: " + error)
            res.status(400).json({ error: error.errors[0].message })

        }

    })()

}

)

app.post("/upload/movie", upload.single("image"), validateMovieFields, (req, res) => {

    (async () => {
        try {
            const data = {
                id: uuid.v4(),
                name: req.body.name,
                actors: req.body.actors,
                image: req.file.filename,
                releaseDate: req.body.releaseDate,
                description: req.body.description,
            }
            const movie = await movies.create(data)
            res.sendStatus(201)

        }
        catch (error) {
            console.log("something went wrong while creating new data on movie endpoint: " + error)
            res.status(400).json({ error: error.errors[0].message })
        }


    })()

}

)
app.get("/upload/:image", (req, res) => {
    const image = req.params.image
    fs.readFile(`./uploads/${image}`,(err,data)=>{
        if(err)
            return res.sendStatus(400)

        res.writeHead(200,{"Content-Type":"image/jpg"})

        res.end(data)
        
        
    })


})

module.exports = app