const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

const connectToDatabase = async (req,res) => {
  const client = (await MongoClient.connect('mongodb://localhost:27017'));
  database = client.db('online-shop'); // 미리 db 생성할 필요없이 사용선언시 자동으로 db 생성됨..
}

const getDb = () =>{
  if(!database){
    throw new Error('You must connect first!');
  }

  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb
}