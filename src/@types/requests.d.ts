declare namespace REQUESTS {
    type NOTES_CREATE_BODY = {
        title: string,
        content: string
    }

    type NOTES_SEARCH_BY_WORD_BODY = {
        search: string
    }

    type NOTES_DELETE_BODY = {
        notesIds: Array<GENERAL.NOTES_UUID>
    }

    type _GENERAL_RESPONSE = {
        notesId: GENERAL.NOTES_UUID;
    };

    type NOTE_CREATE_SUCCESS_RESPONSE = _GENERAL_RESPONSE & {
        title: string,
        content: string,
        createdAt: string,
        updatedAt: string
    };

    type NOTE_SEARCH_SUCCESS_RESPONSE = _GENERAL_RESPONSE & {
        title: string,
        content: string,
        createdAt: string,
        updatedAt: string
    };
    
}