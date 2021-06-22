const sinon = require('sinon');
const  db = require('../../db/db');
import UpdateNoteService from "../UpdateNoteService";

const successBody = {
  title: "123",
  content: "content for note 123"
};

const notesId : any = "12345fsdfsdfsf";
describe("Update Note Unit Test", () => {
    afterEach(() => {
        sinon.restore();
    });
  test("success", async () => {
    const dbUpdateNoteStub = sinon.stub(db, "updateNote").resolves({createdAt: "unitTestCreatedAt"});
    const body = await UpdateNoteService(
      successBody,
      notesId,
      "unique-request-id",
      "userIdValue"
    );
    expect(dbUpdateNoteStub.callCount).toEqual(1);
    expect(dbUpdateNoteStub.args[0][0].title).toEqual("123");
    expect(dbUpdateNoteStub.args[0][0].content).toEqual("content for note 123");
    expect(dbUpdateNoteStub.args[0][0].updatedAt).toBeTruthy();

    expect(body).toEqual(
        {
            "content": "content for note 123", 
            "createdAt": "unitTestCreatedAt", 
            "notesId": "12345fsdfsdfsf", 
            "title": "123", 
            "updatedAt": dbUpdateNoteStub.args[0][0].updatedAt
        }
    );
  }, 10000);
});
