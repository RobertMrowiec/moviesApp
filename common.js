module.exports = defaultResponse = (func) => {
    return (req, res) => func(req, res) 
        .then(x => res.status(200).json(x))
        .catch(err => {
            if (err instanceof Error || err instanceof TypeError) {
                console.log(err)
                err = err.message
            }
            return res.status(400).json({ message: err })
        })
}