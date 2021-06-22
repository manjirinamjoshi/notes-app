const sinon = require('sinon');
const  db = require('../../db/db');
import CreateNoteService from "../CreateNoteService";

const successBody = {
  title: "123",
  content: "Content for note 123"
};

const notesId : any = "12345fsdfsdfsf";
describe("Create Note Unit Test", () => {
    afterEach(() => {
        sinon.restore();
    });
  test("success", async () => {
    const dbCreateNoteStub = sinon.stub(db, "createNote").resolves();
    const body = await CreateNoteService(
      successBody,
      notesId,
      "unique-request-id",
      "userIdValue"
    );
    expect(dbCreateNoteStub.callCount).toEqual(1);
    expect(dbCreateNoteStub.args[0][0].title).toEqual("123");
    expect(dbCreateNoteStub.args[0][0].content).toEqual("Content for note 123");
    const searchWordsSet = dbCreateNoteStub.args[0][0].searchWords;
    expect(searchWordsSet.includes("123")).toEqual(true);
    expect(searchWordsSet.includes("content")).toEqual(true);
    expect(searchWordsSet.length).toEqual(4);
    expect(dbCreateNoteStub.args[0][0].createdAt).toBeTruthy();

    expect(body).toEqual(
        {
            "content": "Content for note 123", 
            "createdAt": dbCreateNoteStub.args[0][0].createdAt, 
            "notesId": "12345fsdfsdfsf", 
            "title": "123", 
            "updatedAt": dbCreateNoteStub.args[0][0].updatedAt
        }
    );
  }, 10000);
});
