const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const myConnection = require('express-myconnection');
const dotenv = require('dotenv');
const session = require('cookie-session');
const cors = require('cors');

const routerApi = require('./Domain/Services');
const app = express();
const port = process.env.PORT || 3000;

//configuraciones
dotenv.config({ path: '../env/.env'});
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(express.json());
app.use(cors())
app.use(
  myConnection(
    mysql,
    {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    })
);
app.use(express.urlencoded({ extended: false }));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//rutas
routerApi(app);
app.get('/', (req, res) => {
  res.render('home');
});
app.use(express.static(path.join(__dirname,'public')))

//iniciar servidor
app.listen(port, () => {
  console.log('Mi port ' + port);
});