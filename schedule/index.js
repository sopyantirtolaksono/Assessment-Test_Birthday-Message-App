import axios from "axios";
import moment from "moment-timezone";
import Users from "../models/UserModel.js";
import sequelize from "sequelize";

// Init default timezone
const defaultTimezone = "UTC";

// Sending birthday message
const sendBirthdayMessage = async (user) => {
    try {
        const userTimezone = user.location || defaultTimezone;
        const birthday = moment(user.birthday_date).tz(userTimezone);
        const currentTime = moment().tz(userTimezone);

        // If it's a birthday and the current time is 9 a.m. or later
        if(birthday.date() === currentTime.date() && currentTime.hours() >= 9) {
            // Send birthday message
            const mail = user.email;
            const msg = `Hey, ${user.first_name} ${user.last_name} it's your birthday!`;
            await axios.post("https://email-service.digitalenvision.com.au/send-email", {
                email: mail,
                message: msg
            })
            .then(response => {
                console.log(response.config.data);
            })
            .catch(error => {
                console.error(error);
            });
        };
    } catch(error) {
        console.error(error.message);
    }
};

// Sending birthday messages to all users who have a birthday today
export const sendBirthdayMessages = async () => {
    try {
        const today = moment().format("MM-DD");
        const users = await Users.findAll({
            where: sequelize.where(sequelize.fn("DATE_FORMAT", sequelize.col("birthday_date"), "%m-%d"), today)
        });
        users.forEach(sendBirthdayMessage);
    } catch(error) {
        console.error(error.message);
    };
};