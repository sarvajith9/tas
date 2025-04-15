const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/index');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('js-yaml');
const app = express();

const swaggerDocument = yaml.load(fs.readFileSync('./swagger.yaml', 'utf8'));

dotenv.config();

app.use(cors('*'));
app.use(express.json());

app.use('/api/v1', apiRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => {
  res.send(`<html><head><title>SecNode MSA Backend</title><style>body {display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: rgba(0, 221, 255, 0.28); font-family: Arial, sans-serif;} .button {display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px; transition: background-color 0.3s ease;} .button:hover {background-color: #45a049;}</style></head><body><h1>SecNode Mobile Security Analysis Backend</h1><a href="/docs" class="button">API Docs</a></body></html>`);
      });

module.exports = app;
