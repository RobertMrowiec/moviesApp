require('./app')('mongodb://Robert:qwe123@ds123753.mlab.com:23753/heroku_g4zdd28c').then(app => {
    console.log("Serwer działa na porcie : 8001")
    app.listen(8001)
})