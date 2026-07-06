const mongoose = require("mongoose");
const dns = require("dns");

// Use Google's DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    console.log("Using DNS:", dns.getServers());
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("====================================");
    console.log("✅ MongoDB Connected Successfully");
    console.log("Database Name:", mongoose.connection.name);
    console.log("Database Host:", mongoose.connection.host);
    console.log("Database Ready State:", mongoose.connection.readyState);
    console.log("====================================");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;