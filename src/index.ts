import express from 'express';
import  { executeQuery } from './config/database';
import { routes } from './routes';
import errorMiddleware from './middlewares/ErrorMiddleware';
import cors from 'cors';
import logMiddleware from './middlewares/LogMiddleware';
import MulterMiddleware from './middlewares/MulterMiddleware';

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const host = process.env.HOST;
const port = process.env.PORT;
const appPort = process.env.APP_PORT;

const app = express();
app.use(logMiddleware.requestHandler);

// app.use(cors({
//   origin: `http://${host}:${appPort}`
// }));

app.use(express.json());
const multerMiddleware = new MulterMiddleware()
app.use(multerMiddleware.upload.any()); 

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "FunkToon REST API for Swagger Documentation",
      version: "1.0.0",
    },
    schemes: ["http", "https"],
    servers: [{ url: `http://localhost:3001/` }],
  },
  apis: [
    `${__dirname}/routes/*.ts`    
  ],
};
const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(routes); 

app.get('/ping', async (req, res) => {
  try {
    console.log('Trying to connect to the database');    
    await executeQuery('SELECT 1 + 1 AS solution');
    console.log('Successfully connected to the database');
    res.send('Successfully connected to the database');

  } catch (error) {    
    console.log('Unable to connect to the database');
    res.status(500).send('Unable to connect to the database');
  }
});

//The 404 Route
app.all('*', function(req, res){
  logMiddleware.notify(
    'Not Found',
    {
      context: { method: 'NotFound', headers: req.headers, body: req.body },                    
    }
  )
  res.status(404).send('Not Found');
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(logMiddleware.errorHandler); 