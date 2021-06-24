const sinon = require('sinon');
const db = require('../db');

const successBody = {
    prefix: "TEST"
};

const notesId: any = "12345fsdfsdfsf";
describe("DB Unit Test", () => {
    afterEach(() => {
        sinon.restore();
    });
    test("create note for userId 456, getAllNotes if called for userId 456 returns the note", async () => {
        await db.createNote({
            id: "test",
            title: "test title",
            userId: "456"
        });
        const allNotes = await db.getAllNotes("456");
        expect(allNotes.length).toEqual(1);

        // cleanup
        await db.deleteNotes([allNotes.id], "456");

    }, 10000);

    test("create note for userId 123, getAllNotes if called for userId 999 does not return the note", async () => {
        await db.createNote({
            id: "test",
            title: "test title",
            userId: "123"
        });
        const allNotes = await db.getAllNotes("999");
        expect(allNotes.length).toEqual(0);

        // cleanup
        await db.deleteNotes(["test"], "123");

    }, 10000);

    test("create note for userId 123, delete notes will not delete if user is different", async () => {
        await db.createNote({
            id: "test",
            title: "test title",
            userId: "123"
        });
        let allNotes = await db.getAllNotes("123");
        expect(allNotes.length).toEqual(1);

        // attempt to delete note for userId 999
        await db.deleteNotes([allNotes.id], "999");

        // note still exists for user 123
        allNotes = await db.getAllNotes("123");
        expect(allNotes.length).toEqual(1);

        // cleanup
        await db.deleteNotes([allNotes.id], "123");

    }, 10000);
});
