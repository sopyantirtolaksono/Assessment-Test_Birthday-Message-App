import express from "express";
import db from "./config/Database.js";
import router from "./routes/index.js";
import cron from "node-cron";
import { sendBirthdayMessages } from "./schedule/index.js";

// Init app
const app = express();

// Check database connection and synchronize model with database
try {
    db.authenticate();
    console.log("Database connected!");
    db.sync();
} catch(error) {
    console.error(error);
}

app.use(express.json());
app.use(router);

// Send birthday messages on schedule
cron.schedule("0 9 * * *", () => {
    sendBirthdayMessages();
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));