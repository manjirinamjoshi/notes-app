import { getAllNotes } from '../db/db';

export default async (
    requestId: string,
    userId: string
  ): Promise<REQUESTS.NOTE_SEARCH_SUCCESS_RESPONSE[]> => {
    const allNotes = await getAllNotes(userId);
    const responseArray = allNotes.map((note) => {
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