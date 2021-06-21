import { updateNote } from '../db/db';
import { getSearchWords } from '../utils/searchUtils';

export default async (
    requestPayload: REQUESTS.NOTES_CREATE_BODY,
    notesId: GENERAL.NOTES_UUID,
    requestId: string,
    userId: string
  ): Promise<REQUESTS.NOTE_CREATE_SUCCESS_RESPONSE> => {
    const { title, content } = requestPayload;
    console.log(requestId + " note title=" + title);
    let updatedAt = new Date().toISOString();
    const noteModel: MODELS.NOTE = {
      id: notesId,
      title,
      content,
      searchWords: await getSearchWords(title, content),
      userId,
      updatedAt
    };
    let updatedNoteResult: REQUESTS.NOTE_SEARCH_SUCCESS_RESPONSE = await updateNote(noteModel);
    return {
        notesId,
        title,
        content,
        createdAt: updatedNoteResult.createdAt,
        updatedAt: updatedAt
    };
  };
  