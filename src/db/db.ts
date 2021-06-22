/*type Data = {
    notes: MODELS.NOTE[] // Expect notes to be an array of strings
}
*/

// import { join } from 'path'
// import {lowdb} from 'lowdb';
import { ValueNotFoundError } from "../core/errors";
const lowdb = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync')

const adapter = new fileSync('db.json')
const db = lowdb(adapter)

import * as lodash from 'lodash'
// Note: db.data needs to be initialized before lodash.chain is called.
db.chain = lodash.chain(db.data);

db.defaults({ notes: [] })
  .write();

export const createNote = async (
    item: MODELS.NOTE
  ) => {
    db.get('notes').push({...item}).write();
};

export const updateNote = async (
  item: MODELS.NOTE
): Promise<REQUESTS.NOTE_SEARCH_SUCCESS_RESPONSE>  => {
  const exists = db.get('notes').filter((note:MODELS.NOTE) => note.userId===item.userId).find({ id: item.id }).value();
  if (exists === undefined) {
      throw new ValueNotFoundError(["noteId does not exist"]);
  }

  const updateResult = db.get('notes')
        .chain()
        .filter((note:MODELS.NOTE) => note.userId===item.userId)
        .find({ id: item.id })
        .assign(item)
        .write()
  return updateResult;
}

export const deleteNotes = async (
  notesIds: GENERAL.NOTES_UUID[],
  userId: string
): Promise<void> => {
  db.get('notes')
    .remove((note: MODELS.NOTE) => 
      note.userId === userId && notesIds.includes(note.id)
    ).write();
}

export const searchNotes = async (
  search: string,
  userId: string
): Promise<MODELS.NOTE[]>  => {
  const results = db.get('notes').filter((note:MODELS.NOTE) => note.userId===userId).filter((item: MODELS.NOTE) => {
    return item.searchWords.some((word: string) => {
      return word.startsWith(search, 0);
    });
}).value();
  console.log(results);
  return results;
};

export const getAllNotes = async (
  userId: string
): Promise<MODELS.NOTE[]>  => {
  const allNotes = db.get('notes').filter((note:MODELS.NOTE) => note.userId===userId).value();
  return allNotes;
}

