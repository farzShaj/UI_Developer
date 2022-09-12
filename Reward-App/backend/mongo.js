const { MongoMemoryServer } = require('mongodb-memory-server');

(async () => {
  const mongod = new MongoMemoryServer({
    instance: {
      port: 27017,
      dbName: 'app-reward',
    }
  });

  const uri = await mongod.getConnectionString();
  const port = await mongod.getPort();
  const dbPath = await mongod.getDbPath();
  const dbName = await mongod.getDbName();
  console.log(uri, port, dbPath, dbName);
})();
