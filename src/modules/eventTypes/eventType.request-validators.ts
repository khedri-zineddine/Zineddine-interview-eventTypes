/**
 * Functions that validate the request body schema before passing the request to the controller.
 */
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import validateRequest from '../../_utils/validate-request';

const validateUpdateEventTypesRequests = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const schema = Joi.object();
  validateRequest(req, next, schema);
};

export default {
  validateUpdateEventTypesRequests,
};
