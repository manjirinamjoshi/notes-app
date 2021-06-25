_**Notes App Server**_ is a Nodejs application to manage notes for a user.
  

## Requirements

You should be able to return all notes.<br/>
You should be able to add one or more notes.<br/>
You should be able to edit a note.<br/>
You should be able to delete one or more notes.<br/>
You should be able to search notes.<br/>
The notes should be persisted and retrieved via the service.<br/>

## Prerequisites
Node>=12.0.0 <br/>

## Build
Go to the root of the project <br/>
`npm install` <br/>
`npm run build`

## Run tests
`npm test`

## Usage
`npm start`

*Server will start on port 9997*
<br/>The base path of the server is `/api/v1/notes/`

## Spec
Swagger link - http://localhost:9997/swagger

## Postman collection
<a href="Notes-App.postman_collection.json" download>Postman collection download</a><br/>
<a href="NotesApp-Local.postman_environment.json" download>Postman Environment download</a>


## Run as Docker Container

`docker build -t manjirinamjoshi/notes-app:1.0 .` <br/>
`docker run -d -p 9997:9997 manjirinamjoshi/notes-app:1.0`

Access - `http://localhost:9997/swagger`

### Technical Details

Note model
```
{
    "notesId" <Globally unique id representing a note>
    "title": <title of the note>,
    "content": <actual contents of the note>,
    "userId": <note belongs to this user>,
    "createdAt": <note's creation timestamp>,
    "updatedAt": <note's last updated timestamp>
}
```

"title" is a required field when creating or updating a note.

The user can create multiple notes with the same title. 
Internally, the server generates a unique identifier everytime note is created.

#### X-Request-Id Response Header

Each request is intercepted and a unique "shortId" is generated that represents each request for traceability (for e.g. this microservice calls another ms then request-id will be passed along). 
Any logging produced will have the corresponding request-id associated for better troubleshooting.

## Assumptions

### UserId 

1. Assuming that user will be logged in and each REST api will be called with `Authorization` header.
From the value of `Authorization` header, the code can be written to retrieve the  `userId`.
2. The authentication logic is not implemented, so the code is using an `interceptor` that hardcodes the userId value. Later,
the `interceptor` implementation can be swapped with the real authentication logic.
3. For note update, delete and read operations, userId associated with the note is checked against the userId passed from the `interceptor`. This ensures that only notes belonging to the correct user are updated.

### Updating a note

A note can be updated by providing the {notesId} as a path parameter.<br/>
Both `title` and `content` will be replaced.<br/>
Did not implement a PATCH api (for partial update) because usually the app UI will display the title and content to the user and allow to edit and save, so the entire note object can be passed to the server for an update.

### Searching notes

1. Allows to search by prefix for any word in the `title` or `content` of the note. For e.g. if the title is `This is my first note` and if the search string is `firs` then this note will be returned in the search result.
2. Search is case-insensitve. For e.g if the content of the note is `Send an email ASAP`, and search string is `asap` then this note will be returned in the search result.

### Search Implementation Details

1. During the create/update of a note, the server will split the text by a space returning an array of words (words in title and content).
2. When persisting the note, this array of words is stored. 
3. When the search by prefix api is called, then for each note we check if at least 1 word has that prefix. If yes, the note is selected
4. If there are `n` number of notes for a given user, and average `k` words per note. The search complexity is `n*k`.</br>
</br>
A typical way to optimize prefix search is using a "Trie" data structure.
"Trie" will have a root node and next letter in the word is its child and so on.
With trie, the search complexity is linear (same as prefix). </br>

Usually this is useful for searching through a dataset with millions of records.</br>
</br>
In this case, Trie is overkill because of the assumption that a given user would not typically have millions of notes. </br>
</br>
Another way to implement search can be a complete client-side search. The server will always return ALL notes for the logged-in user. And, instead of a network call when user types each character in the search box, frontend logic can filter / match the notes.
