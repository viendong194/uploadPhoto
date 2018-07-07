import express from 'express';
import routes from './routes/';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cloudinary from 'cloudinary';
import { dbURL, cloud_config } from './config';

const app = express();
const router = express.Router();

/** configure cloudinary */
cloudinary.config(cloud_config);

/** connect to MongoDB datastore */
try {
  mongoose.connect(
    dbURL,
    {
      //useMongoClient: true
    }
  );
} catch (error) {}

let port = 5000 || process.env.PORT;
/** set up routes {API Endpoints} */
routes(router);

/** set up middlewares */
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
//app.use('/static',express.static(path.join(__dirname,'static')))

app.use('/api', router);

/** start server */
app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
