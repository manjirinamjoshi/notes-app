import { Request, Response } from "express";
import SearchNotesService from "../../services/SearchNotesService";

export const searchNotes = async (
  req: Request & { XReqId: string, XUserId: string },
  res: Response
) => {
  const body: REQUESTS.NOTES_SEARCH_BY_PREFIX_BODY = req.body;
  const response = await SearchNotesService(
    body,
    req.XReqId,
    req.XUserId
  );
  res.status(200).send(response);
};
