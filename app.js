const path = require('path');

const express = require('express');
const csurf = require('csurf');
const expressSession = require('express-session');


const createSessionConfig = require('./config/session');
const db = require('./data/database');
const addCsrfTokenMiddleware = require('./middleware/csrf-token');
const errorHandleerMiddleware = require('./middleware/error-handler');
const checkAuthStatusMiddleware = require('./middleware/check-auth');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static('public'));
app.use('/products/assets',express.static('product-data'));
app.use(express.urlencoded({extended:false})); // 구성이 있는 함수 객체를 전달할 수 있음, form에서 보낸걸 req.body~형태로 받을 수 있게해줌.

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csurf());

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);
app.use('/admin',adminRoutes); // /admin으로 시작되는 경로만 라우트 구성에 포함됨, 파일 내부에서 해당 경로 생략가능


app.use(errorHandleerMiddleware);

db.connectToDatabase()
  .then(()=>{
    app.listen(3000);
  })
  .catch((error)=>{
    console.log('faled to connect to database!');
    console.log(error)
  }); //async 는 항상 promise를 반환한다. 