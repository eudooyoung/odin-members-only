const config = {
  // common
  port: parseInt(process.env.PORT),
  sessionSecret: process.env.SESSION_SECRET,
  memberCode: process.env.MEMBER_CODE,
  adminCode: process.env.ADMIN_CODE,

  // db
  dbEnv: process.env.DB_ENV,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PW,
  dbHost: process.env.DB_HOST,
  dbPort: parseInt(process.env.DB_PORT),
  dbName: process.env.DB_NAME,
};

export default config;
