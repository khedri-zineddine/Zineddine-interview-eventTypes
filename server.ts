import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import createError from 'http-errors';
import { serverPort } from './envVariablesConfig';
import errorHandler from './src/_middleware/error-handler';

const app = express();

/**
 * Parse incoming request bodies in a middleware to be availabe under the req.body property.
 * http://expressjs.com/en/resources/middleware/body-parser.html
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
 * https://www.npmjs.com/package/cookie-parser
 */
app.use(cookieParser());

/**
 * Allow cors requests from any origin and with credentials.
 */
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

/**
 * API routes.
 */
// app.use('/v1/api/eventTypes', eventTypesRoutes);

/**
 * Swagger docs route.
 */
// app.use('/v1/api-docs', swagger);

/**
 * Not found routes.
 */
app.use((req, res, next) => {
  next(createError(404));
});

/**
 * Global error handler.
 */
app.use(errorHandler);

/**
 * Start server.
 */
const port = process.env.NODE_ENV === 'production' ? serverPort || 80 : 4001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
