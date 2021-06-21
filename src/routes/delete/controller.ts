//import * as express from "express";
import { Request, Response } from "express";
//import { generateNoteUUID } from "../../utils/uuidGen";
import DeleteNotesService from "../../services/DeleteNotesService";

export const deleteNotes = async (
  req: Request & { XReqId: string, XUserId: string },
  res: Response
) => {
  const body: REQUESTS.NOTES_DELETE_BODY = req.body;
  const response = await DeleteNotesService(
    body,
    req.XReqId,
    req.XUserId
  );
  res.status(204).send(response);
};
