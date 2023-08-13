import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Setup connection to database
const dbHost        = process.env.DB_HOST;
const dbUser        = process.env.DB_USER;
const dbPassword    = process.env.DB_PASSWORD;
const dbName        = process.env.DB_NAME;
const dbDialect     = process.env.DB_DIALECT;

const db = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDialect
});

// Check connection to database
export const checkDbConnection = async () => {
    try {
        await db.authenticate();
        console.log("Database connected!");
    } catch(error) {
        console.error("Database connection error: ", error);
    }
}

// Model synchronization with database
export const syncDbModel = async () => {
    try {
        await db.sync();
        console.log("Database model synchronized!");
    } catch(error) {
        console.error("Database model synchronization error: ", error);
    }
}

export default db;