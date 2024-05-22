const express  = require('express');
const app = express();

const cookie_parser = require('cookie-parser');
const path = require('path');

const user_model = require('./models/user-model');
const owner_model = require('./models/owner-model');
const product_model = require('./models/product-model');
const db= require('./config/mongoose-connet')

const userRouter = require('./routes/usersRouter');
const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookie_parser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hey its Working');
});

app.use('/owners',ownersRouter);
app.use('/products', productsRouter);
app.use('/users',userRouter);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});