const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () =>
  console.log("CONNECTION ESTABLISHED")
);

mongoose.connection.on("error", () =>
  console.log("CONNECTION FAILED hhehehehehehhehe............hehe CHEH")
);

