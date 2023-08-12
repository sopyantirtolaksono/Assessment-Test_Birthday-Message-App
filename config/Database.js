import { Sequelize } from "sequelize";

// Setup connection to database
const db = new Sequelize("birthday", "root", "", {
    host: "localhost",
    dialect: "mysql"
});

export default db;