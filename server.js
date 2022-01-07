/* eslint-disable */
const express = require('express')
const app = express()

const cors = require('cors')

const router = require('./src/Controllers/tournamentController')


const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');

const port = 8080



// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
// TracingHandler creates a trace for every incoming request

// Middlewares
app.use(express.json())
app.use(router)
app.use(cors({origin: '*'}));



// The error handler must be before any other error middleware and after all controllers
// Par défaut, errorHandlerne capture que les erreurs avec un code d'état 500supérieur ou égal à (voir doc pour modifier)

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.use(
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

app.listen(port, () => {
  console.log(`Run at http://localhost:${port}`)
})

module.exports = app;
