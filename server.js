var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var storeRoute = require('./Route/storeRoute');
var bookRoute = require('./Route/bookRoute');
var userRoute = require('./Route/userRoute');
var loginRoute = require('./Route/loginRoute');
var uploadRoute = require('./Route/uploadRoute');
var exportRoute = require('./Route/exportRoute');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');

var app = express();
const {Server} = require('socket.io');

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.get('/', (req, res) =>{
//     res.send('server is listen on port 3000');
// });

//expose node module as a staticresource
app.use('/static', express.static('node_modules'));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.use("/api/v1", storeRoute);
app.use("/api/v1", bookRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", loginRoute);
app.use("/api/v1", uploadRoute);
app.use('/api/v1', exportRoute);


const server = app.listen(3000, () =>{
    console.log("server started.....");
});

//initialize & listen to server
const io = new Server(server);

//handle connection
io.on("connection", (socket)=>{
    console.log('connected successfully to the socket...');

    setInterval(() => {
        var news = getNews();
        //send news on the socket
        socket.emit('news', news);
        
    }, 5000);

    socket.on('on my other events', (data)=>{
        console.log(data);
    });
});

function getNews(){
    var length = Math.floor(Math.random() * 21);
    var news = [];
    for (let i = 0; i < length; i++) {
        var val = {id: i, title: 'new feed news data '};
        news.push(val);
    }
    return news;
}

module.exports = app;