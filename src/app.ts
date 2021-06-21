//const config = require("config");
import { Express } from "express";
const express = require('express');

import * as compression from "compression";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
//import healthcheck from "utils/healthcheck";

import registerRoutes from "./routes/register-routes";
import { reqIdInterceptor, authInterceptor } from "./utils/middleware";
import errorHandler from "./utils/errorHandler";
const PORT: any = process.env.PORT || 9997;

const router = require("express-promise-router")();
const swaggerUi = require("swagger-ui-express");

//healthcheck.init();

const app: Express = express()
  .set("port", PORT)
  .use(helmet())
  .use(compression())
  .use(reqIdInterceptor)
  .use(authInterceptor)
  .use(express.json({limit: '1mb'}))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  // swagger
  .use(
    `/swagger`,
    swaggerUi.serve,
    swaggerUi.setup(require(`../swagger/swagger.json`), {
      explorer: true
    })
  )

  /*.get("/health(.json)?", (req, res) => {
    healthcheck.report(req, res);
  })*/
  .use(router)
  .use(errorHandler);

// API Routes
registerRoutes(router);

export default app;
