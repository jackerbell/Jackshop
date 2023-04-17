const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session');

const createSessionStore = () => { // 세션 저장소 생성
 const MongoDbStore = mongoDbStore(expressSession); 

const store =  new MongoDbStore({ // 세션 설정
  uri: 'mongodb://localhost:27017',
  databaseName: 'online-shop', // database.js에서아 동일한 이름이어야 함
  collection: 'sessions'
 });

 return store;
}

const createSessionConfig = () => {
  return {
    secret: 'super-secret',
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000
    }
  };
}

module.exports = createSessionConfig;