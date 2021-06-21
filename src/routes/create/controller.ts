//import * as express from "express";
import { Request, Response } from "express";
import { generateNoteUUID } from "../../utils/uuidGen";
import CreateNoteService from "../../services/CreateNoteService";

export const createNote = async (
  req: Request & { XReqId: string, XUserId: string },
  res: Response
) => {
  const body: REQUESTS.NOTES_CREATE_BODY = req.body;
  const noteId = generateNoteUUID();
  const response = await CreateNoteService(
    body,
    noteId,
    req.XReqId,
    req.XUserId
  );
  res.status(201).send(response);
};
