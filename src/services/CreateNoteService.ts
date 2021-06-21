import { createNote } from '../db/db';
import { getSearchWords } from '../utils/searchUtils';

export default async (
    requestPayload: REQUESTS.NOTES_CREATE_BODY,
    notesId: GENERAL.NOTES_UUID,
    requestId: string,
    userId: string
  ): Promise<REQUESTS.NOTE_CREATE_SUCCESS_RESPONSE> => {
    const { title, content } = requestPayload;
    console.log(requestId + " note title=" + title);
    let createdAt = new Date().toISOString();
    let updatedAt = new Date().toISOString();
    const noteModel: MODELS.NOTE = {
      id: notesId,
      title,
      content,
      searchWords: await getSearchWords(title, content),
      userId,
      createdAt,
      updatedAt
    };
    await createNote(noteModel);
    return {
        notesId,
        title,
        content,
        createdAt: createdAt,
        updatedAt: updatedAt
    };
  };

  /*const getSearchWords = (title: string, content: string): Array<string> => {
    let searchWords: Array<string> = [];
    searchWords = content ? searchWords.concat(content.toLowerCase().split(" ")): [];
    searchWords = searchWords.concat(title.toLowerCase().split(" "));
    return searchWords;
  };
  */
  