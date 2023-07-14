import 'dotenv/config';
import app from "./app";
import url from "./db/connect"
import mongoose from 'mongoose'
import env from "./util/validateEnv";

const port = env.PORT

const start = async () => {
    try {
      await mongoose.connect(url)
      app.listen(port, () => {
        console.log(`server is listening on port ${port}`);
      });
    } catch (error) {
      console.log(error);
    }
  };

start()


