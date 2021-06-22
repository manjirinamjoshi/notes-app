// import express from "express";
import * as express from "express";
import { createNote } from "./controller";
import { createValidation } from "./schema";
import { validationCatcher } from "../../utils/middleware";
const registerApi = (router: express.Router): void => {
  router.post(
    "/api/v1/notes",
    createValidation,
    validationCatcher,
    async (req:any, res:any) => {
        await createNote(req, res);
    }
  );
  
  /*router.post('/api/v1/notes', (request, response) => {
    createNote
  });
  */
};

export default registerApi;