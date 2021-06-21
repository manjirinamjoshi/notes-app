import { searchNotes } from '../db/db';

export default async (
    requestPayload: REQUESTS.NOTES_SEARCH_BY_WORD_BODY,
    requestId: string,
    userId: string
  ): Promise<REQUESTS.NOTE_SEARCH_SUCCESS_RESPONSE[]> => {
    const { search } = requestPayload;
    console.log(requestId + " search note by string =" + search);
    let searchResults: MODELS.NOTE[] = await searchNotes(search.toLowerCase(), userId);
    //const responseArray: REQUESTS.NOTE_SEARCH_SUCCESS_RESPONSE[] = searchResults.map(({searchWords, id: notesId, ...keepAttrs}) => {keepAttrs} )
    let responseArray = searchResults.map(function(note) {
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