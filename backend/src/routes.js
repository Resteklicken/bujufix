module.exports = (app) => {
    app.get('/status', (req, res) => {
        console.log("Hi there!")
        res.send({
            message: 'Hello, world!'
        })
    })
}