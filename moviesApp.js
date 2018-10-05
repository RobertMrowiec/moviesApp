require('./app')('mongodb://localhost/movieapp').then(app => {
    console.log("Server is running (locally) on port: 8001")
    app.listen(process.env.MONGODB_URI)
})