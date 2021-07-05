const express = require('express');
const path = require('path');
const cors = require('cors')
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require("helmet");  


const models = require('./models/');







//initialize route

const businessAccountRoute = require('./routes/businessAccount');
const hotelRoute = require('./routes/hotel/hotel');
const roomRoute = require('./routes/hotel/room');

const app = express();
app.use(cors())
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());

app.use('./uploads/',express.static('uploads'));
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true}
}));

app.use('/kaduna', businessAccountRoute);
app.use('/kaduna', hotelRoute);
app.use('/kaduna', roomRoute);
//use route



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, ')
        return res.status(200).json({});
    }
    next();
})


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error); 
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

models.sequelize
  .authenticate()
  .then( ()=> {
    console.log('Connection successful');
  })
  .catch((error)=> {
    console.log("Error creating connection:", error);
  });

module.exports = app;
