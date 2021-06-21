//import express from "express";
import * as express from "express";
import { searchNotes } from "./controller";
import { searchValidation } from "./schema";
import { validationCatcher } from "../../utils/middleware";
const registerApi = (router: express.Router): void => {
  router.post(
    "/api/v1/notes/search",
    searchValidation,
    validationCatcher,
    async function(req:any, res:any) {
      await searchNotes(req, res);
    }
  );
};

export default registerApi;