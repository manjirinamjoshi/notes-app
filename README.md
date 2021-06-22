_**Notes App Server**_ is a Nodejs application to manage notes a user.
  

## Requirements

You should be able to return all notes.
You should be able to add one or more notes.
You should be able to edit a note.
You should be able to delete one or more notes.
You should be able to search notes.
The notes should be persisted and retrieved via the service.

## Prerequisites
Node>=11.6.0 <br/>

## Build
`npm install`

## Run tests
`npm test`

## Usage
`npm start`

*Server will start on port 9997*

## Spec
Swagger link - http://localhost:9997/swagger

## Postman collection
<a href="Notes-App.postman_collection.json" download>Postman collection download</a>
<a href="NotesApp-Local.postman_environment.json" download>Postman Environment download</a>

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
Internally, the server generates a unique identifier everytime a note is created.

### X-Request-Id

Each request is intercepted and a unique "shortId" is generated that represents each request for traceability (for e.g. this microservice calls another ms then request-id will be passed along). 
Any logging produced will have the corresponding request-id associated for better troubleshooting.

## Assumptions

### UserId 

1. Assuming that user will be logged in and each REST api will be called with `Authorization` header.
From the value of `Authorization` header, the code can be written to retrieve the  `userId`.
2. The authentication logic is not implemented, so the code is using an `interceptor` that hardcodes the userId value. Later,
the `interceptor` implementation can be swapped with the real authentication logic.
3. For note update, delete and read operations, userId associated with the note is checked against the userId passed from the `interceptor`. This ensures that only notes belonging to the correct user are updated.

### Searching notes

1. Allows to search by prefix for any word in the `title` or `content` of the note. For e.g. if the title is `This is my first note` and if the search string is `firs` then this note will be returned in the search result.
2. Search is case-insensitve. For e.g if the content of the note is `Send an email ASAP`, and search string is `asap` then this note will be returned in the search result.

### Search Implementation Details

