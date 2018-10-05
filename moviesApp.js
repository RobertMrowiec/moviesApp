require('./app')('mongodb://localhost/moviesapp').then(app => {
    console.log("Serwer działa na porcie : 8001")
    app.listen(process.env.PORT || 8001)
})