// import express from "express";
import * as express from "express";
import { getAllNotes } from "./controller";
const registerApi = (router: express.Router): void => {
  router.get(
    "/api/v1/notes/",
    // getAllNotes(express.request,express.request.XReqId, express.request.XUserId, express.response)
    async (req:any, res:any) => {
      await getAllNotes(req, res);
    }
  );
};

export default registerApi;