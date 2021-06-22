import { deleteNotes } from '../db/db';

export default async (
    requestPayload: REQUESTS.NOTES_DELETE_BODY,
    requestId: string,
    userId: string
  ): Promise<void> => {
    const {notesIds}: {notesIds: GENERAL.NOTES_UUID[]} = requestPayload;
    await deleteNotes(notesIds, userId);
  };
  