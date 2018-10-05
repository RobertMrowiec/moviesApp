module.exports.defaultResponse = (func) => {
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

module.exports.getFilters = (query) => {
    if (!query.filterBy && !query.filter) return {}
    const filterBy = query.filterBy
    const filter = query.filterValue
    
    return { [filterBy]: filter }
}