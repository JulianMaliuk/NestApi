export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    mongoDB: process.env.MONGODB_URI || 'mongodb://localhost/nest-db-01'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'some else',
    expiresIn: process.env.JWT_EXPIRES_IN || '1y'
  },
});