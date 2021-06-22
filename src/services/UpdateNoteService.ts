import { updateNote } from '../db/db';
import { getSearchWords } from '../utils/searchUtils';

export default async (
    requestPayload: REQUESTS.NOTES_CREATE_BODY,
    notesId: GENERAL.NOTES_UUID,
    requestId: string,
    userId: string
  ): Promise<REQUESTS.NOTE_CREATE_SUCCESS_RESPONSE> => {
    const { title, content } = requestPayload;
    console.log(`RequestID=${requestId}, updating note ${notesId}`);
    const updatedAt = new Date().toISOString();
    const noteModel: MODELS.NOTE = {
      title,
      content,
      userId,
      updatedAt,
      id: notesId,
      searchWords: await getSearchWords(title, content),
    };
    const updatedNoteResult: REQUESTS.NOTE_SEARCH_SUCCESS_RESPONSE = await updateNote(noteModel);
    return {
        notesId,
        title,
        content,
        updatedAt,
        createdAt: updatedNoteResult.createdAt
    };
  };
  