import { createNote } from '../db/db';
import { getSearchWords } from '../utils/searchUtils';

export default async (
    requestPayload: REQUESTS.NOTES_CREATE_BODY,
    notesId: GENERAL.NOTES_UUID,
    requestId: string,
    userId: string
  ): Promise<REQUESTS.NOTE_CREATE_SUCCESS_RESPONSE> => {
    const { title, content } = requestPayload;
    console.log(`RequestID=${requestId}, creating note with title ${title}`);
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    const noteModel: MODELS.NOTE = {
      title,
      content,
      userId,
      createdAt,
      updatedAt,
      id: notesId,
      searchWords: await getSearchWords(title, content),
    };
    await createNote(noteModel);
    return {
        notesId,
        title,
        content,
        createdAt,
        updatedAt
    };
  };