import {NextFunction, Request, Response} from "express"

// ERROR HANDLERS
const badRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err.httpStatusCode === 400) {
    res.status(400).send(err.message)
  }
  next(err)
} // 400

const forbiddenHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err.httpStatusCode === 403) {
    res.status(403).send(err.message || "Forbidden!")
  }
  next(err)
} // 403

const notFoundHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err.httpStatusCode === 404) {
    res.status(404).send(err.message || "Resource not found!")
  }
  next(err)
} // 404

// catch all
const genericErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!res.headersSent) {
    // checks if another error middleware already sent a response
    res.status(err.httpStatusCode || 500).send(err.message)
  }
}

module.exports = {
  badRequestHandler,
  forbiddenHandler,
  notFoundHandler,
  genericErrorHandler,
}
