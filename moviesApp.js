require('./app')('mongodb://localhost/moviesapp').then(app => {
    console.log("Server is running (locally) on port: 8001")
    app.listen(process.env.PORT || 8001)
})