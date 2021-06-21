import { getAllNotes } from '../db/db';

export default async (
    requestId: string,
    userId: string
  ): Promise<REQUESTS.NOTE_SEARCH_SUCCESS_RESPONSE[]> => {
    let allNotes = await getAllNotes(userId);
    let responseArray = allNotes.map(function(note) {
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