import express from 'express';
import expressSession from 'express-session';
import getConfig from 'config';
import { initializeDB } from './db';

const bodyParser = require('body-parser');

const cors = require('cors');

const { port } = getConfig();

const app = express();

app.use(expressSession({
  secret: 'isSecret',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

// creating Server
const initializeServer = async (routes) => {
  // initialize DB
  await initializeDB();

  // json parse
  app.use(express.json());

  // set urls
  app.use(routes);

  // create express app
  app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
  });
};

export default initializeServer;
