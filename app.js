const path = require('path');

const express = require('express');
const csurf = require('csurf');

const db = require('./data/database');
const addCsrfTokenMiddleware = require('./middleware/csrf-token');
const authRoutes = require('./routes/auth.routes');
const addCsrfToken = require('./middleware/csrf-token');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static('public'));
app.use(express.urlencoded({extended:false})); // 구성이 있는 함수 객체를 전달할 수 있음, form에서 보낸걸 req.body~형태로 받을 수 있게해줌.

app.use(csurf());

app.use(addCsrfTokenMiddleware)

app.use(authRoutes);

db.connectToDatabase()
  .then(()=>{
    app.listen(3000);
  })
  .catch((error)=>{
    console.log('faled to connect to database!');
    console.log(error)
  }); //async 는 항상 promise를 반환한다. 