import mongoose from "mongoose";

const URL_DEV_CLOUD = process.env.DB_URL_TB_CLOUD;
const URL_DEV_LOCAL = process.env.DB_URL_TB_LOCAL;

mongoose.connect(`${URL_DEV_CLOUD}`, {}, (err) => {
  if (err) throw err;
  console.log("Mongod connection ");
});

//  useCreateIndex: true,
//     useFindAndModify: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
