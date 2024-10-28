const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.DB_NAME}`
    );
    console.log(
      "MongoDB connected !!!! at Host::",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = ConnectDB;
