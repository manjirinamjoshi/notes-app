/*type Data = {
    notes: MODELS.NOTE[] // Expect notes to be an array of strings
}
*/

//import { join } from 'path'
//import {lowdb} from 'lowdb';
import { ValueNotFoundError } from "../core/errors";
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = lowdb(adapter)
// Use JSON file for storage
//const file = join(__dirname, 'db.json');
//const adapter = new JSONFile<Data>(file)

//const db:any = new lowdb.Low<Data>(adapter);
import * as lodash from 'lodash'
// Note: db.data needs to be initialized before lodash.chain is called.
db.chain = lodash.chain(db.data);

db.defaults({ notes: [] })
  .write();

export const createNote = async (
    item: MODELS.NOTE
  ) => {
    db.get('notes').push({...item}).write()
    
    console.log(db.get('notes'));

    
    /*let results = await db.filter(db.chain.get('notes'), function (item: MODELS.NOTE) {
      let matchingItem = item.searchWords.indexOf('ver') > -1;
      return matchingItem;
    });
    */
    
   /*let results = allNotes.filter(function (item: MODELS.NOTE) {
      return item.searchWords.some(function (word: string) {
        return word.indexOf('very1') > -1;
      });
   });
   */
    //console.log(results);
};

export const updateNote = async (
  item: MODELS.NOTE
): Promise<REQUESTS.NOTE_SEARCH_SUCCESS_RESPONSE>  => {
  //let oldNoteItem = db.get('notes')
  //      .filter((note:MODELS.NOTE) => note.userId===item.userId)
  /*let updateResult = db.get('notes')
        .chain()
        .filter((note:MODELS.NOTE) => note.userId===item.userId)
        .find({ id: item.id })
        .assign(item)
        .write()
        */
  //console.log(db.get('notes'));

  const exists = db.get('notes').filter((note:MODELS.NOTE) => note.userId===item.userId).find({ id: item.id }).value();
  if (exists === undefined) {
      throw new ValueNotFoundError(["noteId does not exist"]);
  }

  let updateResult = db.get('notes')
        .chain()
        .filter((note:MODELS.NOTE) => note.userId===item.userId)
        .find({ id: item.id })
        .assign(item)
        .write()
  return updateResult;
}

export const deleteNotes = async (
  notesIds: Array<GENERAL.NOTES_UUID>,
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
  /*db.data.notes.push(
      { ...item
      });*/
  //let allNotes = db.get('notes').find({ userId: userId }).value();
  let allNotes = db.get('notes').filter((note:MODELS.NOTE) => note.userId===userId).value();
  let results = allNotes.filter(function (item: MODELS.NOTE) {
      return item.searchWords.some(function (word: string) {
        return word.startsWith(search, 0);
      });
  });
  console.log(results);
  return results;
};

export const getAllNotes = async (
  userId: string
): Promise<MODELS.NOTE[]>  => {
  let allNotes = db.get('notes').filter((note:MODELS.NOTE) => note.userId===userId).value();
  return allNotes;
}

