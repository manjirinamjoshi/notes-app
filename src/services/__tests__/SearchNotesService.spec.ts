const sinon = require('sinon');
const  db = require('../../db/db');
import SearchNotesService from "../SearchNotesService";

const successBody = {
  prefix: "TEST"
};

const notesId : any = "12345fsdfsdfsf";
describe("Search Notes Unit Test", () => {
    afterEach(() => {
        sinon.restore();
    });
  test("lowercase prefix is passed to the db", async () => {
    const dbSearchNotesStub = sinon.stub(db, "searchNotes").resolves([
      {
        id: "search_note_unit_test1",
        title: "Search notes unit test title",
        content: "Search notes unit test content",
        searchWords: ["search", "words"],
        userId: "testUserId",
        createdAt: "2021-06-22T05:58:26.556Z",
        updatedAt: "2021-06-22T05:58:26.556Z"
      }
    ]);
    const body = await SearchNotesService(
      successBody,
      notesId,
      "unique-request-id"
    );
    expect(dbSearchNotesStub.callCount).toEqual(1);
    expect(dbSearchNotesStub.args[0][0]).toEqual("test");

    expect(body).toEqual(
        [{
            "notesId": "search_note_unit_test1",
            "content": "Search notes unit test content", 
            "createdAt": "2021-06-22T05:58:26.556Z", 
            "title": "Search notes unit test title", 
            "updatedAt": "2021-06-22T05:58:26.556Z"
        }]
    );
  }, 10000);
});
