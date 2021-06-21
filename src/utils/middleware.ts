import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationError } from "express-validator";
import { generate } from "shortid";
import { REQUEST_ID_HEADER, AUTHORIZATION_HEADER } from "../core/constants";

import { InputValidationError } from "../core/errors";

export const reqIdInterceptor = (
    req: Request & { XReqId: string },
    res: Response,
    next: NextFunction
  ) => {
    if (req && req.path && req.path.indexOf("/api") > -1) {
      const header = req.get(REQUEST_ID_HEADER) || generate();
      req.XReqId = header;
      res.set(REQUEST_ID_HEADER, header);
    }
  
    next();
  };

  export const authInterceptor = (
    req: Request & { XReqId: string, XUserId: string },
    res: Response,
    next: NextFunction
  ) => {
    if (req && req.path && req.path.indexOf("/api") > -1) {
      const header = req.get(AUTHORIZATION_HEADER);
      console.log(header);
      // TODO authentication and set userId on the request
      req.XUserId = '12345';
    }
    next();
  };

export const validationCatcher = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errorFormatter = ({ location, msg, param }: ValidationError) => {
        // Build your resulting errors however you want! String, object, whatever - it works!
        return `${param} in ${location}: ${msg}`;
    };
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
        throw new InputValidationError(result.array());
    }
    next();
};