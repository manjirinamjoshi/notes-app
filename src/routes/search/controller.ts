// import * as express from "express";
import { Request, Response } from "express";
// import { generateNoteUUID } from "../../utils/uuidGen";
import SearchNotesService from "../../services/SearchNotesService";

export const searchNotes = async (
  req: Request & { XReqId: string, XUserId: string },
  res: Response
) => {
  const body: REQUESTS.NOTES_SEARCH_BY_WORD_BODY = req.body;
  const response = await SearchNotesService(
    body,
    req.XReqId,
    req.XUserId
  );
  res.status(200).send(response);
};
