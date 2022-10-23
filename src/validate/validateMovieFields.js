function validateMovieFields(req, res, next) {
    const pattern = /jpg|png|jpeg/
    const { name, actors, releaseDate, description, } = req.body
    const match = /(\d{4})[-.\/](\d{2})[-.\/](\d{2})/
    try {
        if (name.length === 0) {
            return res.status(400).json({ error: "name field cannot be empty" })
        }
        if (actors.length === 0)
            return res.status(400).json({ error: "actors field cannot be empty" })
        if (releaseDate.length === 0)
            return res.status(400).json({ error: "releaseData field cannot be empty" })
        if (!match.test(releaseDate)) {
            return res.status(400).json({ error: "date field is not in format yyyy/mm/dd or it's not a date" })

        }
        if (!req.file)
            return res.status(400).json({ error: "could not find any image file" })
        if (description.lenght === 0)
            return res.status(400).json({ error: "description field cannot be empty" })
        if (!pattern.test(req.file.mimetype))
            return res.status(400).json({ error: "unsuported mimetype" })
        next()

    }
    catch (error) {
        console.log("something went wrong " + error)
        res.status(500).json({ error: error })

    }



}
module.exports = validateMovieFields