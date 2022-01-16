const StudentController = require('./controllers/StudentController')
const StationController = require("./controllers/StationController");
const ResultController = require("./controllers/ResultController");

module.exports = (app) => {
    app.get('/status', (req, res) => {
        console.log("Hi there!")
        res.send({
            message: 'Hello, world!'
        })
    })

    app.get('/students/show/:number', StudentController.showList)

    app.post('/students/new', StudentController.newStudent)

    app.get('/students/find/:id', StudentController.find)

    app.post('/students/edit/:id', StudentController.edit)

    app.delete('/students/delete/:id', StudentController.delete)

    app.get('/stations/show/:number', StationController.showList)

    app.post('/stations/new', StationController.newStation)

    app.post('/stations/edit/:id', StationController.edit)

    app.get('/stations/find/:id', StationController.find)

    app.delete('/stations/delete/:id', StationController.delete)

    app.get('/results/show/:number', ResultController.showList)

    app.post('/results/new', ResultController.newResult)

    app.post('/results/edit/:studentid&:stationid', ResultController.edit)

    app.delete('/results/delete/:studentid&:stationid', ResultController.delete)
}