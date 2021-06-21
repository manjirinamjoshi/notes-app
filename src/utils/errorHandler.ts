import { Request, Response, NextFunction } from "express";
import { ServerError, RuntimeError } from "../core/errors";

type errorResponse = {
  uuid: GENERAL.ERROR_UUID;
  message: string;
  details?: any;
  typeEnum: string;
  statusCode: number;
};

export default async (
  error: any,
  req: Request & { XReqId: string },
  res: Response,
  next: NextFunction
) => {
  const {
    uuid,
    message,
    status,
    async,
    details,
    getAsyncDetails,
    severity,
    typeEnum
  }: ServerError = error.typeEnum
    ? error
    : {
        ...new RuntimeError(error.message),
        ...error
      };
  const responseStatus = status;

  const response: errorResponse = {
    uuid,
    message,
    typeEnum,
    statusCode: status
  };
  if (details || async) {
    response.details = details ? details : await getAsyncDetails();
  }
  const logMetadata = {
    error,
    response,
    uuid,
    requestId: req.XReqId,
    errorType: typeEnum,
    stack: error.stack
  };
  switch (severity) {
    case "INFO":
      console.info(message, logMetadata);
      break;
    case "WARN":
      console.warn(message, logMetadata);
      break;
    case "ERROR":
    default:
      console.error(message, logMetadata);
  }

  res.status(responseStatus).send(response);
};
