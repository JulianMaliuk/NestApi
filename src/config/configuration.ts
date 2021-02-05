export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    mongoDB: process.env.MONGODB_URI || 'mongodb://localhost/nest-db-01'
  }
});