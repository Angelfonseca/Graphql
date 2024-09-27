// db.js
const { connect } = require("mongoose");

async function connectToDB() {
    try {
        await connect(process.env.MONGODB);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

module.exports = connectToDB;
