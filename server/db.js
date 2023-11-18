const { MongoClient } = require('mongodb');

const URL = 'mongodb+srv://admin:12345@cluster0.fte6pzw.mongodb.net/?retryWrites=true&w=majority';

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    MongoClient
      .connect(URL)
      .then((client) => {
        console.log('Connected to MongoDB');
        dbConnection = client.db('project');
        return cb();
      })
      .catch((err) => {
        return cb(err);
      });
  },
  getDb: () => dbConnection,
}