import { searchNotes } from '../db/db';

export default async (
    requestPayload: REQUESTS.NOTES_SEARCH_BY_PREFIX_BODY,
    requestId: string,
    userId: string
  ): Promise<REQUESTS.NOTE_SEARCH_SUCCESS_RESPONSE[]> => {
    const { prefix } = requestPayload;
    console.log(`RequestID=${requestId}, search note by string ${prefix}`);
    const searchResults: MODELS.NOTE[] = await searchNotes(prefix.toLowerCase(), userId);
    // const responseArray: REQUESTS.NOTE_SEARCH_SUCCESS_RESPONSE[] = searchResults.map(({searchWords, id: notesId, ...keepAttrs}) => {keepAttrs} )
    const responseArray = searchResults.map((note) => {
        return {
            notesId: note.id,
            title: note.title,
            content: note.content,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
        }
    });
    return responseArray;
};