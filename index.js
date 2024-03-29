const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const { port, env } = require('./config/environment');
const routes = require('./config/routes');

app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());

app.use('/api', routes);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

if (env !== 'test') app.listen(port, () => console.log(`Express is listening on port ${port}`));
