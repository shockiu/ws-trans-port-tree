import express from 'express';
import cors from 'cors';
import routes from './routes/index.routes';
import { job } from './handler/ws.handler';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.listen(PORT, () => {
    console.log('Server ready on port ' + PORT);
});


job.start()