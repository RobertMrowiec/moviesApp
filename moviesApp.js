require('./app')('mongodb://Robert:qwe123@ds123753.mlab.com:23753/heroku_g4zdd28c').then(app => {
    console.log("Server is running (locally) on port: 8001")
    app.listen(process.env.MONGODB_URI || url)
})