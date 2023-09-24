var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var storeRoute = require('./Route/storeRoute');
var bookRoute = require('./Route/bookRoute');
var userRoute = require('./Route/userRoute');
var loginRoute = require('./Route/loginRoute');
var seaggerUi = require('swagger-ui-express');
var seaggerDocument = require('./swagger.json');


var app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

//swagger
app.use('/api-docs', seaggerUi.serve, seaggerUi.setup(seaggerDocument));

app.get('/', (req, res) =>{
    res.send('server is listen on port 3000');
});

app.use("/api/v1", storeRoute);
app.use("/api/v1", bookRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", loginRoute);



app.listen(3000, () =>{
    console.log("server started.....");
});

module.exports = app;