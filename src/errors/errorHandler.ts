import type { ErrorHandler } from "../types/types";

const errorHandler: ErrorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).send(err.message);
};

export default errorHandler;
