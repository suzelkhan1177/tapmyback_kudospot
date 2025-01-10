const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.join(__dirname, "./.env") });

const User = require("./modals/user");
const Kudo = require("./modals/kudo");
const Badge = require("./modals/badge");

mongoose.connect('mongodb+srv://suzel:nzq3h8RYBDsGXB6W@kudospot.hd4ly.mongodb.net/?retryWrites=true&w=majority&appName=KudoSpot').then(() => {
  fs.readFile(
    path.join(__dirname, "dump.json"),
    "utf8",
    async (err, dumpData) => {
      const data = JSON.parse(dumpData);
      const userCnt = await User.countDocuments();
      if (userCnt === 0) {
        await User.insertMany(data.users);
        await Badge.insertMany(data.badges);
      }
      console.log("Database seeded successfully");
    }
  );
});
