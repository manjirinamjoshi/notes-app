import { Request, Response } from "express";
import GetAllNotesService from "../../services/GetAllNotesService";

export const getAllNotes = async (
  req: Request & { XReqId: string, XUserId: string },
  res: Response
) => {
  const response = await GetAllNotesService(
    req.XReqId,
    req.XUserId
  );
  res.status(200).send(response);
};
