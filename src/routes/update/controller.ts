//import * as express from "express";
import { Request, Response } from "express";
import UpdateNoteService from "../../services/UpdateNoteService";

export const updateNote = async (
  req: Request & { XReqId: string, XUserId: string },
  res: Response
) => {
  const body: REQUESTS.NOTES_CREATE_BODY = req.body;
  const noteId = <any> req.params.notesId;
  const response = await UpdateNoteService(
    body,
    noteId,
    req.XReqId,
    req.XUserId
  );
  res.status(200).send(response);
};
