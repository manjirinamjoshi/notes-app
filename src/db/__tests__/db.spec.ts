const sinon = require('sinon');
const db = require('../db');

const successBody = {
    prefix: "TEST"
};

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
        await db.deleteNotes([allNotes[0].id], "456");

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
        await db.deleteNotes([allNotes[0].id], "999");

        // note still exists for user 123
        allNotes = await db.getAllNotes("123");
        expect(allNotes.length).toEqual(1);

        // cleanup
        await db.deleteNotes([allNotes[0].id], "123");

    }, 10000);

    test("note is updated successfully", async () => {
        await db.createNote({
            id: "test",
            title: "test title",
            userId: "123"
        });
        let allNotes = await db.getAllNotes("123");
        expect(allNotes.length).toEqual(1);
        expect(allNotes[0].title).toEqual("test title");

        await db.updateNote({
            id: "test",
            userId: "123",
            title: "update test title",
            content: "update test content"
        })

        // note still exists for user 123
        allNotes = await db.getAllNotes("123");
        expect(allNotes.length).toEqual(1);
        expect(allNotes[0].title).toEqual("update test title");
        expect(allNotes[0].content).toEqual("update test content");

        // cleanup
        await db.deleteNotes([allNotes[0].id], "123");

    }, 10000);

    test("searching by prefix returns a note for a match in title", async () => {
        await db.createNote({
            id: "test",
            title: "test title",
            searchWords: ["test", "title"],
            userId: "123"
        });
        const searchResults = await db.searchNotes("ti", "123");
        expect(searchResults.length).toEqual(1);
        expect(searchResults[0].title).toEqual("test title");

        // cleanup
        await db.deleteNotes([searchResults[0].id], "123");

    }, 10000);

    test("searching by prefix returns a note for a match in content", async () => {
        await db.createNote({
            id: "test",
            title: "test title",
            content: "abc def ghi jkl",
            searchWords: ["test", "title", "abc", "def", "ghi", "jkl"],
            userId: "123"
        });
        const searchResults = await db.searchNotes("def", "123");
        expect(searchResults.length).toEqual(1);
        expect(searchResults[0].title).toEqual("test title");
        expect(searchResults[0].content).toEqual("abc def ghi jkl");

        // cleanup
        await db.deleteNotes([searchResults[0].id], "123");

    }, 10000);
});
