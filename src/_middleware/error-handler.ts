/**
 * A middleware that handles error thrown in the application.
 */

import { NextFunction, Request, Response } from 'express';

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response {
  /**
   * If the header is already sent, pass the error to Express default error handler.
   * When adding a custom error handler, you must delegate to the default Express error handler, when the headers have already been sent to the client.
   * https://expressjs.com/en/guide/error-handling.html
   */
  if (res.headersSent) {
    return next(err);
  }

  /**
   * Handling errors thrown in the appliation.
   */
  switch (true) {
    /**
     * Custom application errors thrown with status code.
     * Most of cases should be caught here.
     */
    case typeof err.status !== 'undefined': {
      return res.status(err.status).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
      });
    }

    /**
     * Mongoose validation error.
     */
    case err.name === 'ValidationError':
      return res.status(400).json({
        status: 400,
        message: err.message,
        stack: err.stack,
      });

    /**
     * Custom application errors thrown without status code.
     * This shouldn't be used as the norm to catch thrown errors.
     */
    case err.name === 'Error': {
      const errorMessage = err.message.toString().toLowerCase();
      let statusCode: number;
      if (errorMessage.endsWith('not found')) {
        statusCode = 404;
      } else if (
        errorMessage.endsWith('invalid token') ||
        errorMessage.endsWith('incorrect') ||
        errorMessage.endsWith('not authenticated') ||
        errorMessage.endsWith('unauthorized')
      ) {
        statusCode = 401;
      } else if (errorMessage.endsWith('required') || errorMessage.endsWith('missing')) {
        statusCode = 400;
      } else {
        return next(err);
      }

      return res.status(statusCode).json({
        status: statusCode,
        message: err.message,
        stack: err.stack,
      });
    }

    /**
     * Handling JWT authorization error that aren't handled within the application.
     * This shouldn't be used as the norm to catch thrown errors.
     */
    case err.name === 'UnauthorizedError':
      return res.status(401).json({
        status: 401,
        message: err.message,
        stack: err.stack,
      });

    /**
     * Delegate the error to the default express error handler if not captured here by any of the switch cases.
     */
    default:
      return next(err);
  }
}
