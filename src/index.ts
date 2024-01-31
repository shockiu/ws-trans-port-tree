require('dotenv').config();
import express from 'express';
import cors from 'cors';
import routes from './routes/index.routes';
import { runningJobs } from './handler/index.handler';

const app = express();
const PORT = process.env.PORT_API;
app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.listen(PORT, () => {
    console.log('⚡ Server ready on port ' + PORT);
});

runningJobs();