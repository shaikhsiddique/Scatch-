const express  = require('express');
const app = express();
require('dotenv').config();

const cookie_parser = require('cookie-parser');
const path = require('path');
const expressSession = require('express-session');
const flash = require('connect-flash');



const db= require('./config/mongoose-connet')

const userRouter = require('./routes/usersRouter');
const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const indexRouter = require('./routes/index');
const isLoggedIn = require('./middleware/isLoggedin');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookie_parser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());



app.use('/',indexRouter);
app.use('/owners',ownersRouter);
app.use('/products', productsRouter);
app.use('/users',userRouter);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});