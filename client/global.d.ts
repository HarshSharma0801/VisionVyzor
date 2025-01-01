declare namespace NodeJS {
    interface Global {
      _mongoClientPromise: Promise<MongoClient>;
    }
  }
  
  interface CustomGlobal extends NodeJS.Global {
    _mongoClientPromise: Promise<MongoClient>;
  }
  
  declare var global: CustomGlobal;
  