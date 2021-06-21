//import express from "express";
import * as express from "express";
import { deleteNotes } from "./controller";
import { deleteValidation } from "./schema";
import { validationCatcher } from "../../utils/middleware";
const registerApi = (router: express.Router): void => {
  router.delete(
    "/api/v1/notes/",
    deleteValidation,
    validationCatcher,
    async function(req:any, res:any) {
      await deleteNotes(req, res);
    }
  );
};

export default registerApi;