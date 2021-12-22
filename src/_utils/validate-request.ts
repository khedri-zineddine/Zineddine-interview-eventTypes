/**
 * A helper function that validates the request schema.
 */

import { NextFunction, Request } from 'express';
import createError from 'http-errors';
import Joi from 'joi';

const validateRequest = (req: Request, next: NextFunction, schema: Joi.ObjectSchema<any>): void => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    throw createError(
      400,
      `Validation error: ${error.details.map((detail) => detail.message).join(', ')}`,
    );
  }
  req.body = value;
  return next();
};

export default validateRequest;
