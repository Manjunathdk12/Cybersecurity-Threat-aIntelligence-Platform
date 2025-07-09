// const mysql = require('mysql2');
// const dotenv = require('dotenv');
// dotenv.config();

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed:', err);
//     process.exit(1);
//   }
//   console.log('Connected to MySQL');
// });

// module.exports = db;


// // const mysql = require("mysql2");
// // const dotenv = require("dotenv");
// // dotenv.config();

// // const db = mysql.createConnection({
// //   host: process.env.DB_HOST || "mysql_db",
// //   user: process.env.DB_USER,
// //   password: process.env.DB_PASS,
// //   database: process.env.DB_NAME,
// // });

// // function connectWithRetry(retries = 5, delay = 3000) {
// //   db.connect((err) => {
// //     if (err) {
// //       console.error(`❌ DB connection failed. Retries left: ${retries}`, err.message);
// //       if (retries === 0) return process.exit(1);
// //       setTimeout(() => connectWithRetry(retries - 1, delay), delay);
// //     } else {
// //       console.log("✅ Connected to MySQL");
// //     }
// //   });
// // }

// // connectWithRetry();

// // module.exports = db;


const mysql = require('mysql2');

// Load .env **only when NOT running in Docker**
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL');
});

module.exports = db;
