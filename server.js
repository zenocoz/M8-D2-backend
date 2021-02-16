var express = require("express");
var cors = require("cors");
var join = require("path").join;
var listEndpoints = require("express-list-endpoints");
var mongoose = require("mongoose");
var usersRouter = require("./src/services/users");
var _a = require("./src/services/errorHandlers"), notFoundHandler = _a.notFoundHandler, forbiddenHandler = _a.forbiddenHandler, badRequestHandler = _a.badRequestHandler, genericErrorHandler = _a.genericErrorHandler;
var server = express();
server.use(cors());
var port = process.env.PORT || 3005;
// const staticFolderPath = join(__dirname, "../public")
// server.use(express.static(staticFolderPath))
server.use(express.json());
server.use("/users", usersRouter);
// ERROR HANDLERS MIDDLEWARES
server.use(badRequestHandler);
server.use(forbiddenHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);
console.log(listEndpoints(server));
// mongoose.set("debug", true)
mongoose
    .connect("mongodb://localhost:27017/TestAuth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(server.listen(port, function () {
    console.log("Server running on port", port);
}))["catch"](function (err) { return console.log(err); });
