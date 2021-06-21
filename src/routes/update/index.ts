//import express from "express";
import * as express from "express";
import { updateNote } from "./controller";
import { updateValidation } from "./schema";
import { validationCatcher } from "../../utils/middleware";
const registerApi = (router: express.Router): void => {
  router.put(
    "/api/v1/notes/:notesId",
    updateValidation,
    validationCatcher,
    async function(req:any, res:any) {
      await updateNote(req, res);
    }
  );
  
};

export default registerApi;