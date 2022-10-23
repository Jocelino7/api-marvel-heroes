function validateCharacterFields(req, res, next) {
    try {

        const { name, abilities, description } = req.body
        const pattern = /jpg|png|jpeg/
        if (name.length === 0) {

            res.status(400).json({ error: "name Field Cannot Be Empty" })
        }
        if (abilities.length === 0)
            return res.status(400).json({ error: "abilities Field Cannot Be Empty" })
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
module.exports = validateCharacterFields